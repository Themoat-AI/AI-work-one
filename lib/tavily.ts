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

export async function searchWeb(query: string): Promise<SearchResponse> {
  if (!TAVILY_API_KEY) {
    throw new Error('TAVILY_API_KEY is not set');
  }

  try {
    const response = await fetch(TAVILY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: query,
        max_results: 5,
        include_answer: true,
        include_raw_content: true,
        topic: 'general',
      }),
    });

    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.statusText}`);
    }

    const data = await response.json();

    const results: SearchResult[] = (data.results || []).map((result: any) => ({
      title: result.title,
      url: result.url,
      content: result.content,
      source: new URL(result.url).hostname,
    }));

    return {
      results,
      answer: data.answer,
      query: data.query,
    };
  } catch (error) {
    console.error('Tavily search error:', error);
    throw error;
  }
}
