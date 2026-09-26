import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tavily AI',
  description: 'A polished AI research assistant powered by Tavily',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-primary text-white">{children}</body>
    </html>
  );
}
