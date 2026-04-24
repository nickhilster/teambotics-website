'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Loader2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import LoginGate from '@/components/admin/common/LoginGate';
import type { ChatbotAdminConfigResponse, ChatbotConfigVersion, ChatbotDashboardSettings } from '@/types/chatbotAdmin';

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
    similarityThreshold: 0.72,
    useConversationHistory: true,
    allowedSourceTypes: ['handbook', 'product', 'faq'],
    allowedRoutes: [],
  },
  prompt: {
    systemPromptTemplate: 'You are Teambotics Assistant. Help visitors with information about Teambotics, our products, and design systems.',
    brandFraming: 'Answer with operational confidence, compliance awareness, and engineering clarity.',
    disallowedClaims: ['I am a lawyer', 'I am a doctor', 'I have access to private data'],
  },
  operations: {
    chatEnabled: true,
    rateLimitRequests: 20,
    rateLimitWindowMs: 60000,
  },
  safety: {
    strictGrounding: false,
    minContextSimilarity: 0.72,
  },
  focus: {
    priorityTopics: ['about', 'projects', 'technology'],
    priorityRoles: ['product leader', 'operations leader'],
  },
};

function createInputLabel(label: string, description?: string) {
  return (
    <div className="settings-field">
      <label className="settings-label">{label}</label>
      {description ? <p className="settings-description">{description}</p> : null}
    </div>
  );
}

export default function ChatbotAdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('behavior');
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') as AdminTab | null;
    if (tab && ADMIN_TABS.some((entry) => entry.id === tab)) {
      setActiveTab(tab);
    }
  }, []);

  useEffect(() => {
    void checkSession();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      void loadConfig();
    }
  }, [isAuthenticated]);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/admin/session');
      const payload = await response.json();
      setIsAuthenticated(Boolean(payload.authenticated));
      setIsAuthConfigured(Boolean(payload.configured));
    } catch {
      setIsAuthenticated(false);
    }
  };

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

  const loadConfig = async () => {
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
  };

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

  const renderPlaceholderPanel = (title: string, description: string) => (
    <section className="panel-card">
      <h2 className="panel-title">{title}</h2>
      <p className="panel-description">{description}</p>
      <div className="panel-placeholder">This section will be connected to Neon-backed analytics, logs, testing, and version history.</div>
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
        return renderPlaceholderPanel('Analytics', 'View chat usage, latency, and fallback metrics.');
      case 'logs':
        return renderPlaceholderPanel('Logs', 'Search conversation logs and filter by error status.');
      case 'testing':
        return renderPlaceholderPanel('Testing', 'Run prompt tests against draft and live settings.');
      case 'compare':
        return renderPlaceholderPanel('Compare', 'Compare draft and live responses side by side.');
      case 'versions':
        return renderPlaceholderPanel('Versions', 'Review versions and rollback to past live configs.');
      case 'sources':
        return renderPlaceholderPanel('Sources', 'Toggle source categories and control retrieval feeds.');
      case 'ingestion':
        return renderPlaceholderPanel('Ingestion', 'Reseed knowledge and monitor ingestion progress.');
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

      <div className="admin-layout">
        <aside className="admin-nav">
          <div className="admin-card admin-card--accent">
            <p className="admin-card-title">Tabs</p>
            <div className="admin-tab-list">
              {ADMIN_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
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
