import type { ClaudeDecision } from '@astra/core';
import { parseClaudeDecision, structuralHash } from '@astra/core';
import type {
  AnthropicClient,
  StructuredCallInput,
  StructuredCallResult,
} from './client.js';

/**
 * Scripted Anthropic client for TEST mode and tests.
 *
 * Responses are queued in advance. An empty queue is an error rather than a
 * default response: a test that accidentally triggers an extra model call
 * should fail loudly, not silently receive a benign decision.
 */
export class FakeAnthropicClient implements AnthropicClient {
  private readonly queue: unknown[] = [];
  readonly calls: Array<{ purpose: string; promptVersion: string; userContent: string }> = [];

  enqueue(response: unknown): this {
    this.queue.push(response);
    return this;
  }

  enqueueDecision(decision: ClaudeDecision): this {
    return this.enqueue(decision);
  }

  async callStructured<T>(input: StructuredCallInput<T>): Promise<StructuredCallResult<T>> {
    this.calls.push({
      purpose: input.purpose,
      promptVersion: input.promptVersion,
      userContent: input.userContent,
    });

    if (this.queue.length === 0) {
      throw new Error(
        `FakeAnthropicClient received an unexpected call for "${input.purpose}" with no queued response`,
      );
    }
    const raw = this.queue.shift();
    const parsed = input.schema.safeParse(raw);

    return {
      ok: parsed.success,
      value: parsed.success ? parsed.data : null,
      rawOutput: raw,
      parseErrors: parsed.success
        ? []
        : parsed.error.issues.map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`),
      model: input.model,
      promptVersion: input.promptVersion,
      inputHash: structuralHash({ user: input.userContent }),
      inputTokens: 100,
      outputTokens: 200,
      latencyMs: 1,
    };
  }

  async analyzeConversation(input: {
    model: string;
    systemPrompt: string;
    promptVersion: string;
    userContent: string;
  }): Promise<StructuredCallResult<ClaudeDecision>> {
    this.calls.push({
      purpose: 'conversation analysis',
      promptVersion: input.promptVersion,
      userContent: input.userContent,
    });

    if (this.queue.length === 0) {
      throw new Error('FakeAnthropicClient received an unexpected analysis call with no queued response');
    }
    const raw = this.queue.shift();
    const parsed = parseClaudeDecision(raw);

    return {
      ok: parsed.ok,
      value: parsed.ok ? parsed.decision : null,
      rawOutput: raw,
      parseErrors: parsed.ok ? [] : parsed.errors,
      model: input.model,
      promptVersion: input.promptVersion,
      inputHash: structuralHash({ user: input.userContent }),
      inputTokens: 100,
      outputTokens: 200,
      latencyMs: 1,
    };
  }
}
