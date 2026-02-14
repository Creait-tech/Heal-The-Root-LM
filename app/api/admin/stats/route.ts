import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

function checkAdminAuth(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_SECRET_KEY;
  if (!adminKey) return false;
  const provided = req.headers.get('x-admin-key');
  return provided === adminKey;
}

export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch all quiz results
    const { data: results, error: resultsError } = await supabase
      .from('quiz_results')
      .select('id, primary_identity, secondary_identity, dominant_ns_state, combination_key, ventral_pct, device_type, utm_source, utm_medium, utm_campaign, completion_time_s, created_at')
      .order('created_at', { ascending: false });

    if (resultsError) {
      return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
    }

    // Fetch funnel events
    const { data: events, error: eventsError } = await supabase
      .from('quiz_events')
      .select('event_type, event_data, created_at')
      .order('created_at', { ascending: false });

    if (eventsError) {
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }

    const allResults = results ?? [];
    const allEvents = events ?? [];

    // --- Identity Distribution ---
    const identityDist: Record<string, number> = {};
    for (const r of allResults) {
      identityDist[r.primary_identity] = (identityDist[r.primary_identity] || 0) + 1;
    }

    // --- NS Distribution ---
    const nsDist: Record<string, number> = {};
    for (const r of allResults) {
      nsDist[r.dominant_ns_state] = (nsDist[r.dominant_ns_state] || 0) + 1;
    }

    // --- Combination Distribution ---
    const comboDist: Record<string, number> = {};
    for (const r of allResults) {
      comboDist[r.combination_key] = (comboDist[r.combination_key] || 0) + 1;
    }

    // --- Daily Completions (last 30 days) ---
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const dailyMap: Record<string, number> = {};
    for (const r of allResults) {
      const day = new Date(r.created_at).toISOString().split('T')[0];
      if (new Date(r.created_at) >= thirtyDaysAgo) {
        dailyMap[day] = (dailyMap[day] || 0) + 1;
      }
    }
    const dailyCompletions = Object.entries(dailyMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // --- Device Split ---
    const deviceSplit: Record<string, number> = {};
    for (const r of allResults) {
      const dt = r.device_type || 'unknown';
      deviceSplit[dt] = (deviceSplit[dt] || 0) + 1;
    }

    // --- UTM Performance ---
    const utmMap: Record<string, number> = {};
    for (const r of allResults) {
      const source = r.utm_source || 'direct';
      utmMap[source] = (utmMap[source] || 0) + 1;
    }

    // --- Funnel Metrics ---
    const funnelCounts = {
      landingViews: allEvents.filter((e) => e.event_type === 'page_view_landing').length,
      quizStarts: allEvents.filter((e) => e.event_type === 'quiz_start').length,
      quizCompletes: allEvents.filter((e) => e.event_type === 'quiz_complete').length,
      emailSubmits: allEvents.filter((e) => e.event_type === 'email_submit').length,
      resultsViews: allEvents.filter((e) => e.event_type === 'results_view').length,
    };

    // --- Avg Completion Time ---
    const times = allResults
      .map((r) => r.completion_time_s)
      .filter((t): t is number => t !== null && t > 0);
    const avgCompletionTime = times.length > 0
      ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
      : 0;

    // --- Avg Ventral Pct ---
    const ventralPcts = allResults.map((r) => r.ventral_pct);
    const avgVentralPct = ventralPcts.length > 0
      ? Math.round(ventralPcts.reduce((a, b) => a + b, 0) / ventralPcts.length)
      : 0;

    return NextResponse.json({
      totalResults: allResults.length,
      identityDist,
      nsDist,
      comboDist,
      dailyCompletions,
      deviceSplit,
      utmSources: utmMap,
      funnel: funnelCounts,
      avgCompletionTime,
      avgVentralPct,
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
