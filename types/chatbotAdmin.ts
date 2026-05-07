export type ChatbotTone = 'warm' | 'professional' | 'direct' | 'playful'
export type ChatbotVerbosity = 'brief' | 'balanced' | 'detailed'
export type ChatbotVoiceMode = 'assistant' | 'first-person'
export type ChatbotCtaStyle = 'none' | 'soft' | 'explicit'
export type ChatbotUncertaintyStyle = 'direct' | 'soft'
export type ChatbotConfigStatus = 'draft' | 'live' | 'archived'

export type ChatbotBehaviorSettings = {
  assistantLabel: string
  personaLabel: string
  tone: ChatbotTone
  verbosity: ChatbotVerbosity
  voiceMode: ChatbotVoiceMode
  ctaStyle: ChatbotCtaStyle
  uncertaintyStyle: ChatbotUncertaintyStyle
}

export type ChatbotModelSettings = {
  chatModel: string
  embeddingModel: string
  temperature: number
  maxTokens: number
  fallbackModel: string | null
}

export type ChatbotRetrievalSettings = {
  enabled: boolean
  topK: number
  similarityThreshold: number
  useConversationHistory: boolean
  allowedSourceTypes: string[]
  allowedRoutes: string[]
}

export type ChatbotPromptSettings = {
  systemPromptTemplate: string
  brandFraming: string
  disallowedClaims: string[]
}

export type ChatbotOperationsSettings = {
  chatEnabled: boolean
  rateLimitRequests: number
  rateLimitWindowMs: number
}

export type ChatbotFocusTopic = 'about' | 'career' | 'projects' | 'technology' | 'personal'

export type ChatbotFocusSettings = {
  priorityTopics: ChatbotFocusTopic[]
  priorityRoles: string[]
}

export type ChatbotSafetySettings = {
  strictGrounding: boolean
  minContextSimilarity: number
}

export type ChatbotDashboardSettings = {
  behavior: ChatbotBehaviorSettings
  model: ChatbotModelSettings
  retrieval: ChatbotRetrievalSettings
  prompt: ChatbotPromptSettings
  operations: ChatbotOperationsSettings
  safety: ChatbotSafetySettings
  focus: ChatbotFocusSettings
}

export type ChatbotConfigVersion = {
  id: string
  versionNumber: number
  status: ChatbotConfigStatus
  label: string
  notes: string | null
  publishNote: string | null
  createdBy: string
  createdAt: string
  publishedAt: string | null
  settings: ChatbotDashboardSettings
}

export type ChatbotAdminSession = {
  authenticated: boolean
  configured: boolean
}

export type ChatbotAdminConfigResponse = {
  live: ChatbotConfigVersion | null
  draft: ChatbotConfigVersion | null
}

export type ThemeDashboardSettings = {
  defaultTheme: 'light' | 'dark'
  cursorScubaDiverEnabled: boolean
  bubbleOverlayEnabled: boolean
  heroMotionIntensity: number
  bubbleIntensity: number
  cursorReactionStrength: number
  animationEnabled: boolean
}

export type ThemeAdminConfigResponse = {
  live: ThemeDashboardSettings | null
  draft: ThemeDashboardSettings | null
}

export type AdminLoginRequest = {
  password: string
}

export type AdminLoginResponse = {
  ok: boolean
  error?: string
}

export type AdminSessionResponse = ChatbotAdminSession

export type AdminSaveDraftRequest = {
  settings: ChatbotDashboardSettings | ThemeDashboardSettings
  notes?: string
}

export type AdminSaveDraftResponse = {
  ok: boolean
  draftId: string
}

export type AdminPublishRequest = {
  notes?: string
}

export type AdminPublishResponse = {
  ok: boolean
  liveVersionId?: string
}

export type ChatbotSource = {
  id: string
  sourceKey: string
  label: string
  sourceType: string
  enabled: boolean
  routeScope: string | null
  documentCount: number | null
  lastIngestedAt: string | null
  lastError: string | null
}

export type ChatbotLogEntry = {
  id: string
  conversationId: string
  role: 'user' | 'assistant' | 'system'
  content: string
  mode: string
  model: string | null
  retrievalEnabled: boolean
  matchedSources: unknown[]
  latencyMs: number | null
  errorCode: string | null
  errorMessage: string | null
  createdAt: string
}

export type ChatbotAnalyticsSummary = {
  totalMessages: number
  userMessages: number
  assistantMessages: number
  conversations: number
  errorCount: number
  averageLatencyMs: number | null
  fallbackCount: number
  liveCount: number
}

export type ChatbotIngestionRun = {
  id: string
  startedAt: string
  completedAt: string | null
  status: string
  triggerType: string
  sourceCount: number | null
  documentCount: number | null
  embeddedCount: number | null
  unchangedCount: number | null
  removedCount: number | null
  errorSummary: string | null
}

export type ChatbotConfigSummary = Pick<
  ChatbotConfigVersion,
  'id' | 'versionNumber' | 'status' | 'label' | 'createdAt' | 'publishedAt' | 'notes' | 'publishNote'
>

export type AdminTestResponse = {
  ok: boolean
  prompt: string
  response: string
  mode: 'draft' | 'live'
  sources: unknown[]
  latencyMs: number
}

export type AdminCompareResponse = {
  prompt: string
  live: AdminTestResponse
  draft: AdminTestResponse
}
