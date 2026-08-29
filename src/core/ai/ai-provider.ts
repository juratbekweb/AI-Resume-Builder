export interface AIProviderStreamResponse {
  chunk: string;
  isDone: boolean;
}

export interface AIProviderMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface IAIProvider {
  /**
   * Identifies the provider (e.g., 'openai', 'anthropic', 'gemini')
   */
  readonly name: string;

  /**
   * Standard completion for single prompts
   */
  complete(prompt: string, options?: Record<string, unknown>): Promise<string>;

  /**
   * Streaming completion for real-time UI updates
   */
  stream(prompt: string, onChunk: (chunk: string) => void, options?: Record<string, unknown>): Promise<void>;

  /**
   * Multi-turn chat completion
   */
  chat(messages: AIProviderMessage[], options?: Record<string, unknown>): Promise<string>;
}
