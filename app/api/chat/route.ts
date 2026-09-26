import { NextRequest, NextResponse } from 'next/server';
import { searchWeb } from '@/lib/tavily';
import { generateAIResponse } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    // Check if message requires web search
    const requiresSearch = shouldSearch(message);
    let searchResults = [];
    let sources = [];

    if (requiresSearch) {
      try {
        const result = await searchWeb(message);
        searchResults = result.results || [];
        sources = result.results?.map((r: any) => ({
          title: r.title,
          url: r.url,
        })) || [];
      } catch (error) {
        console.error('Search error:', error);
        // Continue without search results
      }
    }

    // Generate AI response
    const aiResponse = await generateAIResponse(message, searchResults);

    return NextResponse.json({
      message: aiResponse,
      sources: sources.slice(0, 3), // Limit to top 3 sources
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function shouldSearch(message: string): boolean {
  const searchKeywords = [
    'search',
    'find',
    'look up',
    'what',
    'who',
    'when',
    'where',
    'latest',
    'recent',
    'current',
    'news',
    'today',
    'weather',
    'stock',
    'price',
  ];

  const lowerMessage = message.toLowerCase();
  return searchKeywords.some((keyword) => lowerMessage.includes(keyword));
}
