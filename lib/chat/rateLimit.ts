type Bucket = {
  remaining: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function takeRateLimitToken(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const safeLimit = Math.max(1, Math.trunc(limit));
  const safeWindowMs = Math.max(1000, Math.trunc(windowMs));
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const next = {
      remaining: safeLimit - 1,
      resetAt: now + safeWindowMs,
    };
    buckets.set(key, next);
    return { allowed: true, remaining: next.remaining, resetAt: next.resetAt };
  }

  if (existing.remaining <= 0) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.remaining -= 1;
  return { allowed: true, remaining: existing.remaining, resetAt: existing.resetAt };
}

