const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const TAVILY_API_URL = 'https://api.tavily.com/search';

export interface SearchResult {
  title: string;
  url: string;
  content: string;
  source: string;
}

export interface SearchResponse {
  results: SearchResult[];
  answer?: string;
  query: string;
}

interface TavilyApiResult {
  title?: string | null;
  url?: string | null;
  content?: string | null;
}

interface TavilyApiResponse {
  results?: TavilyApiResult[];
  answer?: string | null;
  query?: string | null;
}

export async function searchWeb(query: string): Promise<SearchResponse> {
  if (!TAVILY_API_KEY) {
    throw new Error('TAVILY_API_KEY is not set. Add it to .env.local and restart the server.');
  }

  const response = await fetch(TAVILY_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: TAVILY_API_KEY,
      query,
      search_depth: 'advanced',
      max_results: 5,
      include_answer: true,
      include_raw_content: false,
      topic: 'general',
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Tavily API error (${response.status}): ${details || response.statusText}`);
  }

  const data: TavilyApiResponse = await response.json();
  const results: SearchResult[] = (data.results || []).map((result) => ({
    title: String(result.title || 'Untitled result'),
    url: String(result.url || '#'),
    content: String(result.content || ''),
    source: safeHostname(result.url),
  }));

  return { results, answer: data.answer ?? undefined, query: data.query || query };
}

function safeHostname(url: unknown) {
  try {
    return new URL(String(url)).hostname;
  } catch {
    return 'web';
  }
}
