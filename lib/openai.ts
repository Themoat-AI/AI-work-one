import { SearchResult } from './tavily';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateAIResponse(
  userMessage: string,
  searchResults: SearchResult[] = []
): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  const context = searchResults.length > 0
    ? `\n\nHere are recent search results that may be relevant:\n${searchResults
        .map(
          (r, i) =>
            `${i + 1}. [${r.title}](${r.url})\n${r.content}`
        )
        .join('\n\n')}`
    : '';

  const systemPrompt = `You are a helpful, intelligent AI assistant. You provide accurate, clear, and concise responses to user queries.

When search results are provided:
- Use them to provide current and accurate information
- Cite your sources when relevant
- Synthesize information from multiple sources when appropriate
- Clearly distinguish between factual information and opinions

Always:
- Be honest about what you don't know
- Provide context when helpful
- Use clear, readable formatting
- Keep responses concise but informative`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userMessage + context,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}
