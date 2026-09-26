import { NextRequest, NextResponse } from 'next/server';
import { searchWeb } from '@/lib/tavily';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!message) {
      return NextResponse.json({ error: 'Please enter a message.' }, { status: 400 });
    }

    if (message.length > 2_000) {
      return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
    }

    const result = await searchWeb(message);
    const answer = result.answer?.trim() || buildAnswer(result.results);

    return NextResponse.json({
      message: answer || 'I could not find a useful answer. Try rephrasing your question.',
      sources: result.results.slice(0, 5).map(({ title, url }) => ({ title, url })),
    });
  } catch (error) {
    console.error('Chat error:', error);
    const message = error instanceof Error ? error.message : 'Something went wrong.';
    const status = message.includes('TAVILY_API_KEY') ? 500 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}

function buildAnswer(results: Array<{ title: string; url: string; content: string }>) {
  return results
    .slice(0, 5)
    .map((result, index) => `${index + 1}. **${result.title}**\n${result.content}`)
    .join('\n\n');
}
