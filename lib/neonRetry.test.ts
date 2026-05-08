import { describe, expect, it, vi } from "vitest";
import { isRetriableNeonQueryError, withNeonQueryRetry } from "./neonRetry";

describe("isRetriableNeonQueryError", () => {
  it("detects connection closed errors", () => {
    expect(isRetriableNeonQueryError(new Error("connection closed"))).toBe(true);
  });

  it("ignores non-transient errors", () => {
    expect(isRetriableNeonQueryError(new Error("syntax error at or near SELECT"))).toBe(false);
  });
});

describe("withNeonQueryRetry", () => {
  it("retries transient query errors", async () => {
    const operation = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error("connection closed"))
      .mockResolvedValueOnce("ok");
    const onRetry = vi.fn();

    await expect(withNeonQueryRetry(operation, { delayMs: 0, onRetry })).resolves.toBe("ok");
    expect(operation).toHaveBeenCalledTimes(2);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("does not retry non-transient errors", async () => {
    const operation = vi.fn<() => Promise<string>>().mockRejectedValue(new Error("permission denied"));

    await expect(withNeonQueryRetry(operation, { delayMs: 0, retries: 2 })).rejects.toThrow("permission denied");
    expect(operation).toHaveBeenCalledTimes(1);
  });
});