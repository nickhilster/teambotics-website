type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OpenAiChatChoice = {
  message?: {
    content?: string | null;
  };
};

type OpenAiChatResponse = {
  choices?: OpenAiChatChoice[];
};

type OpenAiEmbeddingResponse = {
  data?: Array<{
    embedding?: number[];
  }>;
};

type OpenAiModerationResponse = {
  results?: Array<{
    flagged?: boolean;
  }>;
};

export type OpenAiRuntimeConfig = {
  apiKey?: string | null;
  chatModel: string;
  embeddingModel: string;
  maxTokens?: number;
  temperature?: number;
};

async function postOpenAi<T>(path: string, apiKey: string, payload: Record<string, unknown>) {
  const response = await fetch(`https://api.openai.com/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`OpenAI ${path} request failed: ${response.status} ${errorText}`.trim());
  }

  return response.json() as Promise<T>;
}

export async function createEmbedding(input: string, config: OpenAiRuntimeConfig) {
  if (!config.apiKey) {
    return null;
  }

  const payload = await postOpenAi<OpenAiEmbeddingResponse>("embeddings", config.apiKey, {
    model: config.embeddingModel,
    input,
    dimensions: 1536,
  });

  return payload.data?.[0]?.embedding ?? null;
}

export async function createChatCompletion(messages: ChatMessage[], config: OpenAiRuntimeConfig) {
  if (!config.apiKey) {
    return null;
  }

  const payload = await postOpenAi<OpenAiChatResponse>("chat/completions", config.apiKey, {
    model: config.chatModel,
    messages,
    temperature: config.temperature ?? 0.3,
    max_tokens: config.maxTokens ?? 900,
  });

  return payload.choices?.[0]?.message?.content?.trim() || null;
}

export async function moderateInput(input: string, apiKey?: string | null) {
  if (!apiKey) {
    return { flagged: false };
  }

  try {
    const payload = await postOpenAi<OpenAiModerationResponse>("moderations", apiKey, {
      model: "omni-moderation-latest",
      input,
    });

    return { flagged: Boolean(payload.results?.[0]?.flagged) };
  } catch {
    return { flagged: false };
  }
}

export function getOpenAiRuntimeConfig(overrides: {
  chatModel?: string | null;
  embeddingModel?: string | null;
  maxTokens?: number | null;
  temperature?: number | null;
}): OpenAiRuntimeConfig {
  return {
    apiKey: process.env.OPENAI_API_KEY ?? null,
    chatModel: overrides.chatModel || process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
    embeddingModel: overrides.embeddingModel || process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small",
    maxTokens: overrides.maxTokens ?? 900,
    temperature: overrides.temperature ?? 0.3,
  };
}

