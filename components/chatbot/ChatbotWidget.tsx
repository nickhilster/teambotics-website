'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import styles from './ChatbotWidget.module.css';

const STORAGE_KEY = 'teambotics-chat-session';
const MAX_MESSAGES = 30;

const STARTER_SUGGESTIONS = [
  'What kinds of workflows can Teambotics improve?',
  'Which product might fit my team?',
  'What does working with Teambotics look like?',
];

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    "Hey \u2014 I'm the Teambotics assistant. What would you like to make easier?",
  suggestions: STARTER_SUGGESTIONS,
  local: true,
};

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{
    id: string;
    title: string;
    route?: string;
    similarity?: number;
  }>;
  suggestions?: string[];
  mode?: 'live' | 'fallback' | 'grounded-refusal';
  /** Display-only entry (the seeded welcome); never sent to the backend. */
  local?: boolean;
};

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return stored;
    }

    const newId = crypto.randomUUID();
    window.localStorage.setItem(STORAGE_KEY, newId);
    return newId;
  });
  const [history, setHistory] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const pageContext = useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        pagePath: '',
        pageTitle: '',
      };
    }

    return {
      pagePath: window.location.pathname,
      pageTitle: document.title,
    };
  }, []);

  const openChat = () => setOpen(true);

  const closeChat = () => {
    setOpen(false);
    // Return focus to the toggle button when the dialog closes
    toggleRef.current?.focus();
  };

  // Focus the close button when the dialog opens
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        closeChat();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const sendMessage = async () => {
    if (!message.trim() || sending || !sessionId) {
      return;
    }

    const userMessage = message.trim();
    const userEntry: ChatMessage = { role: 'user', content: userMessage };
    setHistory((current) => [...current, userEntry].slice(-MAX_MESSAGES));
    setMessage('');
    setSending(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
          conversationId: sessionId,
          history: history.filter((entry) => !entry.local),
          pageContext,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message || 'Unable to send message');
      }

      const payload = await response.json();
      const assistantReply = payload.message || payload.response || 'I could not generate a response right now.';
      const assistantEntry: ChatMessage = {
        role: 'assistant',
        content: assistantReply,
        sources: Array.isArray(payload.sources) ? payload.sources : [],
        suggestions: Array.isArray(payload.suggestions) ? payload.suggestions : [],
        mode: payload.mode,
      };
      setHistory((current) => [...current, assistantEntry].slice(-MAX_MESSAGES));
      const nextSessionId = payload.sessionId || payload.conversationId;
      if (nextSessionId) {
        window.localStorage.setItem(STORAGE_KEY, nextSessionId);
        setSessionId(nextSessionId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error sending message');
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <div className={styles.widget}>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        onClick={openChat}
        aria-label="Open chat assistant"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <MessageSquare size={18} aria-hidden="true" />
        <span>Chat</span>
      </button>

      {open ? (
        <div
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
        >
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelTitle} id="chatbot-title">Teambotics Assistant</p>
              <p className={styles.panelSubtitle}>Explore what Teambotics can help your team do.</p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.close}
              onClick={closeChat}
              aria-label="Close chat"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className={styles.history} aria-live="polite" aria-atomic="false">
            {history.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`${styles.bubble} ${item.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant}`}
              >
                <span>{item.content}</span>
                {item.role === 'assistant' && item.sources && item.sources.length > 0 ? (
                  <div className={styles.sources}>
                    <span className={styles.suggestionLabel}>Sources</span>
                    {item.sources.slice(0, 3).map((source) => (
                      source.route ? (
                        <a href={source.route} key={source.id}>{source.title}</a>
                      ) : (
                        <span key={source.id}>{source.title}</span>
                      )
                    ))}
                  </div>
                ) : null}
                {item.role === 'assistant' && item.mode && item.mode !== 'live' ? (
                  <span className={styles.runtimeNote}>
                    {item.mode === 'grounded-refusal' ? 'Grounded safety response' : 'Site-context fallback'}
                  </span>
                ) : null}
                {item.role === 'assistant' && item.suggestions && item.suggestions.length > 0 ? (
                  <div className={styles.suggestions}>
                    <span className={styles.suggestionLabel}>Try asking</span>
                    {item.suggestions.slice(0, 3).map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setMessage(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {error ? <div className={styles.error} role="alert">{error}</div> : null}

          <div className={styles.panelFooter}>
            <p className={styles.disclaimer}>
              For questions about Teambotics and its products. Please don’t share personal or confidential information. Not professional advice.
            </p>
            <textarea
              ref={inputRef}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something…"
              className={styles.input}
              rows={2}
              aria-label="Chat message"
            />
            <button
              type="button"
              className={styles.send}
              onClick={() => void sendMessage()}
              disabled={sending || !message.trim()}
              aria-label="Send message"
            >
              {sending ? 'Sending…' : <Send size={16} aria-hidden="true" />}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
