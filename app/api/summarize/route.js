import { summarizeText } from '../../../servers/transformer.js';

export async function POST(request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text) {
      return Response.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const summary = await summarizeText(text);
    
    return Response.json({
      success: true,
      summary: summary
    });

  } catch (error) {
    console.error('Summarize API Error:', error);
    return Response.json(
      { 
        error: 'Failed to summarize text',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
