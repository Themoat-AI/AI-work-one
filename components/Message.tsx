'use client';

import { motion } from 'framer-motion';
import { Loader, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ReactNode } from 'react';

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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className={`max-w-2xl ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl rounded-tr-sm text-white'
            : 'bg-secondary rounded-2xl rounded-tl-sm text-slate-100 border border-slate-700'
        } px-4 py-3 ${message.isLoading ? 'shimmer' : ''}`}
      >
        <div className="flex items-center gap-2">
          {message.isLoading && (
            <Loader className="w-4 h-4 animate-spin flex-shrink-0" />
          )}
          <div className="prose prose-invert prose-sm max-w-none">
            {isUser ? (
              <p className="m-0">{message.text}</p>
            ) : (
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="m-0 mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => (
                    <ul className="m-0 mb-2 pl-4 space-y-1">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="m-0 mb-2 pl-4 space-y-1">{children}</ol>
                  ),
                  li: ({ children }) => <li className="m-0">{children}</li>,
                  code: ({ inline, children }) =>
                    inline ? (
                      <code className="bg-slate-800 px-2 py-1 rounded text-sm">
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-slate-800 p-3 rounded-lg text-sm my-2 overflow-x-auto">
                        {children}
                      </code>
                    ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-blue-400 hover:text-blue-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {message.text}
              </ReactMarkdown>
            )}
          </div>
        </div>

        {/* Sources */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-slate-600/50"
          >
            <p className="text-xs font-semibold text-slate-300 mb-2">Sources:</p>
            <div className="space-y-2">
              {message.sources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition group"
                >
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate group-hover:underline">{source.title}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
