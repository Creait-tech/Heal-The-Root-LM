'use client';

import { useAppStore } from '@/lib/store';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import type { RegulationPattern, CoreWound, SurvivalIdentity, ScoringResult } from '@/lib/types';

const regulationPatterns: { value: RegulationPattern; label: string }[] = [
  { value: 'fight-flight', label: 'Fight / Flight' },
  { value: 'freeze', label: 'Freeze' },
  { value: 'fawn', label: 'People-Pleasing (Fawn)' },
];

const coreWounds: { value: CoreWound; label: string }[] = [
  { value: 'money-scarcity', label: 'Money Scarcity' },
  { value: 'abandonment', label: 'Abandonment' },
  { value: 'unworthiness', label: 'Unworthiness' },
  { value: 'control', label: 'Control' },
  { value: 'exhaustion-burnout', label: 'Exhaustion / Burnout' },
];

const survivalIdentities: { value: SurvivalIdentity; label: string }[] = [
  { value: 'the-provider', label: 'The Provider' },
  { value: 'the-hyper-independent', label: 'The Hyper-Independent' },
  { value: 'the-functional-freeze', label: 'The Functional Freeze' },
  { value: 'the-self-saboteur', label: 'The Self-Saboteur' },
  { value: 'the-mask', label: 'The Mask' },
  { value: 'the-rage-holder', label: 'The Rage Holder' },
  { value: 'the-good-one', label: 'The Good One' },
  { value: 'the-survivor-who-cant-receive', label: "The Survivor Who Can't Receive" },
];

const selectClass =
  'w-full bg-white/60 border border-sage/20 rounded-lg px-4 py-3 font-body text-charcoal focus:outline-none focus:ring-2 focus:ring-muted-gold/50 focus:border-muted-gold transition-colors appearance-none';

export default function AdminTestResultsPage() {
  const router = useRouter();
  const { setScoringResult, setUserInfo, resetAll } = useAppStore();

  const [primaryPattern, setPrimaryPattern] = useState<RegulationPattern>('fight-flight');
  const [isBlended, setIsBlended] = useState(false);
  const [secondaryPattern, setSecondaryPattern] = useState<RegulationPattern>('freeze');
  const [selectedWound, setSelectedWound] = useState<CoreWound>('abandonment');
  const [selectedIdentity, setSelectedIdentity] = useState<SurvivalIdentity>('the-provider');
  const [fawnTally, setFawnTally] = useState(0);

  const handlePreview = () => {
    // Build mock tally
    const tally = { 'fight-flight': 0, freeze: 0, fawn: fawnTally };
    tally[primaryPattern] = 10;
    if (isBlended && secondaryPattern) {
      tally[secondaryPattern] = 6;
    }
    // If primary is fawn, ensure fawn tally is at least 10
    if (primaryPattern === 'fawn') {
      tally.fawn = Math.max(tally.fawn, 10);
    }

    const mockResult: ScoringResult = {
      tally,
      primaryPattern,
      secondaryPattern: isBlended ? secondaryPattern : undefined,
      isBlended,
      coreWounds: [selectedWound],
      survivalIdentity: selectedIdentity,
      fawnTendency: tally.fawn >= 3,
      fawnTallyScore: tally.fawn,
    };

    setScoringResult(mockResult);
    setUserInfo({
      firstName: 'Test',
      email: 'test@example.com',
      phone: '555-0000',
    });

    router.push('/results');
  };

  const handleReset = () => {
    resetAll();
  };

  return (
    <div className="min-h-screen bg-cream px-4 py-12">
      <div className="max-w-lg mx-auto">
        <h1 className="font-heading text-3xl text-deep-brown mb-2">Admin: Test Results Preview</h1>
        <p className="font-body text-soft-brown text-sm mb-8">
          Configure a mock profile and preview the results page.
        </p>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
          {/* Primary Pattern */}
          <div>
            <label className="block font-body text-sm text-charcoal mb-1.5">Primary Pattern</label>
            <select
              value={primaryPattern}
              onChange={(e) => setPrimaryPattern(e.target.value as RegulationPattern)}
              className={selectClass}
            >
              {regulationPatterns.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Blended Toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isBlended}
                onChange={(e) => setIsBlended(e.target.checked)}
                className="w-4 h-4 accent-sage rounded"
              />
              <span className="font-body text-sm text-charcoal">Is Blended</span>
            </label>
          </div>

          {/* Secondary Pattern (if blended) */}
          {isBlended && (
            <div>
              <label className="block font-body text-sm text-charcoal mb-1.5">
                Secondary Pattern
              </label>
              <select
                value={secondaryPattern}
                onChange={(e) => setSecondaryPattern(e.target.value as RegulationPattern)}
                className={selectClass}
              >
                {regulationPatterns
                  .filter((p) => p.value !== primaryPattern)
                  .map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Core Wound */}
          <div>
            <label className="block font-body text-sm text-charcoal mb-1.5">Core Wound</label>
            <select
              value={selectedWound}
              onChange={(e) => setSelectedWound(e.target.value as CoreWound)}
              className={selectClass}
            >
              {coreWounds.map((w) => (
                <option key={w.value} value={w.value}>
                  {w.label}
                </option>
              ))}
            </select>
          </div>

          {/* Survival Identity */}
          <div>
            <label className="block font-body text-sm text-charcoal mb-1.5">
              Survival Identity
            </label>
            <select
              value={selectedIdentity}
              onChange={(e) => setSelectedIdentity(e.target.value as SurvivalIdentity)}
              className={selectClass}
            >
              {survivalIdentities.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Fawn Tally (People-Pleasing) */}
          <div>
            <label className="block font-body text-sm text-charcoal mb-1.5">
              Fawn Tally: {fawnTally} {fawnTally >= 3 ? '(People-Pleasing Note ON)' : '(Note off)'}
            </label>
            <input
              type="range"
              min={0}
              max={10}
              value={fawnTally}
              onChange={(e) => setFawnTally(Number(e.target.value))}
              className="w-full accent-sage"
            />
            <p className="font-body text-xs text-soft-brown/60 mt-1">
              Set ≥ 3 to trigger the &quot;People-Pleasing Tendencies Detected&quot; note on results.
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
        <p className="mt-6 text-center font-body text-xs text-soft-brown/50">
          This page is for content preview only. Not visible to users.
        </p>
      </div>
    </div>
  );
}
