# AI Work One

A clean, responsive AI-style research assistant powered entirely by **Tavily**. It uses Tavily's answer generation and live web search, so you only need one API key—no OpenAI key or separate model provider is required.

## Features

- Real-time answers from Tavily
- Source links for every response
- Elegant responsive dark interface
- Markdown answer rendering
- Secure server-side API key handling
- Helpful error messages when configuration is missing

## Setup

```bash
npm install
cp .env.example .env.local
```

Add your Tavily key to `.env.local`:

```env
TAVILY_API_KEY=your_tavily_key_here
```

Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Important

- Do not put the key in client-side code.
- Do not commit `.env.local`.
- Restart `npm run dev` after changing environment variables.
- The existing `.env` file may contain your key locally, but `.env.local` is the recommended Next.js convention.

## How it works

1. The browser sends a question to `/api/chat`.
2. The server sends the question to Tavily with `include_answer: true`.
3. Tavily returns an answer and current search results.
4. The UI displays the answer and links to the supporting sources.
