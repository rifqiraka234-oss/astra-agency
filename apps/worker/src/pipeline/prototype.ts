import { mkdir } from 'node:fs/promises';
import { z } from 'zod';
import { approvalBindingKey, contentHash, POLICY_VERSION } from '@astra/core';
import { createApproval, getPool, recordAudit } from '@astra/db';
import { loadPrompt } from '@astra/prompts';
import type { PrototypeFile } from '@astra/integrations';
import type { AppContext } from '../context.js';
import { buildReport, runStaticQa, runVisualQa, type QaFinding } from './prototype-qa.js';
import { notifyOperator } from './notify.js';
import { METRIC_NAMES, increment } from '../metrics.js';

/**
 * Prototype build, QA, deploy, and approval request.
 *
 * The invariant this whole module exists to preserve: the prototype URL is
 * produced here, and it is *not* sent here. Building is automatic; delivering
 * the link is not, in any mode, under any flag. The build ends by creating an
 * approval bound to this exact version and this exact reply text, and stops.
 */

const MAX_BUILD_ATTEMPTS = 2;

const prototypeBuildSchema = z
  .object({
    hypothesis: z.string().min(10).max(1000),
    business_reasoning: z.string().min(10).max(2000),
    files: z
      .array(
        z
          .object({
            path: z.string().min(1).max(200),
            content: z.string().min(1).max(200_000),
          })
          .strict(),
      )
      .min(1)
      .max(20),
    delivery_message: z.string().min(10).max(1000),
  })
  .strict();

export interface PrototypeJobInput {
  readonly jobId: string;
  readonly conversationId: string;
  readonly contactId: string;
  readonly companyName: string;
  readonly companyDomain: string | null;
  readonly sourceConversationHash: string;
  readonly sourceLatestInboundMessageId: string | null;
  readonly offerMessageId: string;
  readonly conversationText: string;
  readonly correlationId: string;
}

export type PrototypeOutcome =
  | { readonly status: 'AWAITING_APPROVAL'; readonly approvalId: string; readonly url: string }
  | { readonly status: 'QA_FAILED'; readonly findings: readonly QaFinding[] }
  | { readonly status: 'BLOCKED'; readonly detail: string }
  | { readonly status: 'FAILED'; readonly detail: string };

