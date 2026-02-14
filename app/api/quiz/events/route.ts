import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, eventType, eventData } = body;

    if (!sessionId || !eventType) {
      return NextResponse.json(
        { error: 'Missing sessionId or eventType' },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('quiz_events').insert({
      session_id: sessionId,
      event_type: eventType,
      event_data: eventData ?? null,
    });

    if (error) {
      console.error('Event insert error:', error);
      return NextResponse.json(
        { error: 'Failed to log event' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Quiz event error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
