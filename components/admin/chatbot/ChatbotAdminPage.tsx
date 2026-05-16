'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AlertCircle, Loader2, LogOut } from 'lucide-react';
import { TeamboticsSVGLogo } from '@/components/layout/TeamboticsSVGLogo';
import { Button } from '@/components/ui/Button';
import LoginGate from '@/components/admin/common/LoginGate';
import type {
  AdminCompareResponse,
  AdminTestResponse,
  ChatbotAdminConfigResponse,
  ChatbotAnalyticsSummary,
  ChatbotConfigSummary,
  ChatbotConfigVersion,
  ChatbotDashboardSettings,
  ChatbotIngestionRun,
  ChatbotLogEntry,
  ChatbotSource,
} from '@/types/chatbotAdmin';

const ADMIN_TABS = [
  { id: 'behavior', label: 'Behavior' },
  { id: 'model', label: 'Model' },
  { id: 'retrieval', label: 'Retrieval' },
  { id: 'prompt', label: 'Prompt' },
  { id: 'operations', label: 'Operations' },
  { id: 'safety', label: 'Safety' },
  { id: 'focus', label: 'Focus' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'logs', label: 'Logs' },
  { id: 'testing', label: 'Testing' },
  { id: 'compare', label: 'Compare' },
  { id: 'versions', label: 'Versions' },
  { id: 'sources', label: 'Sources' },
  { id: 'ingestion', label: 'Ingestion' },
] as const;

type AdminTab = (typeof ADMIN_TABS)[number]['id'];

const DEFAULT_SETTINGS: ChatbotDashboardSettings = {
  behavior: {
    assistantLabel: 'Teambotics Assistant',
    personaLabel: 'Systems Lab Guide',
    tone: 'professional',
    verbosity: 'balanced',
    voiceMode: 'assistant',
    ctaStyle: 'soft',
    uncertaintyStyle: 'soft',
  },
  model: {
    chatModel: 'gpt-4o-mini',
    embeddingModel: 'text-embedding-3-large',
    temperature: 0.4,
    maxTokens: 1000,
    fallbackModel: null,
  },
  retrieval: {
    enabled: true,
    topK: 4,
    similarityThreshold: 0.22,
    useConversationHistory: true,
    allowedSourceTypes: ['company', 'product', 'case-study', 'capability'],
    allowedRoutes: [],
  },
  prompt: {
    systemPromptTemplate: 'You are Teambotics Assistant. Answer only from approved Teambotics public source material and clearly say when the retrieved context is insufficient.',
    brandFraming: 'Answer with operational confidence, compliance awareness, engineering clarity, and explicit grounding in published Teambotics sources.',
    disallowedClaims: ['I am a lawyer', 'I am a doctor', 'I have access to private data', 'I can confirm private client relationships'],
  },
  operations: {
    chatEnabled: true,
    rateLimitRequests: 20,
    rateLimitWindowMs: 60000,
  },
  safety: {
    strictGrounding: true,
    minContextSimilarity: 0.28,
  },
  focus: {
    priorityTopics: ['about', 'projects', 'technology'],
    priorityRoles: ['product leader', 'operations leader'],
  },
};

function formatDate(value: string | null | undefined) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatMs(value: number | null | undefined) {
  return typeof value === 'number' ? `${value} ms` : '—';
}

function truncate(value: string, maxLength = 180) {
  return value.length > maxLength ? `${value.slice(0, maxLength).trim()}…` : value;
}

function getSourceCount(sources: unknown[]) {
  return Array.isArray(sources) ? sources.length : 0;
}