export async function runPrototypeJob(
  context: AppContext,
  input: PrototypeJobInput,
): Promise<PrototypeOutcome> {
  const pool = getPool();

  // Identity has to be unambiguous before we build something with a company's
  // name on it. An ambiguous identity is a review item, never a best guess.
  if (input.companyDomain) {
    const identity = await context.research.verifyIdentity({
      url: `https://${input.companyDomain.replace(/^https?:\/\//, '')}`,
      companyName: input.companyName,
    });
    if (!identity.verified) {
      await failJob(context, input, `Company identity could not be verified: ${identity.detail}`);
      return { status: 'BLOCKED', detail: identity.detail };
    }
    if (identity.source?.injectionSuspected) {
      await failJob(context, input, 'The company site contains instruction-like content aimed at an automated reader.');
      return { status: 'BLOCKED', detail: 'Prompt injection suspected on the company site.' };
    }
  }

  let lastFindings: readonly QaFinding[] = [];

  for (let attempt = 1; attempt <= MAX_BUILD_ATTEMPTS; attempt += 1) {
    const strategyPrompt = loadPrompt('prototype-strategy');
    const builderPrompt = loadPrompt('prototype-builder');

    const build = await context.anthropic.callStructured({
      purpose: 'prototype build',
      model: context.config.ANTHROPIC_PROTOTYPE_MODEL,
      systemPrompt: `${strategyPrompt.body}\n\n---\n\n${builderPrompt.body}`,
      promptVersion: `${strategyPrompt.versionTag}+${builderPrompt.versionTag}`,
      userContent: buildPrototypeUserContent(input, lastFindings),
      schema: prototypeBuildSchema,
      schemaName: 'astra_prototype_build',
      maxTokens: 16_000,
    });

    if (!build.ok || build.value === null) {
      lastFindings = [
        { check: 'schema', severity: 'FAIL', detail: build.parseErrors.join('; ') || 'no output' },
      ];
      continue;
    }

    const files: PrototypeFile[] = build.value.files.map((file) => ({
      path: file.path,
      content: file.content,
    }));

    const artifactDir = `artifacts/prototypes/${input.jobId}/v${attempt}`;
    await mkdir(artifactDir, { recursive: true });

    const staticFindings = runStaticQa({ files, companyName: input.companyName });
    const indexHtml = files.find((file) => file.path.replace(/^\//, '') === 'index.html');
    const visual = indexHtml
      ? await runVisualQa(indexHtml.content, artifactDir)
      : { findings: [], desktopScreenshot: null, mobileScreenshot: null };

    const findings = [...staticFindings, ...visual.findings];
    const report = buildReport(findings, {
      desktop: visual.desktopScreenshot,
      mobile: visual.mobileScreenshot,
    });

    const versionId = await storeVersion(context, {
      jobId: input.jobId,
      version: attempt,
      hypothesis: build.value.hypothesis,
      businessReasoning: build.value.business_reasoning,
      files,
      qaReport: report,
      promptVersion: `${strategyPrompt.versionTag}+${builderPrompt.versionTag}`,
      desktopScreenshot: visual.desktopScreenshot,
      mobileScreenshot: visual.mobileScreenshot,
    });

    if (!report.passed) {
      lastFindings = findings;
      increment(METRIC_NAMES.prototypeBuilds, { outcome: 'qa_failed' });
      context.logger.warn('prototype failed QA', {
        attempt,
        failures: findings.filter((finding) => finding.severity === 'FAIL').map((f) => f.check),
      });
      continue;
    }

    // Deploy only after QA passes, and only when deploys are enabled.
    if (!context.config.canDeployPrototype) {
      await recordAudit(pool, {
        conversationId: input.conversationId,
        actor: 'controller',
        action: 'PROTOTYPE_DEPLOY_SKIPPED',
        reasonCode: 'LIVE_DEPLOY_FLAG_OFF',
        payload: { versionId },
        correlationId: input.correlationId,
      });
      return {
        status: 'BLOCKED',
        detail: 'The prototype passed QA but ALLOW_LIVE_NETLIFY_DEPLOY is false, so it was not deployed.',
      };
    }

    const deployment = await context.netlify.deployPrototype({
      companySlug: input.companyName,
      files,
    });

    await pool.query(
      `INSERT INTO prototype_deployments
         (prototype_version_id, netlify_site_id, netlify_deploy_id, site_name, immutable_url, friendly_url, deploy_hash)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        versionId,
        deployment.siteId,
        deployment.deployId,
        deployment.siteName,
        deployment.immutableUrl,
        deployment.friendlyUrl,
        deployment.deployHash,
      ],
    );

    // The approval binds the exact reply text *and* the exact deployed
    // version. Rebuilding or editing either one invalidates it.
    const deliveryMessage = `${build.value.delivery_message.trim()}\n\n${deployment.immutableUrl}`;
    const replyHash = contentHash(deliveryMessage);
    const expiresAt = new Date(Date.now() + context.config.APPROVAL_EXPIRY_HOURS * 3600 * 1000);

    const approval = await createApproval(pool, {
      conversationId: input.conversationId,
      actionType: 'SEND_PROTOTYPE_LINK',
      bindingKey: approvalBindingKey({
        operatorEmail: context.config.ADMIN_EMAIL,
        actionType: 'SEND_PROTOTYPE_LINK',
        conversationId: input.conversationId,
        contactId: input.contactId,
        sourceLatestInboundMessageId: input.sourceLatestInboundMessageId,
        conversationHash: input.sourceConversationHash,
        replyContentHash: replyHash,
        prototypeVersionId: versionId,
        prototypeContentHash: contentHash(JSON.stringify(files)),
        prototypeDeployHash: deployment.deployHash,
        policyVersion: POLICY_VERSION,
        promptVersion: builderPrompt.versionTag,
        expiresAt,
      }),
      sourceLatestInboundMessageId: input.sourceLatestInboundMessageId,
      conversationHash: input.sourceConversationHash,
      replyText: deliveryMessage,
      replyContentHash: replyHash,
      prototypeVersionId: versionId,
      prototypeContentHash: contentHash(JSON.stringify(files)),
      prototypeDeployHash: deployment.deployHash,
      // The one URL this approval authorizes. Nothing else may appear.
      approvedUrls: [deployment.immutableUrl],
      policyVersion: POLICY_VERSION,
      promptVersion: builderPrompt.versionTag,
      expiresAt,
      correlationId: input.correlationId,
    });

    await pool.query(
      `UPDATE prototype_jobs SET status = 'AWAITING_APPROVAL', updated_at = now() WHERE id = $1`,
      [input.jobId],
    );

    increment(METRIC_NAMES.prototypeBuilds, { outcome: 'awaiting_approval' });
    increment(METRIC_NAMES.approvalsRequested, { action: 'SEND_PROTOTYPE_LINK' });

    await notifyOperator(context, {
      conversationId: input.conversationId,
      kind: 'PROTOTYPE_APPROVAL_READY',
      subject: `Prototype ready for ${input.companyName}`,
      // No URL and no reply text in the email. The operator signs in to see
      // the screenshots, the evidence and the exact message before approving.
      body: `A concept for ${input.companyName} passed QA and is waiting for your approval. Nothing has been sent to the prospect.`,
      dedupeKey: `prototype:${approval.id}`,
    });

    return {
      status: 'AWAITING_APPROVAL',
      approvalId: approval.id,
      url: deployment.immutableUrl,
    };
  }

  await failJob(
    context,
    input,
    `QA failed on every attempt: ${lastFindings.map((finding) => finding.detail).join('; ')}`,
  );
  return { status: 'QA_FAILED', findings: lastFindings };
}

async function storeVersion(
  context: AppContext,
  input: {
    jobId: string;
    version: number;
    hypothesis: string;
    businessReasoning: string;
    files: readonly PrototypeFile[];
    qaReport: unknown;
    promptVersion: string;
    desktopScreenshot: string | null;
    mobileScreenshot: string | null;
  },
): Promise<string> {
  const result = await getPool().query<{ id: string }>(
    `INSERT INTO prototype_versions
       (prototype_job_id, version, hypothesis, business_reasoning, files, content_hash,
        qa_report, qa_passed, desktop_screenshot_path, mobile_screenshot_path, prompt_version)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING id`,
    [
      input.jobId,
      input.version,
      input.hypothesis,
      input.businessReasoning,
      JSON.stringify(input.files),
      contentHash(JSON.stringify(input.files)),
      JSON.stringify(input.qaReport),
      (input.qaReport as { passed?: boolean }).passed === true,
      input.desktopScreenshot,
      input.mobileScreenshot,
      input.promptVersion,
    ],
  );
  const id = result.rows[0]?.id;
  if (!id) throw new Error('failed to store prototype version');
  context.logger.info('stored prototype version', { jobId: input.jobId, version: input.version });
  return id;
}

async function failJob(
  context: AppContext,
  input: PrototypeJobInput,
  detail: string,
): Promise<void> {
  await getPool().query(
    `UPDATE prototype_jobs SET status = 'FAILED', last_error = $2, updated_at = now() WHERE id = $1`,
    [input.jobId, detail],
  );
  increment(METRIC_NAMES.prototypeBuilds, { outcome: 'failed' });
  await notifyOperator(context, {
    conversationId: input.conversationId,
    kind: 'HUMAN_HANDOFF',
    subject: `Prototype build stopped for ${input.companyName}`,
    body: detail,
    dedupeKey: `prototype-failed:${input.jobId}`,
  });
}

function buildPrototypeUserContent(
  input: PrototypeJobInput,
  previousFindings: readonly QaFinding[],
): string {
  const retryNote =
    previousFindings.length > 0
      ? [
          '<previous_attempt_failures>',
          ...previousFindings.map((finding) => `- ${finding.check}: ${finding.detail}`),
          '</previous_attempt_failures>',
          '',
        ].join('\n')
      : '';

  return [
    retryNote,
    '<company>',
    `name: ${input.companyName}`,
    `website: ${input.companyDomain ?? 'unknown'}`,
    '</company>',
    '',
    '<untrusted_data source="conversation">',
    input.conversationText,
    '</untrusted_data>',
  ].join('\n');
}
