'use client';

import type { ScoringResult } from '@/lib/types';
import { IDENTITY_DISPLAY_NAMES, NS_DISPLAY_NAMES, NS_SHORT_NAMES } from '@/lib/types';
import {
  IDENTITY_PROFILES,
  NS_PATTERN_CONTENT,
  COMBINATION_CONTENT,
  MEDITATION_CONTENT,
  NS_TOOLS_CONTENT,
} from '@/lib/results-content';

interface PDFReportProps {
  firstName: string;
  lastName?: string;
  scoringResult: ScoringResult;
}

export default function PDFReport({ firstName, lastName, scoringResult }: PDFReportProps) {
  const { primary, secondary, identityResults, nsResults, combinationKey, dominantNSState } = scoringResult;

  const profile = IDENTITY_PROFILES[primary.type];
  const nsPattern = NS_PATTERN_CONTENT[dominantNSState];
  const combination = COMBINATION_CONTENT[combinationKey];
  const meditation = MEDITATION_CONTENT[combinationKey];
  const nsTools = NS_TOOLS_CONTENT[dominantNSState];

  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const maxIdentityScore = Math.max(...identityResults.map((r) => r.score), 1);
  const maxNSScore = Math.max(...nsResults.map((r) => r.score), 1);

  const identityBadge = secondary
    ? `${IDENTITY_DISPLAY_NAMES[primary.type]} with ${IDENTITY_DISPLAY_NAMES[secondary.type]} Tendencies`
    : IDENTITY_DISPLAY_NAMES[primary.type];

  return (
    <div
      id="pdf-report"
      style={{
        position: 'fixed',
        left: '-9999px',
        top: 0,
        zIndex: -1,
        width: '794px',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: '#3D2B1F',
        lineHeight: 1.6,
      }}
    >
      {/* ======= COVER HEADER ======= */}
      <div style={{ padding: '48px 48px 32px', textAlign: 'center', borderBottom: '2px solid #4A5D4F' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '14px', letterSpacing: '3px', color: '#4A5D4F', textTransform: 'uppercase', marginBottom: '8px' }}>
          Ase Reiki &amp; Hypnotherapy&trade;
        </p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '32px', fontWeight: 600, color: '#3D2B1F', marginBottom: '12px' }}>
          Your Survival Identity Profile
        </h1>
        <p style={{ fontSize: '16px', color: '#6B5B4E', marginBottom: '4px' }}>
          Prepared for <strong>{fullName}</strong>
        </p>
        <p style={{ fontSize: '13px', color: '#6B5B4E' }}>{today}</p>
      </div>

      {/* ======= IDENTITY OVERVIEW ======= */}
      <div style={{ padding: '32px 48px', pageBreakInside: 'avoid' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '26px', color: '#4A5D4F', marginBottom: '12px', textAlign: 'center' }}>
          {IDENTITY_DISPLAY_NAMES[primary.type]}
        </h2>
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#6B5B4E', marginBottom: '16px' }}>
          {identityBadge} &middot; {NS_SHORT_NAMES[dominantNSState]} Dominant
        </p>
        <div style={{ background: '#F5F0EB', borderLeft: '4px solid #C8A96E', padding: '16px 20px', borderRadius: '6px', marginBottom: '24px' }}>
          <p style={{ fontStyle: 'italic', fontSize: '16px', color: '#3D2B1F' }}>
            &ldquo;{profile.coreBelief}&rdquo;
          </p>
        </div>
      </div>

      {/* ======= SCORE SUMMARY ======= */}
      <div style={{ padding: '0 48px 32px', pageBreakInside: 'avoid' }}>
        <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '20px', color: '#3D2B1F', marginBottom: '16px' }}>
          Identity Score Distribution
        </h3>
        {identityResults.map((identity) => (
          <div key={identity.type} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', width: '160px', textAlign: 'right', color: '#6B5B4E', flexShrink: 0 }}>
              {identity.name}
            </span>
            <div style={{ flex: 1, height: '20px', background: '#F5F0EB', borderRadius: '10px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.max(Math.round((identity.score / maxIdentityScore) * 100), 5)}%`,
                  background: identity.type === primary.type ? 'linear-gradient(to right, #4A5D4F, #6B8F71)' : 'linear-gradient(to right, #4A5D4F50, #6B8F7140)',
                  borderRadius: '10px',
                }}
              />
            </div>
            <span style={{ fontSize: '12px', color: '#6B5B4E', width: '40px' }}>{identity.pct}%</span>
          </div>
        ))}

        <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '20px', color: '#3D2B1F', marginTop: '24px', marginBottom: '16px' }}>
          Nervous System Map
        </h3>
        {nsResults.map((ns) => {
          const barColor = ns.state === 'VENTRAL' ? '#4A5D4F' : ns.state === 'SYMP' ? '#C8A96E' : '#6B5B4E';
          return (
            <div key={ns.state} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', width: '160px', textAlign: 'right', color: '#6B5B4E', flexShrink: 0 }}>
                {ns.name}
              </span>
              <div style={{ flex: 1, height: '20px', background: '#F5F0EB', borderRadius: '10px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.max(Math.round((ns.score / maxNSScore) * 100), 5)}%`,
                    background: barColor,
                    borderRadius: '10px',
                  }}
                />
              </div>
              <span style={{ fontSize: '12px', color: '#6B5B4E', width: '40px' }}>{ns.score}</span>
            </div>
          );
        })}
      </div>

      {/* ======= FULL IDENTITY PROFILE ======= */}
      <div style={{ padding: '0 48px 32px', pageBreakInside: 'avoid' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', color: '#4A5D4F', borderBottom: '1px solid #4A5D4F30', paddingBottom: '8px', marginBottom: '16px' }}>
          Your Survival Identity
        </h2>
        <p style={{ fontSize: '14px', color: '#3D2B1F', marginBottom: '20px' }}>{profile.summary}</p>
        {profile.headers.map((header, i) => (
          <div key={i} style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
            <h4 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '17px', color: '#3D2B1F', marginBottom: '8px' }}>{header}</h4>
            {profile.paragraphs[i]?.split('\n\n').map((p, j) => (
              <p key={j} style={{ fontSize: '13px', color: '#3D2B1F', marginBottom: '8px' }}>{p}</p>
            ))}
          </div>
        ))}
      </div>

      {/* ======= NS PATTERN ======= */}
      <div style={{ padding: '0 48px 32px', pageBreakInside: 'avoid' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', color: '#4A5D4F', borderBottom: '1px solid #4A5D4F30', paddingBottom: '8px', marginBottom: '16px' }}>
          Your Nervous System Pattern
        </h2>
        <p style={{ fontSize: '13px', color: '#C8A96E', marginBottom: '12px' }}>
          {NS_DISPLAY_NAMES[dominantNSState]} — {NS_SHORT_NAMES[dominantNSState]}
        </p>
        {nsPattern.split('\n\n').map((p, i) => (
          <p key={i} style={{ fontSize: '13px', color: '#3D2B1F', marginBottom: '8px' }}>{p}</p>
        ))}
      </div>

      {/* ======= HOW THEY WORK TOGETHER ======= */}
      <div style={{ padding: '0 48px 32px', pageBreakInside: 'avoid' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', color: '#4A5D4F', borderBottom: '1px solid #4A5D4F30', paddingBottom: '8px', marginBottom: '16px' }}>
          How They Work Together
        </h2>
        <p style={{ fontSize: '13px', color: '#C8A96E', marginBottom: '12px' }}>
          {IDENTITY_DISPLAY_NAMES[primary.type]} &times; {NS_SHORT_NAMES[dominantNSState]}
        </p>
        {combination.split('\n\n').map((p, i) => (
          <p key={i} style={{ fontSize: '13px', color: '#3D2B1F', marginBottom: '8px' }}>{p}</p>
        ))}
      </div>

      {/* ======= REGULATED ======= */}
      <div style={{ padding: '0 48px 32px', pageBreakInside: 'avoid' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', color: '#4A5D4F', borderBottom: '1px solid #4A5D4F30', paddingBottom: '8px', marginBottom: '16px' }}>
          What This Looks Like Regulated
        </h2>
        <div style={{ background: '#F5F0EB', borderRadius: '8px', padding: '20px', border: '1px solid #4A5D4F20' }}>
          {profile.regulated.split('\n\n').map((p, i) => (
            <p key={i} style={{ fontSize: '13px', color: '#3D2B1F', marginBottom: '8px' }}>{p}</p>
          ))}
        </div>
      </div>

      {/* ======= MEDITATION ======= */}
      <div style={{ padding: '0 48px 32px', pageBreakInside: 'avoid' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', color: '#4A5D4F', borderBottom: '1px solid #4A5D4F30', paddingBottom: '8px', marginBottom: '16px' }}>
          Your Matched Meditation
        </h2>
        <h4 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '17px', color: '#3D2B1F', marginBottom: '10px' }}>{meditation.title}</h4>
        {meditation.body.split('\n\n').map((p, i) => (
          <p key={i} style={{ fontSize: '13px', color: '#3D2B1F', marginBottom: '8px' }}>{p}</p>
        ))}
      </div>

      {/* ======= NS TOOLS ======= */}
      <div style={{ padding: '0 48px 32px', pageBreakInside: 'avoid' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '24px', color: '#4A5D4F', borderBottom: '1px solid #4A5D4F30', paddingBottom: '8px', marginBottom: '16px' }}>
          Regulation Tools for Your Pattern
        </h2>
        <p style={{ fontSize: '13px', color: '#C8A96E', marginBottom: '12px' }}>
          Techniques for {NS_SHORT_NAMES[dominantNSState].toLowerCase()}
        </p>
        {nsTools.split('\n\n').map((p, i) => (
          <p key={i} style={{ fontSize: '13px', color: '#3D2B1F', marginBottom: '8px' }}>{p}</p>
        ))}
      </div>

      {/* ======= FOOTER ======= */}
      <div style={{ padding: '24px 48px 48px', borderTop: '1px solid #4A5D4F30', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#6B5B4E', marginBottom: '6px' }}>
          This assessment is for educational and self-awareness purposes only. It is not a clinical diagnosis or substitute for professional mental health care.
        </p>
        <p style={{ fontSize: '11px', color: '#6B5B4E80' }}>
          &copy; 2025 Ase Reiki &amp; Hypnotherapy&trade; &middot; healtheroot.com
        </p>
      </div>
    </div>
  );
}
