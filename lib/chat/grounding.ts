import type { ChatSource } from "@/lib/chat/retrieval";
import type { ChatbotDashboardSettings } from "@/types/chatbotAdmin";

export function getGroundingThreshold(settings: ChatbotDashboardSettings) {
  if (!settings.safety.strictGrounding) {
    return settings.retrieval.similarityThreshold;
  }

  return Math.max(settings.retrieval.similarityThreshold, settings.safety.minContextSimilarity);
}

export function filterGroundedSources(sources: ChatSource[], settings: ChatbotDashboardSettings) {
  if (!settings.safety.strictGrounding) {
    return sources;
  }

  const threshold = getGroundingThreshold(settings);
  return sources.filter((source) => source.similarity >= threshold);
}