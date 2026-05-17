'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AlertCircle, Loader2, LogOut } from 'lucide-react';
import { TeamboticsSVGLogo } from '@/components/layout/TeamboticsSVGLogo';
import { Button } from '@/components/ui/Button';
import LoginGate from '@/components/admin/common/LoginGate';
import type { ThemeAdminConfigResponse, ThemeDashboardSettings } from '@/types/chatbotAdmin';

const DEFAULT_THEME_SETTINGS: ThemeDashboardSettings = {
  defaultTheme: 'light',
  cursorScubaDiverEnabled: false,
  bubbleOverlayEnabled: false,
  heroMotionIntensity: 0.6,
  bubbleIntensity: 0.8,
  cursorReactionStrength: 0.9,
  animationEnabled: true,
};

type ThemeTab = 'settings' | 'preview';

export default function ThemeAdminPage() {
  const [activeTab, setActiveTab] = useState<ThemeTab>('settings');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAuthConfigured, setIsAuthConfigured] = useState<boolean | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [draftSettings, setDraftSettings] = useState<ThemeDashboardSettings | null>(null);
  const [isDraftDirty, setIsDraftDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);

  useEffect(() => {
    void checkSession();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      void loadConfig();
    }
  }, [isAuthenticated]);

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
    setDraftSettings(null);
    setIsDraftDirty(false);
  };

  async function loadConfig() {
    try {
      const response = await fetch('/api/admin/theme/config');
      const payload: ThemeAdminConfigResponse = await response.json();
      setDraftSettings(payload.draft ?? payload.live ?? DEFAULT_THEME_SETTINGS);
      setIsDraftDirty(Boolean(payload.draft));
    } catch {
      setSaveError('Unable to load theme config.');
    }
  }

  const saveDraft = async () => {
    if (!draftSettings) return;
    setIsSaving(true);
    setSaveError(null);
    try {
      const response = await fetch('/api/admin/theme/config', {
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
      const response = await fetch('/api/admin/theme/publish', { method: 'POST' });
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

  const updateDraft = (updater: (current: ThemeDashboardSettings) => ThemeDashboardSettings) => {
    if (!draftSettings) return;
    setDraftSettings(updater(draftSettings));
    setIsDraftDirty(true);
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
        title="Theme Dashboard"
        description="Enter the admin password to access theme controls."
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
          <h1>Theme Dashboard</h1>
          <p className="admin-subtitle">Control cursor behavior, bubbles, motion intensity, and theme preview.</p>
        </div>
        <div className="admin-actions">
          <Link href="/admin/chatbot" className="admin-link-button">Open chatbot admin</Link>
          <button type="button" className="admin-logout" onClick={logout}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <div className="admin-publish-bar">
        <div>
          <p className="publish-label">Theme draft</p>
          <p className="publish-detail">{isDraftDirty ? 'Unsaved changes' : 'Draft synced'}</p>
        </div>
        <div className="publish-actions">
          <Button className="publish-button" onClick={saveDraft} variant="ghost">
            {isSaving ? 'Saving…' : 'Save draft'}
          </Button>
          <Button className="publish-button" onClick={publish} variant="primary">
            {isPublishing ? 'Publishing…' : 'Publish theme'}
          </Button>
        </div>
      </div>

      {(saveError || publishError) ? (
        <div className="admin-notice admin-notice--error">
          <AlertCircle size={16} />
          <span>{saveError ?? publishError}</span>
        </div>
      ) : null}

      <div className="admin-layout">
        <aside className="theme-nav">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`admin-tab ${activeTab === 'settings' ? 'admin-tab--active' : ''}`}
          >
            Settings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`admin-tab ${activeTab === 'preview' ? 'admin-tab--active' : ''}`}
          >
            Preview
          </button>
        </aside>

        <main className="admin-main">
          {activeTab === 'settings' ? (
            <section className="panel-card">
              <h2 className="panel-title">Theme settings</h2>
              <div className="form-grid">
                <label className="field-row">
                  <span>Default theme</span>
                  <select
                    value={draftSettings?.defaultTheme ?? 'light'}
                    onChange={(event) => updateDraft((current) => ({
                      ...current,
                      defaultTheme: event.target.value as ThemeDashboardSettings['defaultTheme'],
                    }))}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </label>
                <label className="field-row checkbox-row">
                  <span>Cursor scuba diver</span>
                  <input
                    type="checkbox"
                    checked={draftSettings?.cursorScubaDiverEnabled ?? false}
                    onChange={(event) => updateDraft((current) => ({
                      ...current,
                      cursorScubaDiverEnabled: event.target.checked,
                    }))}
                  />
                </label>
                <label className="field-row checkbox-row">
                  <span>Bubble overlay</span>
                  <input
                    type="checkbox"
                    checked={draftSettings?.bubbleOverlayEnabled ?? false}
                    onChange={(event) => updateDraft((current) => ({
                      ...current,
                      bubbleOverlayEnabled: event.target.checked,
                    }))}
                  />
                </label>
                <label className="field-row">
                  <span>Hero motion intensity</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={draftSettings?.heroMotionIntensity ?? 0.6}
                    onChange={(event) => updateDraft((current) => ({
                      ...current,
                      heroMotionIntensity: Number(event.target.value),
                    }))}
                  />
                </label>
                <label className="field-row">
                  <span>Bubble intensity</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={draftSettings?.bubbleIntensity ?? 0.8}
                    onChange={(event) => updateDraft((current) => ({
                      ...current,
                      bubbleIntensity: Number(event.target.value),
                    }))}
                  />
                </label>
                <label className="field-row">
                  <span>Cursor reaction strength</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={draftSettings?.cursorReactionStrength ?? 0.9}
                    onChange={(event) => updateDraft((current) => ({
                      ...current,
                      cursorReactionStrength: Number(event.target.value),
                    }))}
                  />
                </label>
                <label className="field-row checkbox-row">
                  <span>Motion enabled</span>
                  <input
                    type="checkbox"
                    checked={draftSettings?.animationEnabled ?? true}
                    onChange={(event) => updateDraft((current) => ({
                      ...current,
                      animationEnabled: event.target.checked,
                    }))}
                  />
                </label>
              </div>
            </section>
          ) : (
            <section className="panel-card">
              <h2 className="panel-title">Live preview</h2>
              <p className="panel-description">Preview how the published theme settings will affect cursor motion, bubbles, and hero interaction.</p>
              <div className="theme-preview-card">
                <div className="theme-preview-pill">Theme: {draftSettings?.defaultTheme}</div>
                <div className="theme-preview-row">
                  <span>Scuba diver</span>
                  <strong>{draftSettings?.cursorScubaDiverEnabled ? 'Enabled' : 'Disabled'}</strong>
                </div>
                <div className="theme-preview-row">
                  <span>Bubbles</span>
                  <strong>{draftSettings?.bubbleOverlayEnabled ? 'Enabled' : 'Disabled'}</strong>
                </div>
                <div className="theme-preview-row">
                  <span>Hero motion</span>
                  <strong>{(draftSettings?.heroMotionIntensity ?? 0).toFixed(2)}</strong>
                </div>
                <div className="theme-preview-row">
                  <span>Bubble intensity</span>
                  <strong>{(draftSettings?.bubbleIntensity ?? 0).toFixed(2)}</strong>
                </div>
                <div className="theme-preview-row">
                  <span>Cursor strength</span>
                  <strong>{(draftSettings?.cursorReactionStrength ?? 0).toFixed(2)}</strong>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
