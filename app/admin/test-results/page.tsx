'use client';

import { useAppStore } from '@/lib/store';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import type { IdentityType, NervousSystemState, CombinationKey, ScoringResult } from '@/lib/types';
import { IDENTITY_DISPLAY_NAMES, NS_DISPLAY_NAMES, NS_SHORT_NAMES } from '@/lib/types';

const identityTypes: { value: IdentityType; label: string }[] = [
  { value: 'ACHIEVER', label: 'The Over-Responsible Achiever' },
  { value: 'ANCHOR', label: 'The Emotional Anchor' },
  { value: 'OPERATOR', label: 'The Self-Sufficient Operator' },
  { value: 'STRATEGIST', label: 'The Controlled Strategist' },
  { value: 'BURNER', label: 'The Hidden Burner' },
];

const nsStates: { value: NervousSystemState; label: string }[] = [
  { value: 'SYMP', label: 'Sympathetic (Fight/Flight)' },
  { value: 'DORSAL', label: 'Dorsal (Freeze/Shutdown)' },
  { value: 'VENTRAL', label: 'Ventral (Safe/Connected)' },
];

const selectClass =
  'w-full bg-white/60 dark:bg-dark-surface/60 border border-sage/20 dark:border-dark-border rounded-lg px-4 py-3 font-body text-charcoal dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-muted-gold/50 focus:border-muted-gold transition-colors appearance-none';

export default function AdminTestResultsPage() {
  const router = useRouter();
  const { setScoringResult, setUserInfo, resetAll } = useAppStore();

  const [primaryIdentity, setPrimaryIdentity] = useState<IdentityType>('ACHIEVER');
  const [dominantNS, setDominantNS] = useState<NervousSystemState>('SYMP');

  const handlePreview = () => {
    // Build mock identity results
    const identityResults = identityTypes.map((it) => ({
      type: it.value,
      name: IDENTITY_DISPLAY_NAMES[it.value],
      score: it.value === primaryIdentity ? 12 : Math.floor(Math.random() * 6),
      pct: it.value === primaryIdentity ? 80 : Math.floor(Math.random() * 40),
    }));
    // Sort so primary is first
    identityResults.sort((a, b) => b.score - a.score);

    // Build mock NS results
    const nsResults = nsStates.map((ns) => ({
      state: ns.value,
      name: NS_DISPLAY_NAMES[ns.value],
      short: NS_SHORT_NAMES[ns.value],
      score: ns.value === dominantNS ? 12 : Math.floor(Math.random() * 8),
      pct: ns.value === dominantNS ? 80 : Math.floor(Math.random() * 50),
    }));
    nsResults.sort((a, b) => b.score - a.score);

    // Determine combination key (non-ventral NS)
    const nsForCombo: NervousSystemState =
      dominantNS === 'VENTRAL' ? 'SYMP' : dominantNS;
    const combinationKey = `${primaryIdentity}_${nsForCombo}` as CombinationKey;

    const mockResult: ScoringResult = {
      identityResults,
      nsResults,
      primary: identityResults[0],
      secondary: identityResults[1].score >= 6 ? identityResults[1] : null,
      primaryNS: nsResults[0],
      combinationKey,
      dominantNSState: nsForCombo,
    };

    setScoringResult(mockResult);
    setUserInfo({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      birthday: '1990-05-15',
    });

    router.push('/results');
  };

  const handleReset = () => {
    resetAll();
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg px-4 py-12">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-heading text-3xl text-deep-brown dark:text-dark-text">Admin: Test Results Preview</h1>
          <a href="/admin/dashboard" className="font-body text-sm text-muted-gold hover:underline">
            Dashboard &rarr;
          </a>
        </div>
        <p className="font-body text-soft-brown dark:text-dark-muted text-sm mb-8">
          Configure a mock profile and preview the results page.
        </p>

        <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
          {/* Primary Identity */}
          <div>
            <label className="block font-body text-sm text-charcoal dark:text-dark-text mb-1.5">Primary Identity</label>
            <select
              value={primaryIdentity}
              onChange={(e) => setPrimaryIdentity(e.target.value as IdentityType)}
              className={selectClass}
            >
              {identityTypes.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dominant NS State */}
          <div>
            <label className="block font-body text-sm text-charcoal dark:text-dark-text mb-1.5">Dominant NS State</label>
            <select
              value={dominantNS}
              onChange={(e) => setDominantNS(e.target.value as NervousSystemState)}
              className={selectClass}
            >
              {nsStates.map((ns) => (
                <option key={ns.value} value={ns.value}>
                  {ns.label}
                </option>
              ))}
            </select>
          </div>

          {/* Combination Preview */}
          <div className="bg-sage/5 dark:bg-dark-surface/50 rounded-lg p-4 border border-sage/10 dark:border-dark-border">
            <p className="font-body text-sm text-charcoal dark:text-dark-text">
              <strong>Combination Key:</strong>{' '}
              {`${primaryIdentity}_${dominantNS === 'VENTRAL' ? 'SYMP' : dominantNS}`}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button onClick={handlePreview} className="flex-1">
              Preview Results
            </Button>
            <Button onClick={handleReset} variant="secondary" className="flex-1">
              Reset All Data
            </Button>
          </div>
        </div>

        {/* Note */}
        <p className="mt-6 text-center font-body text-xs text-soft-brown/50 dark:text-dark-muted/50">
          This page is for content preview only. Not visible to users.
        </p>
      </div>
    </div>
  );
}
