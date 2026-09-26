'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Loader, Search, Sparkles } from 'lucide-react';
import Message from '@/components/Message';
import { motion } from 'framer-motion';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  sources?: Array<{ title: string; url: string }>;
  isLoading?: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestions = [
    'What should I know about this week?',
    'Find a quiet place to visit nearby',
    'Explain a topic I have been curious about',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: 'Thinking...',
      sender: 'ai',
      timestamp: new Date(),
      isLoading: true,
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                text: data.message,
                sources: data.sources,
                isLoading: false,
              }
            : msg
        )
      );
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                text: 'Sorry, I encountered an error. Please try again.',
                isLoading: false,
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="topbar"
      >
        <a className="wordmark" href="#top" aria-label="Doone research assistant">
          <span className="brand-mark"><Sparkles aria-hidden="true" /></span>
          <span className="brand-copy">
            <strong>DOONE</strong>
            <small>RESEARCH, AT YOUR PACE</small>
          </span>
        </a>
        <div className="top-status"><span className="status-light" /> LIVE WEB SEARCH</div>
      </motion.div>

      <main className={`conversation-area ${messages.length === 0 ? 'is-empty' : ''}`} id="top">
        {messages.length === 0 ? (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="welcome"
          >
            <div className="welcome-symbol"><Search aria-hidden="true" /></div>
            <p className="eyebrow">A LITTLE SPACE TO THINK</p>
            <h1>Curiosity,<br />meet clarity.</h1>
            <p className="welcome-copy">
              Ask a question, follow a hunch, or start somewhere unexpected.
              I&apos;ll look across the web and bring back what matters.
            </p>
            <div className="suggestions" aria-label="Suggested questions">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setInput(suggestion);
                    inputRef.current?.focus();
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.section>
        ) : (
          <div className="message-list">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <Message message={message} />
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="composer-dock"
      >
        <div className="composer-wrap">
          <form onSubmit={handleSendMessage} className="composer">
            <Search className="composer-search" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Ask what’s on your mind"
              aria-label="Ask a question"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={loading ? 'Searching' : 'Send question'}
              title={loading ? 'Searching' : 'Send question'}
            >
              {loading ? <Loader className="animate-spin" /> : <ArrowUp />}
            </button>
          </form>
          <p className="composer-note">
            <span>GROUNDED IN LIVE SOURCES</span>
            <span>TAKE WHAT&apos;S USEFUL</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
