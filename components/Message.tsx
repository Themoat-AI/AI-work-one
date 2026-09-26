'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Loader, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface MessageProps {
  message: {
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    sources?: Array<{ title: string; url: string }>;
    isLoading?: boolean;
  };
}

export default function Message({ message }: MessageProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={`message-row ${isUser ? 'from-user' : 'from-assistant'}`}>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className={`message-content ${isUser ? 'user-bubble' : 'assistant-answer'}`}
      >
        {!isUser && (
          <div className="answer-byline">
            <span className="answer-mark"><Sparkles aria-hidden="true" /></span>
            <span>DOONE</span>
            <span className="answer-kind">{message.isLoading ? 'SEARCHING' : 'ANSWER'}</span>
          </div>
        )}
        <div className={isUser ? 'user-text' : 'message-markdown'}>
          {isUser ? (
            <p>{message.text}</p>
          ) : (
            <ReactMarkdown
              components={{
                p: ({ children }) => <p>{children}</p>,
                ul: ({ children }) => <ul>{children}</ul>,
                ol: ({ children }) => <ol>{children}</ol>,
                li: ({ children }) => <li>{children}</li>,
                code: ({ children, className }) => (
                  <code className={className ? 'code-block' : 'inline-code'}>
                    {children}
                  </code>
                ),
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          )}
        </div>

        {!isUser && message.sources && message.sources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="source-list"
          >
            <p className="source-heading">SOURCES</p>
            <div className="source-links">
              {message.sources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link"
                >
                  <span>{source.title}</span>
                  <ExternalLink aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
        {!isUser && message.isLoading && <Loader className="answer-loader" aria-label="Loading" />}
      </motion.div>
    </div>
  );
}
