const RETRIABLE_NEON_ERROR_SNIPPETS = [
  "connection closed",
  "connection terminated unexpectedly",
  "econnreset",
  "fetch failed",
  "socket hang up",
] as const;

type NeonRetryOptions = {
  retries?: number;
  delayMs?: number;
  onRetry?: (attempt: number, error: Error) => void;
};

function wait(delayMs: number) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

export function isRetriableNeonQueryError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();
  return RETRIABLE_NEON_ERROR_SNIPPETS.some((snippet) => message.includes(snippet));
}

export async function withNeonQueryRetry<T>(
  operation: () => Promise<T>,
  options: NeonRetryOptions = {},
): Promise<T> {
  const { retries = 2, delayMs = 250, onRetry } = options;
  let attempt = 0;

  while (true) {
    try {
      return await operation();
    } catch (error) {
      if (!(error instanceof Error) || attempt >= retries || !isRetriableNeonQueryError(error)) {
        throw error;
      }

      attempt += 1;
      onRetry?.(attempt, error);
      if (delayMs > 0) {
        await wait(delayMs * attempt);
      }
    }
  }
}