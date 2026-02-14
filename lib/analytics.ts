'use client';

import { useAppStore } from './store';

export function getUTMParams() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
  };
}

export function getDeviceType(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  return /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
}

export function trackEvent(
  eventType: string,
  eventData?: Record<string, unknown>
) {
  try {
    const sessionId = useAppStore.getState().sessionId;
    if (!sessionId) return;

    const payload = JSON.stringify({
      sessionId,
      eventType,
      eventData: {
        ...eventData,
        deviceType: getDeviceType(),
        ...getUTMParams(),
        url: typeof window !== 'undefined' ? window.location.pathname : undefined,
      },
    });

    // Use sendBeacon for non-blocking fire-and-forget
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/quiz/events', blob);
    } else {
      fetch('/api/quiz/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Silent fail — analytics should never break UX
  }
}
