import { describe, expect, it } from "vitest";
import { PUBLIC_CHAT_EVALUATORS } from "@/lib/chat/evaluators";
import { retrieveLocalContext } from "@/lib/chat/retrieval";

describe("public chatbot evaluators", () => {
  it("retrieves the expected top source for key public questions", () => {
    for (const evaluator of PUBLIC_CHAT_EVALUATORS) {
      const [topSource] = retrieveLocalContext(evaluator.question, {
        topK: 1,
        similarityThreshold: 0.28,
      });

      expect(topSource?.title).toBe(evaluator.expectedTitle);
      expect(topSource?.route).toBe(evaluator.expectedRoute);
    }
  });
});