export default function ChatbotAdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>(() => {
    if (typeof window === 'undefined') {
      return 'behavior';
    }

    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') as AdminTab | null;
    return tab && ADMIN_TABS.some((entry) => entry.id === tab) ? tab : 'behavior';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAuthConfigured, setIsAuthConfigured] = useState<boolean | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [liveConfig, setLiveConfig] = useState<ChatbotConfigVersion | null>(null);
  const [draftConfig, setDraftConfig] = useState<ChatbotConfigVersion | null>(null);
  const [draftSettings, setDraftSettings] = useState<ChatbotDashboardSettings | null>(null);
  const [isDraftDirty, setIsDraftDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [panelError, setPanelError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<ChatbotAnalyticsSummary | null>(null);
  const [logs, setLogs] = useState<ChatbotLogEntry[]>([]);
  const [versions, setVersions] = useState<ChatbotConfigSummary[]>([]);
  const [sources, setSources] = useState<ChatbotSource[]>([]);
  const [ingestionRuns, setIngestionRuns] = useState<ChatbotIngestionRun[]>([]);
  const [isPanelLoading, setIsPanelLoading] = useState(false);
  const [testPrompt, setTestPrompt] = useState('What should I know about LTB Buddy?');
  const [testResult, setTestResult] = useState<AdminTestResponse | null>(null);
  const [comparePromptValue, setComparePromptValue] = useState('Compare LTB Buddy and EasyBuddy.');
  const [compareResult, setCompareResult] = useState<AdminCompareResponse | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    void checkSession();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      void loadConfig();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (activeTab === 'analytics') void loadAnalytics();
    if (activeTab === 'logs') void loadLogs();
    if (activeTab === 'versions') void loadVersions();
    if (activeTab === 'sources') void loadSources();
    if (activeTab === 'ingestion') void loadIngestion();
  }, [activeTab, isAuthenticated]);

  async function checkSession() {
    try {
      const response = await fetch('/api/admin/session');
      const payload = await response.json();
      setIsAuthenticated(Boolean(payload.authenticated));
      setIsAuthConfigured(Boolean(payload.configured));
    } catch {
      setIsAuthenticated(false);
    }
  }

  const login = async (password: string) => {
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const payload = await response.json();
      if (response.ok && payload.ok) {
        setIsAuthenticated(true);
        return true;
      }
      setLoginError(payload.error ?? 'Login failed');
      return false;
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed');
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setLiveConfig(null);
    setDraftConfig(null);
    setDraftSettings(null);
    setIsDraftDirty(false);
  };

  async function loadConfig() {
    setPanelError(null);
    try {
      const response = await fetch('/api/admin/chatbot/config');
      if (!response.ok) {
        throw new Error('Failed to load config');
      }
      const payload: ChatbotAdminConfigResponse = await response.json();
      setLiveConfig(payload.live);
      setDraftConfig(payload.draft);
      setDraftSettings(payload.draft?.settings ?? payload.live?.settings ?? DEFAULT_SETTINGS);
      setIsDraftDirty(Boolean(payload.draft));
    } catch (err) {
      setPanelError(err instanceof Error ? err.message : 'Unable to load config');
    }
  }

  const saveDraft = async () => {
    if (!draftSettings) {
      return;
    }
    setIsSaving(true);
    setSaveError(null);

    try {
      const response = await fetch('/api/admin/chatbot/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: draftSettings }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Unable to save draft');
      }
      setIsDraftDirty(false);
      await loadConfig();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Unable to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const publish = async () => {
    setIsPublishing(true);
    setPublishError(null);

    try {
      const response = await fetch('/api/admin/chatbot/publish', { method: 'POST' });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Unable to publish');
      }
      await loadConfig();
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : 'Unable to publish');
    } finally {
      setIsPublishing(false);
    }
  };

  const updateSettings = (updater: (current: ChatbotDashboardSettings) => ChatbotDashboardSettings) => {
    if (!draftSettings) return;
    const next = updater(draftSettings);
    setDraftSettings(next);
    setIsDraftDirty(true);
  };

  const selectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.replaceState(null, '', url);
  };

  async function loadAnalytics() {
    setIsPanelLoading(true);
    setPanelError(null);
    try {
      const response = await fetch('/api/admin/chatbot/analytics');
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to load analytics');
      }
      setAnalytics(payload.summary as ChatbotAnalyticsSummary);
    } catch (err) {
      setPanelError(err instanceof Error ? err.message : 'Unable to load analytics');
    } finally {
      setIsPanelLoading(false);
    }
  }

  async function loadLogs() {
    setIsPanelLoading(true);
    setPanelError(null);
    try {
      const response = await fetch('/api/admin/chatbot/logs?limit=25');
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to load logs');
      }
      setLogs(Array.isArray(payload.logs) ? payload.logs : []);
    } catch (err) {
      setPanelError(err instanceof Error ? err.message : 'Unable to load logs');
    } finally {
      setIsPanelLoading(false);
    }
  }

  async function loadVersions() {
    setIsPanelLoading(true);
    setPanelError(null);
    try {
      const response = await fetch('/api/admin/chatbot/versions');
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to load versions');
      }
      setVersions(Array.isArray(payload.versions) ? payload.versions : []);
    } catch (err) {
      setPanelError(err instanceof Error ? err.message : 'Unable to load versions');
    } finally {
      setIsPanelLoading(false);
    }
  }

  async function loadSources() {
    setIsPanelLoading(true);
    setPanelError(null);
    try {
      const response = await fetch('/api/admin/chatbot/sources');
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to load sources');
      }
      setSources(Array.isArray(payload.sources) ? payload.sources : []);
    } catch (err) {
      setPanelError(err instanceof Error ? err.message : 'Unable to load sources');
    } finally {
      setIsPanelLoading(false);
    }
  }

  async function loadIngestion() {
    setIsPanelLoading(true);
    setPanelError(null);
    try {
      const response = await fetch('/api/admin/chatbot/ingestion');
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to load ingestion runs');
      }
      setIngestionRuns(Array.isArray(payload.runs) ? payload.runs : []);
    } catch (err) {
      setPanelError(err instanceof Error ? err.message : 'Unable to load ingestion runs');
    } finally {
      setIsPanelLoading(false);
    }
  }

  const toggleSource = async (source: ChatbotSource) => {
    setPanelError(null);
    setActionMessage(null);
    try {
      const response = await fetch('/api/admin/chatbot/sources', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceKey: source.sourceKey, enabled: !source.enabled }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? 'Unable to update source');
      }
      setSources((current) => current.map((entry) => (
        entry.sourceKey === source.sourceKey ? payload.source as ChatbotSource : entry
      )));
      setActionMessage(`${payload.source.label} ${payload.source.enabled ? 'enabled' : 'disabled'}.`);
    } catch (err) {
      setPanelError(err instanceof Error ? err.message : 'Unable to update source');
    }
  };

  const requestReseed = async () => {
    setIsPanelLoading(true);
    setPanelError(null);
    setActionMessage(null);
    try {
      const response = await fetch('/api/admin/chatbot/ingestion', { method: 'POST' });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? 'Unable to request reseed');
      }
      setActionMessage(payload.message ?? 'Reseed requested.');
      await loadIngestion();
    } catch (err) {
      setPanelError(err instanceof Error ? err.message : 'Unable to request reseed');
    } finally {
      setIsPanelLoading(false);
    }
  };

  const runTest = async () => {
    const prompt = testPrompt.trim();
    if (!prompt) {
      setPanelError('Enter a prompt before running a test.');
      return;
    }

    setIsPanelLoading(true);
    setPanelError(null);
    setTestResult(null);
    try {
      const response = await fetch('/api/admin/chatbot/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? 'Unable to run prompt test');
      }
      setTestResult(payload as AdminTestResponse);
    } catch (err) {
      setPanelError(err instanceof Error ? err.message : 'Unable to run prompt test');
    } finally {
      setIsPanelLoading(false);
    }
  };

  const runCompare = async () => {
    const prompt = comparePromptValue.trim();
    if (!prompt) {
      setPanelError('Enter a prompt before comparing responses.');
      return;
    }

    setIsPanelLoading(true);
    setPanelError(null);
    setCompareResult(null);
    try {
      const response = await fetch('/api/admin/chatbot/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to compare prompts');
      }
      setCompareResult(payload as AdminCompareResponse);
    } catch (err) {
      setPanelError(err instanceof Error ? err.message : 'Unable to compare prompts');
    } finally {
      setIsPanelLoading(false);
    }
  };

  const renderBehaviorPanel = () => {
    if (!draftSettings) return null;
    return (
      <section className="panel-card">
        <h2 className="panel-title">Behavior settings</h2>
        <div className="form-grid">
          <label className="field-row">
            <span>Assistant label</span>
            <input
              value={draftSettings.behavior.assistantLabel}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                behavior: { ...current.behavior, assistantLabel: event.target.value },
              }))}
            />
          </label>
          <label className="field-row">
            <span>Persona label</span>
            <input
              value={draftSettings.behavior.personaLabel}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                behavior: { ...current.behavior, personaLabel: event.target.value },
              }))}
            />
          </label>
          <label className="field-row">
            <span>Tone</span>
            <select
              value={draftSettings.behavior.tone}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                behavior: { ...current.behavior, tone: event.target.value as typeof current.behavior.tone },
              }))}
            >
              <option value="warm">Warm</option>
              <option value="professional">Professional</option>
              <option value="direct">Direct</option>
              <option value="playful">Playful</option>
            </select>
          </label>
          <label className="field-row">
            <span>Verbosity</span>
            <select
              value={draftSettings.behavior.verbosity}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                behavior: { ...current.behavior, verbosity: event.target.value as typeof current.behavior.verbosity },
              }))}
            >
              <option value="brief">Brief</option>
              <option value="balanced">Balanced</option>
              <option value="detailed">Detailed</option>
            </select>
          </label>
          <label className="field-row">
            <span>Voice mode</span>
            <select
              value={draftSettings.behavior.voiceMode}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                behavior: { ...current.behavior, voiceMode: event.target.value as typeof current.behavior.voiceMode },
              }))}
            >
              <option value="assistant">Assistant</option>
              <option value="first-person">First person</option>
            </select>
          </label>
          <label className="field-row">
            <span>CTA style</span>
            <select
              value={draftSettings.behavior.ctaStyle}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                behavior: { ...current.behavior, ctaStyle: event.target.value as typeof current.behavior.ctaStyle },
              }))}
            >
              <option value="none">None</option>
              <option value="soft">Soft</option>
              <option value="explicit">Explicit</option>
            </select>
          </label>
          <label className="field-row">
            <span>Uncertainty voice</span>
            <select
              value={draftSettings.behavior.uncertaintyStyle}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                behavior: { ...current.behavior, uncertaintyStyle: event.target.value as typeof current.behavior.uncertaintyStyle },
              }))}
            >
              <option value="direct">Direct</option>
              <option value="soft">Soft</option>
            </select>
          </label>
        </div>
      </section>
    );
  };

  const renderModelPanel = () => {
    if (!draftSettings) return null;
    return (
      <section className="panel-card">
        <h2 className="panel-title">Model settings</h2>
        <div className="form-grid">
          <label className="field-row">
            <span>Chat model</span>
            <input
              value={draftSettings.model.chatModel}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                model: { ...current.model, chatModel: event.target.value },
              }))}
            />
          </label>
          <label className="field-row">
            <span>Embedding model</span>
            <input
              value={draftSettings.model.embeddingModel}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                model: { ...current.model, embeddingModel: event.target.value },
              }))}
            />
          </label>
          <label className="field-row">
            <span>Temperature</span>
            <input
              type="number"
              min="0"
              max="1"
              step="0.05"
              value={draftSettings.model.temperature}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                model: { ...current.model, temperature: Number(event.target.value) },
              }))}
            />
          </label>
          <label className="field-row">
            <span>Max tokens</span>
            <input
              type="number"
              min="100"
              max="2000"
              value={draftSettings.model.maxTokens}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                model: { ...current.model, maxTokens: Number(event.target.value) },
}))}
            />
          </label>
          <label className="field-row">
            <span>Fallback model</span>
            <input
              value={draftSettings.model.fallbackModel ?? ''}
              placeholder="Optional fallback model"
              onChange={(event) => updateSettings((current) => ({
                ...current,
                model: { ...current.model, fallbackModel: event.target.value || null },
}))}
            />
          </label>
        </div>
      </section>
    );
  };

  const renderRetrievalPanel = () => {
    if (!draftSettings) return null;
    return (
      <section className="panel-card">
        <h2 className="panel-title">Retrieval settings</h2>
        <div className="form-grid">
          <label className="field-row checkbox-row">
            <span>Enable retrieval</span>
            <input
              type="checkbox"
              checked={draftSettings.retrieval.enabled}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                retrieval: { ...current.retrieval, enabled: event.target.checked },
}))}
            />
          </label>
          <label className="field-row">
            <span>Top K sources</span>
            <input
              type="number"
              min="1"
              max="10"
              value={draftSettings.retrieval.topK}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                retrieval: { ...current.retrieval, topK: Number(event.target.value) },
}))}
            />
          </label>
          <label className="field-row">
            <span>Similarity threshold</span>
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={draftSettings.retrieval.similarityThreshold}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                retrieval: { ...current.retrieval, similarityThreshold: Number(event.target.value) },
}))}
            />
          </label>
          <label className="field-row checkbox-row">
            <span>Use conversation history</span>
            <input
              type="checkbox"
              checked={draftSettings.retrieval.useConversationHistory}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                retrieval: { ...current.retrieval, useConversationHistory: event.target.checked },
}))}
            />
          </label>
          <label className="field-row">
            <span>Allowed routes</span>
            <textarea
              value={draftSettings.retrieval.allowedRoutes.join('\n')}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                retrieval: { ...current.retrieval, allowedRoutes: event.target.value.split(/\s*\n\s*/).filter(Boolean) },
}))}
            />
          </label>
          <label className="field-row">
            <span>Allowed source categories</span>
            <textarea
              value={draftSettings.retrieval.allowedSourceTypes.join('\n')}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                retrieval: { ...current.retrieval, allowedSourceTypes: event.target.value.split(/\s*\n\s*/).filter(Boolean) },
}))}
            />
          </label>
        </div>
      </section>
    );
  };

  const renderPromptPanel = () => {
    if (!draftSettings) return null;
    return (
      <section className="panel-card">
        <h2 className="panel-title">Prompt settings</h2>
        <div className="form-grid">
          <label className="field-row">
            <span>System prompt template</span>
            <textarea
              value={draftSettings.prompt.systemPromptTemplate}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                prompt: { ...current.prompt, systemPromptTemplate: event.target.value },
}))}
            />
          </label>
          <label className="field-row">
            <span>Brand framing</span>
            <textarea
              value={draftSettings.prompt.brandFraming}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                prompt: { ...current.prompt, brandFraming: event.target.value },
}))}
            />
          </label>
          <label className="field-row">
            <span>Disallowed claims</span>
            <textarea
              value={draftSettings.prompt.disallowedClaims.join('\n')}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                prompt: { ...current.prompt, disallowedClaims: event.target.value.split(/\s*\n\s*/).filter(Boolean) },
}))}
            />
          </label>
        </div>
      </section>
    );
  };

  const renderOperationsPanel = () => {
    if (!draftSettings) return null;
    return (
      <section className="panel-card">
        <h2 className="panel-title">Operations</h2>
        <div className="form-grid">
          <label className="field-row checkbox-row">
            <span>Chat enabled</span>
            <input
              type="checkbox"
              checked={draftSettings.operations.chatEnabled}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                operations: { ...current.operations, chatEnabled: event.target.checked },
}))}
            />
          </label>
          <label className="field-row">
            <span>Rate limit requests</span>
            <input
              type="number"
              min="1"
              max="100"
              value={draftSettings.operations.rateLimitRequests}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                operations: { ...current.operations, rateLimitRequests: Number(event.target.value) },
}))}
            />
          </label>
          <label className="field-row">
            <span>Rate limit window (ms)</span>
            <input
              type="number"
              min="10000"
              value={draftSettings.operations.rateLimitWindowMs}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                operations: { ...current.operations, rateLimitWindowMs: Number(event.target.value) },
}))}
            />
          </label>
        </div>
      </section>
    );
  };

  const renderSafetyPanel = () => {
    if (!draftSettings) return null;
    return (
      <section className="panel-card">
        <h2 className="panel-title">Safety</h2>
        <div className="form-grid">
          <label className="field-row checkbox-row">
            <span>Strict grounding</span>
            <input
              type="checkbox"
              checked={draftSettings.safety.strictGrounding}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                safety: { ...current.safety, strictGrounding: event.target.checked },
}))}
            />
          </label>
          <label className="field-row">
            <span>Min context similarity</span>
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={draftSettings.safety.minContextSimilarity}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                safety: { ...current.safety, minContextSimilarity: Number(event.target.value) },
}))}
            />
          </label>
        </div>
      </section>
    );
  };

  const renderFocusPanel = () => {
    if (!draftSettings) return null;
    return (
      <section className="panel-card">
        <h2 className="panel-title">Focus</h2>
        <div className="form-grid">
          <label className="field-row">
            <span>Priority topics</span>
            <textarea
              value={draftSettings.focus.priorityTopics.join('\n')}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                focus: { ...current.focus, priorityTopics: event.target.value.split(/\s*\n\s*/).filter(Boolean) as typeof current.focus.priorityTopics },
}))}
            />
          </label>
          <label className="field-row">
            <span>Priority roles</span>
            <textarea
              value={draftSettings.focus.priorityRoles.join('\n')}
              onChange={(event) => updateSettings((current) => ({
                ...current,
                focus: { ...current.focus, priorityRoles: event.target.value.split(/\s*\n\s*/).filter(Boolean) },
}))}
            />
          </label>
        </div>
      </section>
    );
  };

  const renderResponseCard = (title: string, result: AdminTestResponse | null) => (
    <div className="admin-result-card">
      <div className="admin-result-card__header">
        <h3>{title}</h3>
        {result ? <span className="admin-pill">{result.mode}</span> : null}
      </div>
      {result ? (
        <>
          <p className="admin-result-card__meta">
            {formatMs(result.latencyMs)} · {getSourceCount(result.sources)} sources
          </p>
          <p className="admin-result-card__body">{result.response}</p>
        </>
      ) : (
        <p className="panel-description">Run a prompt to see the response, latency, and retrieval footprint.</p>
      )}
    </div>
  );

  const renderAnalyticsPanel = () => (
    <section className="panel-card">
      <div className="panel-heading-row">
        <div>
          <h2 className="panel-title">Analytics</h2>
          <p className="panel-description">Usage, reliability, and retrieval health from chatbot logs.</p>
        </div>
        <button type="button" className="admin-link-button" onClick={loadAnalytics}>
          Refresh
        </button>
      </div>
      {isPanelLoading && activeTab === 'analytics' ? <div className="panel-empty-state">Loading analytics…</div> : null}
      {analytics ? (
        <div className="admin-stat-grid">
          <div className="admin-stat-card">
            <span>Total messages</span>
            <strong>{analytics.totalMessages}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Conversations</span>
            <strong>{analytics.conversations}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Avg latency</span>
            <strong>{formatMs(analytics.averageLatencyMs)}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Live replies</span>
            <strong>{analytics.liveCount}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Fallback replies</span>
            <strong>{analytics.fallbackCount}</strong>
          </div>
          <div className="admin-stat-card">
            <span>Errors</span>
            <strong>{analytics.errorCount}</strong>
          </div>
        </div>
      ) : (
        <div className="panel-empty-state">No analytics available yet. Send a chat message to create telemetry.</div>
      )}
    </section>
  );

  const renderLogsPanel = () => (
    <section className="panel-card">
      <div className="panel-heading-row">
        <div>
          <h2 className="panel-title">Logs</h2>
          <p className="panel-description">Recent conversation events with retrieval, mode, latency, and errors.</p>
        </div>
        <button type="button" className="admin-link-button" onClick={loadLogs}>
          Refresh
        </button>
      </div>
      {isPanelLoading && activeTab === 'logs' ? <div className="panel-empty-state">Loading logs…</div> : null}
      <div className="admin-table-list">
        {logs.length > 0 ? logs.map((entry) => (
          <article className="admin-log-row" key={entry.id}>
            <div>
              <div className="admin-row-title">
                <span className="admin-pill">{entry.role}</span>
                <span className="admin-pill admin-pill--muted">{entry.mode}</span>
                <span>{formatDate(entry.createdAt)}</span>
              </div>
              <p>{truncate(entry.content)}</p>
              {entry.errorMessage ? <p className="admin-row-error">{entry.errorMessage}</p> : null}
            </div>
            <div className="admin-row-meta">
              <span>{formatMs(entry.latencyMs)}</span>
              <span>{entry.model ?? 'no model'}</span>
              <span>{getSourceCount(entry.matchedSources)} sources</span>
            </div>
          </article>
        )) : (
          <div className="panel-empty-state">No logs yet.</div>
        )}
      </div>
    </section>
  );

  const renderTestingPanel = () => (
    <section className="panel-card">
      <h2 className="panel-title">Testing</h2>
      <p className="panel-description">Run a production runtime prompt without using the public widget.</p>
      <div className="admin-tool-grid">
        <label className="field-row">
          <span>Test prompt</span>
          <textarea
            value={testPrompt}
            onChange={(event) => setTestPrompt(event.target.value)}
          />
        </label>
        <Button className="publish-button" onClick={runTest} variant="primary">
          {isPanelLoading && activeTab === 'testing' ? 'Running…' : 'Run test'}
        </Button>
      </div>
      {renderResponseCard('Live runtime response', testResult)}
    </section>
  );

  const renderComparePanel = () => (
    <section className="panel-card">
      <h2 className="panel-title">Compare</h2>
      <p className="panel-description">Compare two runtime passes side by side for prompt QA.</p>
      <div className="admin-tool-grid">
        <label className="field-row">
          <span>Compare prompt</span>
          <textarea
            value={comparePromptValue}
            onChange={(event) => setComparePromptValue(event.target.value)}
          />
        </label>
        <Button className="publish-button" onClick={runCompare} variant="primary">
          {isPanelLoading && activeTab === 'compare' ? 'Comparing…' : 'Compare responses'}
        </Button>
      </div>
      <div className="admin-compare-grid">
        {renderResponseCard('Live', compareResult?.live ?? null)}
        {renderResponseCard('Draft', compareResult?.draft ?? null)}
      </div>
    </section>
  );

  const renderVersionsPanel = () => (
    <section className="panel-card">
      <div className="panel-heading-row">
        <div>
          <h2 className="panel-title">Versions</h2>
          <p className="panel-description">Published, draft, and archived chatbot configurations.</p>
        </div>
        <button type="button" className="admin-link-button" onClick={loadVersions}>
          Refresh
        </button>
      </div>
      {isPanelLoading && activeTab === 'versions' ? <div className="panel-empty-state">Loading versions…</div> : null}
      <div className="admin-table-list">
        {versions.length > 0 ? versions.map((version) => (
          <article className="admin-log-row" key={version.id}>
            <div>
              <div className="admin-row-title">
                <span className="admin-pill">v{version.versionNumber}</span>
                <span className="admin-pill admin-pill--muted">{version.status}</span>
                <strong>{version.label}</strong>
              </div>
              <p>{version.notes ?? version.publishNote ?? 'No notes provided.'}</p>
            </div>
            <div className="admin-row-meta">
              <span>Created {formatDate(version.createdAt)}</span>
              <span>Published {formatDate(version.publishedAt)}</span>
            </div>
          </article>
        )) : (
          <div className="panel-empty-state">No versions available yet.</div>
        )}
      </div>
    </section>
  );

  const renderSourcesPanel = () => (
    <section className="panel-card">
      <div className="panel-heading-row">
        <div>
          <h2 className="panel-title">Sources</h2>
          <p className="panel-description">Govern which knowledge groups can be retrieved by the assistant.</p>
        </div>
        <button type="button" className="admin-link-button" onClick={loadSources}>
          Refresh
        </button>
      </div>
      {isPanelLoading && activeTab === 'sources' ? <div className="panel-empty-state">Loading sources…</div> : null}
      <div className="admin-source-grid">
        {sources.length > 0 ? sources.map((source) => (
          <article className="admin-source-card" key={source.sourceKey}>
            <div>
              <div className="admin-row-title">
                <strong>{source.label}</strong>
                <span className={`admin-pill ${source.enabled ? '' : 'admin-pill--muted'}`}>
                  {source.enabled ? 'enabled' : 'disabled'}
                </span>
              </div>
              <p>{source.sourceType} · {source.routeScope ?? 'all routes'}</p>
              <p>{source.documentCount ?? 0} documents · last ingested {formatDate(source.lastIngestedAt)}</p>
              {source.lastError ? <p className="admin-row-error">{source.lastError}</p> : null}
            </div>
            <button type="button" className="admin-link-button" onClick={() => toggleSource(source)}>
              {source.enabled ? 'Disable' : 'Enable'}
            </button>
          </article>
        )) : (
          <div className="panel-empty-state">No sources are registered yet.</div>
        )}
      </div>
    </section>
  );

  const renderIngestionPanel = () => (
    <section className="panel-card">
      <div className="panel-heading-row">
        <div>
          <h2 className="panel-title">Ingestion</h2>
          <p className="panel-description">Monitor knowledge refreshes and queue a manual reseed.</p>
        </div>
        <div className="admin-actions">
          <button type="button" className="admin-link-button" onClick={loadIngestion}>
            Refresh
          </button>
          <button type="button" className="admin-link-button" onClick={requestReseed}>
            Request reseed
          </button>
        </div>
      </div>
      <div className="panel-empty-state">
        Embedding refreshes run from the CLI with <code>pnpm chat:seed</code> after a request is recorded.
      </div>
      {isPanelLoading && activeTab === 'ingestion' ? <div className="panel-empty-state">Loading ingestion runs…</div> : null}
      <div className="admin-table-list">
        {ingestionRuns.length > 0 ? ingestionRuns.map((run) => (
          <article className="admin-log-row" key={run.id}>
            <div>
              <div className="admin-row-title">
                <span className="admin-pill">{run.status}</span>
                <span className="admin-pill admin-pill--muted">{run.triggerType}</span>
                <strong>{run.id.slice(0, 8)}</strong>
              </div>
              <p>
                {run.documentCount ?? 0} documents · {run.embeddedCount ?? 0} embedded · {run.unchangedCount ?? 0} unchanged
              </p>
              {run.errorSummary ? <p className="admin-row-error">{run.errorSummary}</p> : null}
            </div>
            <div className="admin-row-meta">
              <span>Started {formatDate(run.startedAt)}</span>
              <span>Completed {formatDate(run.completedAt)}</span>
            </div>
          </article>
        )) : (
          <div className="panel-empty-state">No ingestion runs yet.</div>
        )}
      </div>
    </section>
  );

  const renderPanel = () => {
    switch (activeTab) {
      case 'behavior':
        return renderBehaviorPanel();
      case 'model':
        return renderModelPanel();
      case 'retrieval':
        return renderRetrievalPanel();
      case 'prompt':
        return renderPromptPanel();
      case 'operations':
        return renderOperationsPanel();
      case 'safety':
        return renderSafetyPanel();
      case 'focus':
        return renderFocusPanel();
      case 'analytics':
        return renderAnalyticsPanel();
      case 'logs':
        return renderLogsPanel();
      case 'testing':
        return renderTestingPanel();
      case 'compare':
        return renderComparePanel();
      case 'versions':
        return renderVersionsPanel();
      case 'sources':
        return renderSourcesPanel();
      case 'ingestion':
        return renderIngestionPanel();
      default:
        return null;
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="admin-shell admin-center">
        <Loader2 className="admin-spinner" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginGate
        onLogin={login}
        isLoggingIn={isLoggingIn}
        error={loginError}
        isConfigured={isAuthConfigured}
      />
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <Link href="/" className="admin-back-link">← Back to site</Link>
          <div className="admin-brand admin-brand--header">
            <TeamboticsSVGLogo />
            <div>
              <p className="admin-brand__label">Teambotics</p>
              <p className="admin-brand__context">Admin</p>
            </div>
          </div>
          <h1>Chatbot Admin</h1>
          <p className="admin-subtitle">Configure Teambotics chat behavior, retrieval, safety, and publishing.</p>
        </div>
        <div className="admin-actions">
          <button type="button" className="admin-logout" onClick={logout}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <div className="admin-publish-bar">
        <div>
          <p className="publish-label">Draft status</p>
          <p className="publish-detail">{isDraftDirty ? 'Unsaved changes' : draftConfig ? 'Draft loaded' : 'No draft available'}</p>
        </div>
        <div className="publish-actions">
          <Button className="publish-button" onClick={saveDraft} variant="ghost">
            {isSaving ? 'Saving…' : 'Save draft'}
          </Button>
          <Button className="publish-button" onClick={publish} variant="primary">
            {isPublishing ? 'Publishing…' : 'Publish live'}
          </Button>
        </div>
      </div>

      {(saveError || publishError || panelError) ? (
        <div className="admin-notice admin-notice--error">
          <AlertCircle size={16} />
          <span>{saveError ?? publishError ?? panelError}</span>
        </div>
      ) : null}

      {actionMessage ? (
        <div className="admin-notice admin-notice--success">
          <span>{actionMessage}</span>
        </div>
      ) : null}

      <div className="admin-layout">
        <aside className="admin-nav">
          <div className="admin-card admin-card--accent">
            <p className="admin-card-title">Tabs</p>
            <div className="admin-tab-list">
              {ADMIN_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => selectTab(tab.id)}
                  className={`admin-tab ${activeTab === tab.id ? 'admin-tab--active' : ''}`}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="admin-card admin-card--info">
            <p className="admin-card-title">Live version</p>
            <p>{liveConfig?.label ?? 'Not available'}</p>
            <p className="admin-card-note">Published at: {liveConfig?.publishedAt ?? '—'}</p>
          </div>
        </aside>

        <main className="admin-main">
          {renderPanel()}
        </main>
      </div>
    </div>
  );
}
