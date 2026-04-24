'use client';

import { useEffect, useMemo, useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';

const STORAGE_KEY = 'teambotics-chat-session';
const MAX_MESSAGES = 30;

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSessionId(stored);
    } else {
      const newId = crypto.randomUUID();
      window.localStorage.setItem(STORAGE_KEY, newId);
      setSessionId(newId);
    }
  }, []);

  const pageContext = useMemo(() => ({
    pagePath: window.location.pathname,
    pageTitle: document.title,
  }), []);

  const openChat = () => setOpen(true);

  const closeChat = () => setOpen(false);

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
          pageContext,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message || 'Unable to send message');
      }

      const payload = await response.json();
      const assistantReply = payload.response || 'I could not generate a response right now.';
      const assistantEntry: ChatMessage = { role: 'assistant', content: assistantReply };
      setHistory((current) => [...current, assistantEntry].slice(-MAX_MESSAGES));
      if (payload.sessionId) {
        window.localStorage.setItem(STORAGE_KEY, payload.sessionId);
        setSessionId(payload.sessionId);
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
    <div className="chatbot-widget">
      <button
        type="button"
        className="chatbot-toggle"
        onClick={openChat}
        aria-label="Open chat"
      >
        <MessageSquare size={18} />
        <span>Chat</span>
      </button>

      {open ? (
        <div className="chatbot-panel" role="dialog" aria-modal="true">
          <div className="chatbot-panel__header">
            <div>
              <p className="chatbot-panel__title">Teambotics Assistant</p>
              <p className="chatbot-panel__subtitle">Ask about the site, products, and experience.</p>
            </div>
            <button type="button" className="chatbot-close" onClick={closeChat} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-panel__history">
            {history.length === 0 ? (
              <div className="chatbot-panel__empty">Say hello and mention the page you’re on.</div>
            ) : history.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`chatbot-bubble chatbot-bubble--${item.role}`}>
                <span>{item.content}</span>
              </div>
            ))}
          </div>

          {error ? <div className="chatbot-error">{error}</div> : null}

          <div className="chatbot-panel__footer">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
              className="chatbot-input"
              rows={2}
            />
            <button
              type="button"
              className="chatbot-send"
              onClick={() => void sendMessage()}
              disabled={sending || !message.trim()}
            >
              {sending ? 'Sending…' : <Send size={16} />}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
