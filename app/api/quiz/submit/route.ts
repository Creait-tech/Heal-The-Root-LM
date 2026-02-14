import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstName,
      email,
      answers,
      scoringResult,
      sessionId,
      utmSource,
      utmMedium,
      utmCampaign,
      deviceType,
      completionTimeS,
    } = body;

    // Validate required fields
    if (!firstName || !email || !answers || !scoringResult) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Build identity_scores map: {ACHIEVER: 12, ANCHOR: 8, ...}
    const identityScores: Record<string, number> = {};
    for (const ir of scoringResult.identityResults) {
      identityScores[ir.type] = ir.score;
    }

    // Build ns_scores map: {SYMP: 11, DORSAL: 6, VENTRAL: 9}
    const nsScores: Record<string, number> = {};
    for (const nr of scoringResult.nsResults) {
      nsScores[nr.state] = nr.score;
    }

    // Get ventral percentage
    const ventralResult = scoringResult.nsResults.find(
      (nr: { state: string }) => nr.state === 'VENTRAL'
    );
    const ventralPct = ventralResult?.pct ?? 0;

    // Insert quiz result
    const { data, error } = await supabase
      .from('quiz_results')
      .insert({
        first_name: firstName,
        email,
        primary_identity: scoringResult.primary.type,
        secondary_identity: scoringResult.secondary?.type ?? null,
        dominant_ns_state: scoringResult.dominantNSState,
        combination_key: scoringResult.combinationKey,
        identity_scores: identityScores,
        ns_scores: nsScores,
        ventral_pct: ventralPct,
        answers,
        session_id: sessionId ?? null,
        utm_source: utmSource ?? null,
        utm_medium: utmMedium ?? null,
        utm_campaign: utmCampaign ?? null,
        device_type: deviceType ?? null,
        completion_time_s: completionTimeS ?? null,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save results' },
        { status: 500 }
      );
    }

    // Insert email segment tags
    const tags = [
      scoringResult.primary.type,
      scoringResult.dominantNSState,
      scoringResult.combinationKey,
    ];
    if (scoringResult.secondary) {
      tags.push(`SECONDARY_${scoringResult.secondary.type}`);
    }

    const segmentRows = tags.map((tag: string) => ({
      quiz_result_id: data.id,
      email,
      tag,
    }));

    await supabase.from('email_segments').insert(segmentRows);

    // Fire GHL webhook (non-blocking)
    const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;
    if (webhookUrl && webhookUrl !== 'YOUR_WEBHOOK_URL_HERE') {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          email,
          survival_identity: scoringResult.primary.type,
          ns_state: scoringResult.dominantNSState,
          combination_key: scoringResult.combinationKey,
          source: 'heal-the-cycle-assessment',
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.error('Webhook error:', err));
    }

    return NextResponse.json({ id: data.id, success: true });
  } catch (err) {
    console.error('Quiz submit error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
