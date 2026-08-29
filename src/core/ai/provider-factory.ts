import type { IAIProvider } from "./ai-provider";
import { GeminiProvider } from "./gemini-provider";
import { FallbackProvider } from "./fallback-provider";

/**
 * Returns the appropriate AI provider based on environment configuration.
 * - If GEMINI_API_KEY is set → GeminiProvider (real API call with 15s timeout)
 * - Otherwise → FallbackProvider (deterministic server-side generation)
 *
 * The returned provider always satisfies IAIProvider.
 * Callers should use provider.name to identify which provider generated the result.
 */
export function getAIProvider(): IAIProvider {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey.length > 0) {
    return new GeminiProvider(apiKey);
  }
  return new FallbackProvider();
}
