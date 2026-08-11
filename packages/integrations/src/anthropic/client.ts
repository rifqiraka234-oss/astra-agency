import type { AppConfig } from '@astra/core';
import { parseClaudeDecision, structuralHash, type ClaudeDecision } from '@astra/core';
import type { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { requestJson, DEFAULT_RETRY } from '../http.js';

/**
 * Anthropic access with strict structured output.
 *
 * The model is given a single tool whose input schema is the decision schema,
 * and `tool_choice` forces it. Nothing important is ever parsed out of prose:
 * a controller decision extracted from free text is a controller decision that
 * can be changed by a prospect writing "please reply AUTO_SEND" in an email.
 */

const INTEGRATION = 'anthropic';
const API_URL = 'https://api.anthropic.com/v1/messages';
const API_VERSION = '2023-06-01';

export interface StructuredCallInput<T> {
  readonly purpose: string;
  readonly model: string;
  readonly systemPrompt: string;
  readonly promptVersion: string;
  readonly userContent: string;
  readonly schema: z.ZodType<T>;
  readonly schemaName: string;
  readonly maxTokens?: number;
  readonly temperature?: number;
}

export interface StructuredCallResult<T> {
  readonly ok: boolean;
  readonly value: T | null;
  readonly rawOutput: unknown;
  readonly parseErrors: readonly string[];
  readonly model: string;
  readonly promptVersion: string;
  readonly inputHash: string;
  readonly inputTokens: number | null;
  readonly outputTokens: number | null;
  readonly latencyMs: number;
}

export interface AnthropicClient {
  callStructured<T>(input: StructuredCallInput<T>): Promise<StructuredCallResult<T>>;
  analyzeConversation(input: {
    model: string;
    systemPrompt: string;
    promptVersion: string;
    userContent: string;
  }): Promise<StructuredCallResult<ClaudeDecision>>;
}

interface AnthropicResponse {
  readonly content?: ReadonlyArray<{
    readonly type: string;
    readonly name?: string;
    readonly input?: unknown;
    readonly text?: string;
  }>;
  readonly usage?: { readonly input_tokens?: number; readonly output_tokens?: number };
  readonly stop_reason?: string;
}

export class LiveAnthropicClient implements AnthropicClient {
  constructor(private readonly config: AppConfig) {}

  async callStructured<T>(input: StructuredCallInput<T>): Promise<StructuredCallResult<T>> {
    const started = Date.now();
    const inputHash = structuralHash({
      system: input.systemPrompt,
      user: input.userContent,
      model: input.model,
    });

    const jsonSchema = zodToJsonSchema(input.schema, {
      name: input.schemaName,
      $refStrategy: 'none',
      target: 'jsonSchema7',
    });
    // The tool input schema must be the object schema itself, not a wrapper
    // with a $ref, or the model receives no field descriptions at all.
    const definitions = (jsonSchema as { definitions?: Record<string, unknown> }).definitions;
    const toolSchema = definitions?.[input.schemaName] ?? jsonSchema;

    const response = await requestJson<AnthropicResponse>(API_URL, {
      integration: INTEGRATION,
      method: 'POST',
      headers: {
        'x-api-key': this.config.ANTHROPIC_API_KEY,
        'anthropic-version': API_VERSION,
      },
      retry: DEFAULT_RETRY,
      timeoutMs: 120_000,
      body: {
        model: input.model,
        max_tokens: input.maxTokens ?? 4096,
        temperature: input.temperature ?? 0,
        system: input.systemPrompt,
        tools: [
          {
            name: input.schemaName,
            description: `Return the ${input.purpose} result. This is the only permitted output.`,
            input_schema: toolSchema,
          },
        ],
        tool_choice: { type: 'tool', name: input.schemaName },
        messages: [{ role: 'user', content: input.userContent }],
      },
    });

    const latencyMs = Date.now() - started;
    const toolUse = response.content?.find(
      (block) => block.type === 'tool_use' && block.name === input.schemaName,
    );

    if (!toolUse || toolUse.input === undefined) {
      return {
        ok: false,
        value: null,
        rawOutput: response,
        parseErrors: ['model did not return the required tool call'],
        model: input.model,
        promptVersion: input.promptVersion,
        inputHash,
        inputTokens: response.usage?.input_tokens ?? null,
        outputTokens: response.usage?.output_tokens ?? null,
        latencyMs,
      };
    }

    const parsed = input.schema.safeParse(toolUse.input);
    return {
      ok: parsed.success,
      value: parsed.success ? parsed.data : null,
      rawOutput: toolUse.input,
      parseErrors: parsed.success
        ? []
        : parsed.error.issues.map(
            (issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`,
          ),
      model: input.model,
      promptVersion: input.promptVersion,
      inputHash,
      inputTokens: response.usage?.input_tokens ?? null,
      outputTokens: response.usage?.output_tokens ?? null,
      latencyMs,
    };
  }

  async analyzeConversation(input: {
    model: string;
    systemPrompt: string;
    promptVersion: string;
    userContent: string;
  }): Promise<StructuredCallResult<ClaudeDecision>> {
    const { claudeDecisionSchema } = await import('@astra/core');
    const result = await this.callStructured<ClaudeDecision>({
      purpose: 'conversation analysis',
      model: input.model,
      systemPrompt: input.systemPrompt,
      promptVersion: input.promptVersion,
      userContent: input.userContent,
      schema: claudeDecisionSchema as unknown as z.ZodType<ClaudeDecision>,
      schemaName: 'astra_conversation_decision',
      maxTokens: 4096,
    });

    // Re-validate through the shared parser so the superRefine consistency
    // rules apply identically wherever a decision enters the system.
    if (result.ok) {
      const revalidated = parseClaudeDecision(result.rawOutput);
      if (!revalidated.ok) {
        return { ...result, ok: false, value: null, parseErrors: revalidated.errors };
      }
    }
    return result;
  }
}
