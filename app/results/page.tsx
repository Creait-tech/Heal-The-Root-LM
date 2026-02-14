'use client';

import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import ThemeToggle from '@/components/ui/ThemeToggle';
import PDFReport from '@/components/pdf/PDFReport';
import {
  IDENTITY_PROFILES,
  NS_PATTERN_CONTENT,
  COMBINATION_CONTENT,
  MEDITATION_CONTENT,
  NS_TOOLS_CONTENT,
  communityValueStack,
  socialProofData,
  personalizedCTA,
  lockedContentTeaser,
} from '@/lib/results-content';
import {
  IDENTITY_DISPLAY_NAMES,
  NS_DISPLAY_NAMES,
  NS_SHORT_NAMES,
} from '@/lib/types';
import type { IdentityType, NervousSystemState } from '@/lib/types';
import { trackEvent } from '@/lib/analytics';

// --- SVG Icons (no emojis) ---

const IdentityIcon = ({ type, className = '' }: { type: IdentityType; className?: string }) => {
  const icons: Record<IdentityType, JSX.Element> = {
    ACHIEVER: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    ANCHOR: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    OPERATOR: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    STRATEGIST: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    BURNER: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  };
  return icons[type];
};

const NSIcon = ({ state, className = '' }: { state: NervousSystemState; className?: string }) => {
  const icons: Record<NervousSystemState, JSX.Element> = {
    SYMP: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    DORSAL: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    VENTRAL: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  };
  return icons[state];
};

// --- Section icons ---
const CombinationIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" />
  </svg>
);

const RegulatedIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MeditationIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const ToolsIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
);

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function ResultsPage() {
  const router = useRouter();
  const { scoringResult, userInfo, resetAll } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!scoringResult) {
      router.push('/assessment');
      return;
    }
    if (!userInfo) {
      router.push('/email-gate');
      return;
    }
    trackEvent('results_view', {
      primaryIdentity: scoringResult.primary.type,
      dominantNS: scoringResult.dominantNSState,
    });
  }, [mounted, scoringResult, userInfo, router]);

  useEffect(() => {
    if (!mounted || !scoringResult || !userInfo) return;
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setShowStickyCTA(scrollPercent > 0.35);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted, scoringResult, userInfo]);

  if (!mounted || !scoringResult || !userInfo) {
    return null;
  }

  const firstName = userInfo.firstName;
  const { primary, secondary, identityResults, nsResults, combinationKey, dominantNSState } = scoringResult;

  const profile = IDENTITY_PROFILES[primary.type];
  const nsPattern = NS_PATTERN_CONTENT[dominantNSState];
  const combination = COMBINATION_CONTENT[combinationKey];
  const meditation = MEDITATION_CONTENT[combinationKey];
  const nsTools = NS_TOOLS_CONTENT[dominantNSState];
  const cta = personalizedCTA[primary.type];
  const teaserItems = lockedContentTeaser[primary.type];
  const communityUrl = 'https://www.skool.com/heal-the-root-3617/about?ref=d79428c015764fd8ac7a155f7426efe9';

  // NS state bar colors
  const nsBarColor = (state: NervousSystemState) => {
    if (state === 'VENTRAL') return 'bg-gradient-to-r from-sage to-sage/80';
    if (state === 'SYMP') return 'bg-gradient-to-r from-muted-gold to-muted-gold/70';
    return 'bg-gradient-to-r from-soft-brown/50 to-soft-brown/30';
  };

  const maxNSValue = Math.max(...nsResults.map((r) => r.score), 1);

  const identityBadge = secondary
    ? `${IDENTITY_DISPLAY_NAMES[primary.type]} with ${IDENTITY_DISPLAY_NAMES[secondary.type]} Tendencies`
    : `${IDENTITY_DISPLAY_NAMES[primary.type]}`;

  const handleSavePDF = async () => {
    const element = document.getElementById('pdf-report');
    if (!element) return;
    trackEvent('pdf_download');
    const html2pdf = (await import('html2pdf.js')).default;
    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: `survival-identity-profile-${firstName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0, windowWidth: 794 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  const handleShare = async () => {
    trackEvent('share_click');
    const shareData = {
      title: 'My Survival Identity Profile',
      text: `I just discovered my Survival Identity: ${IDENTITY_DISPLAY_NAMES[primary.type]}. Take the Heal The Cycle assessment to learn yours.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage('Link copied to clipboard!');
      setTimeout(() => setShareMessage(''), 3000);
    }
  };

  const handleStartOver = () => {
    resetAll();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg transition-colors duration-300">
      <ThemeToggle />

      {/* Hidden PDF Report for download */}
      <PDFReport
        firstName={firstName}
        lastName={userInfo.lastName}
        scoringResult={scoringResult}
      />

      {/* Sticky bottom CTA bar */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' as const }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md border-t border-sage/15 dark:border-dark-border shadow-lg dark:shadow-dark-soft"
            style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
          >
            <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
              <div className="hidden sm:block flex-1 min-w-0">
                <p className="font-body text-deep-brown dark:text-dark-text text-sm font-medium truncate">
                  Your healing protocol is ready
                </p>
                <p className="font-body text-soft-brown/70 dark:text-dark-muted text-xs">
                  $22/mo &middot; Cancel anytime
                </p>
              </div>
              <a href={communityUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 w-full sm:w-auto">
                <Button className="w-full sm:w-auto text-sm px-6 py-2.5">
                  {cta.buttonText} &rarr;
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="results-content" className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* ============================================= */}
        {/* ALWAYS VISIBLE: Hero + Score Bars + Summary */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="text-center mb-12"
        >
          <p className="font-body text-soft-brown dark:text-dark-muted text-sm uppercase tracking-widest mb-4">
            Your Survival Identity Profile
          </p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-deep-brown dark:text-dark-text mb-6">
            {firstName}, here&apos;s your profile
          </h1>
          <div className="mb-4 flex items-center justify-center gap-3">
            <IdentityIcon type={primary.type} className="w-7 h-7 text-sage dark:text-dark-sage" />
            <span className="font-heading text-2xl md:text-3xl text-sage dark:text-dark-sage">
              {IDENTITY_DISPLAY_NAMES[primary.type]}
            </span>
          </div>
          <span className="inline-block bg-sage/10 dark:bg-dark-sage/20 text-sage dark:text-dark-sage font-body text-sm px-4 py-2 rounded-full border border-sage/20 dark:border-dark-sage/30">
            {identityBadge}
          </span>
          <div className="mt-4 flex items-center justify-center gap-2">
            <NSIcon state={dominantNSState} className="w-4 h-4 text-soft-brown dark:text-dark-muted" />
            <p className="font-body text-soft-brown dark:text-dark-muted text-sm">
              {NS_SHORT_NAMES[dominantNSState]} Dominant
            </p>
          </div>
        </motion.section>

        {/* NS Bars (always visible) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-12"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-deep-brown dark:text-dark-text mb-6">
            Your Nervous System Map
          </h2>
          <div className="space-y-4 mb-8">
            {nsResults.map((ns) => {
              const barPercent = Math.round((ns.score / maxNSValue) * 100);
              const isHighest = ns.score === maxNSValue && ns.score > 0;

              return (
                <div key={ns.state} className="flex items-center gap-3 sm:gap-4">
                  <span className={`font-body text-xs sm:text-sm w-28 sm:w-36 text-right flex-shrink-0 leading-tight flex items-center justify-end gap-1.5 ${
                    isHighest ? 'text-deep-brown dark:text-dark-text font-semibold' : 'text-soft-brown dark:text-dark-muted'
                  }`}>
                    <NSIcon state={ns.state} className="w-3.5 h-3.5 inline-block" />
                    {ns.name}
                  </span>
                  <div className="flex-1 h-8 sm:h-10 bg-sage/5 dark:bg-dark-surface rounded-lg overflow-hidden relative">
                    <motion.div
                      className={`h-full rounded-lg ${nsBarColor(ns.state)}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max(barPercent, 8)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' as const, delay: 0.2 }}
                    />
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 font-body text-xs sm:text-sm font-medium ${
                        isHighest ? 'text-white' : 'text-charcoal/60 dark:text-dark-muted'
                      }`}
                    >
                      {ns.score}
                    </motion.span>
                  </div>
                  {isHighest && (
                    <span className={`text-xs font-body px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:block ${
                      ns.state === 'VENTRAL'
                        ? 'text-sage bg-sage/10 dark:text-dark-sage dark:bg-dark-sage/20'
                        : ns.state === 'SYMP'
                        ? 'text-muted-gold bg-muted-gold/10'
                        : 'text-soft-brown bg-soft-brown/10 dark:text-dark-muted dark:bg-dark-surface'
                    }`}>
                      Dominant
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary quote */}
          <div className="bg-white/60 dark:bg-dark-card/60 rounded-xl p-6 border border-sage/10 dark:border-dark-border">
            <p className="font-body text-soft-brown dark:text-dark-muted italic text-lg border-l-4 border-muted-gold/40 pl-4">
              {profile.coreBelief}
            </p>
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* COLLAPSIBLE SECTIONS */}
        {/* ============================================= */}
        <div className="space-y-4 mb-12">
          {/* Identity Profile */}
          <CollapsibleSection
            title="Your Survival Identity"
            subtitle={IDENTITY_DISPLAY_NAMES[primary.type]}
            icon={<IdentityIcon type={primary.type} className="w-5 h-5 text-sage dark:text-dark-sage" />}
            accentColor="border-sage/20 dark:border-dark-border"
            defaultOpen
          >
            <p className="font-body text-charcoal/80 dark:text-dark-text/80 leading-relaxed mb-6">{profile.summary}</p>
            <div className="space-y-6">
              {profile.headers.map((header, i) => (
                <div key={i}>
                  <h4 className="font-heading text-lg text-deep-brown dark:text-dark-text mb-2">{header}</h4>
                  <div className="font-body text-charcoal/80 dark:text-dark-text/80 leading-relaxed space-y-2">
                    {profile.paragraphs[i]?.split('\n\n').map((p: string, j: number) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* NS Pattern */}
          <CollapsibleSection
            title="Your Nervous System Pattern"
            subtitle={`${NS_DISPLAY_NAMES[dominantNSState]} — ${NS_SHORT_NAMES[dominantNSState]}`}
            icon={<NSIcon state={dominantNSState} className="w-5 h-5 text-sage dark:text-dark-sage" />}
            accentColor="border-sage/20 dark:border-dark-border"
          >
            <div className="font-body text-charcoal/80 dark:text-dark-text/80 leading-relaxed space-y-3">
              {nsPattern.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </CollapsibleSection>

          {/* How They Work Together */}
          <CollapsibleSection
            title="How They Work Together"
            subtitle={`${IDENTITY_DISPLAY_NAMES[primary.type]} × ${NS_SHORT_NAMES[dominantNSState]}`}
            icon={<CombinationIcon className="w-5 h-5 text-muted-gold" />}
            accentColor="border-muted-gold/30 dark:border-dark-border"
          >
            <span className="inline-block bg-muted-gold/10 text-muted-gold font-body text-xs px-3 py-1 rounded-full border border-muted-gold/20 mb-4">
              {IDENTITY_DISPLAY_NAMES[primary.type]} &times; {NS_SHORT_NAMES[dominantNSState]}
            </span>
            <div className="font-body text-charcoal/80 dark:text-dark-text/80 leading-relaxed space-y-3">
              {combination.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </CollapsibleSection>
        </div>

        {/* ============================================= */}
        {/* MID-PAGE CTA */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-sage/8 via-sage/5 to-muted-gold/5 dark:from-dark-sage/15 dark:via-dark-surface dark:to-muted-gold/5 rounded-2xl p-6 sm:p-8 border border-sage/15 dark:border-dark-border">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-muted-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <h3 className="font-heading text-lg text-deep-brown dark:text-dark-text">
                Inside The Rewire Room, you&apos;ll get...
              </h3>
            </div>
            <div className="space-y-3 mb-6">
              {teaserItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <svg className="w-5 h-5 text-muted-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-body text-charcoal/80 dark:text-dark-text/80 text-sm leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <a href={communityUrl} target="_blank" rel="noopener noreferrer">
                <Button className="text-base px-8 py-3">
                  {cta.buttonText} &rarr;
                </Button>
              </a>
              <p className="font-body text-soft-brown/50 dark:text-dark-muted/50 text-xs mt-3">
                $22/mo &middot; Cancel anytime
              </p>
            </div>
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* MORE COLLAPSIBLE SECTIONS */}
        {/* ============================================= */}
        <div className="space-y-4 mb-12">
          {/* What This Looks Like Regulated */}
          <CollapsibleSection
            title="What This Looks Like Regulated"
            subtitle="The version of you your nervous system is building toward"
            icon={<RegulatedIcon className="w-5 h-5 text-sage dark:text-dark-sage" />}
            accentColor="border-sage/30 dark:border-dark-border"
          >
            <div className="bg-sage/5 dark:bg-dark-sage/10 rounded-lg p-5 border border-sage/10 dark:border-dark-sage/20">
              <div className="font-body text-charcoal/80 dark:text-dark-text/80 leading-relaxed space-y-2">
                {profile.regulated.split('\n\n').map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </CollapsibleSection>

          {/* Meditation Recommendation */}
          <CollapsibleSection
            title="Your Matched Meditation"
            subtitle={meditation.title}
            icon={<MeditationIcon className="w-5 h-5 text-sage dark:text-dark-sage" />}
            accentColor="border-sage/20 dark:border-dark-border"
          >
            <h4 className="font-heading text-lg text-deep-brown dark:text-dark-text mb-3">{meditation.title}</h4>
            <div className="font-body text-charcoal/80 dark:text-dark-text/80 leading-relaxed space-y-3">
              {meditation.body.split('\n\n').map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <a
              href={communityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 font-body text-sm text-muted-gold hover:text-muted-gold/80 transition-colors"
            >
              Access Full Meditation Inside &rarr;
            </a>
          </CollapsibleSection>

          {/* NS Tools */}
          <CollapsibleSection
            title="Regulation Tools for Your Pattern"
            subtitle={`Techniques for ${NS_SHORT_NAMES[dominantNSState].toLowerCase()}`}
            icon={<ToolsIcon className="w-5 h-5 text-sage dark:text-dark-sage" />}
            accentColor="border-sage/20 dark:border-dark-border"
          >
            <div className="font-body text-charcoal/80 dark:text-dark-text/80 leading-relaxed space-y-3">
              {nsTools.split('\n\n').map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </CollapsibleSection>
        </div>

        {/* ============================================= */}
        {/* PDF DOWNLOAD */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-12 text-center"
        >
          <Button onClick={handleSavePDF} variant="secondary" className="px-8">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Full Report (PDF)
            </span>
          </Button>
        </motion.section>

        {/* ============================================= */}
        {/* YOUR OTHER PATTERNS */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-12"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-deep-brown dark:text-dark-text mb-4">
            Your Other Patterns
          </h2>
          <p className="font-body text-soft-brown dark:text-dark-muted text-sm mb-6">
            Your identity distribution across all five survival types.
          </p>

          {/* Identity Distribution Bars */}
          <div className="space-y-3 mb-6">
            {identityResults.map((identity, i) => (
              <div key={identity.type} className="flex items-center gap-3">
                <span className="font-body text-xs sm:text-sm w-40 text-right flex-shrink-0 truncate flex items-center justify-end gap-1.5 text-soft-brown dark:text-dark-muted">
                  <IdentityIcon type={identity.type} className="w-3.5 h-3.5 inline-block flex-shrink-0" />
                  {identity.name}
                </span>
                <div className="flex-1 h-6 bg-sage/5 dark:bg-dark-surface rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${i === 0 ? 'bg-sage dark:bg-dark-sage' : 'bg-sage/30 dark:bg-dark-sage/30'}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.max(identity.pct, 4)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                  />
                </div>
                <span className="font-body text-xs text-charcoal/60 dark:text-dark-muted w-10">{identity.pct}%</span>
              </div>
            ))}
          </div>

          {/* Expandable per-identity sections (skip primary) */}
          <div className="space-y-3">
            {identityResults.slice(1).map((identity) => {
              const otherProfile = IDENTITY_PROFILES[identity.type];
              return (
                <CollapsibleSection
                  key={identity.type}
                  title={IDENTITY_DISPLAY_NAMES[identity.type]}
                  subtitle={`${identity.pct}% — ${otherProfile.coreBelief}`}
                  icon={<IdentityIcon type={identity.type} className="w-4 h-4 text-sage/70 dark:text-dark-sage/70" />}
                  accentColor="border-sage/10 dark:border-dark-border"
                >
                  <p className="font-body text-charcoal/80 dark:text-dark-text/80 leading-relaxed mb-4">
                    {otherProfile.summary}
                  </p>
                  <div className="bg-sage/5 dark:bg-dark-sage/10 rounded-lg p-4 border border-sage/10 dark:border-dark-sage/20">
                    <h5 className="font-heading text-base text-sage dark:text-dark-sage mb-2">When Regulated</h5>
                    <div className="font-body text-charcoal/80 dark:text-dark-text/80 text-sm leading-relaxed space-y-2">
                      {otherProfile.regulated.split('\n\n').map((p: string, j: number) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  </div>
                </CollapsibleSection>
              );
            })}
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* SOCIAL PROOF */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <p className="font-body text-soft-brown dark:text-dark-muted text-sm uppercase tracking-widest mb-2">
              From Inside the Community
            </p>
            <p className="font-heading text-xl md:text-2xl text-deep-brown dark:text-dark-text">
              {socialProofData.memberCount} {socialProofData.tagline}
            </p>
          </div>

          <div className="space-y-4">
            {socialProofData.testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.5 }}
                className="bg-white/60 dark:bg-dark-card/60 rounded-xl p-5 sm:p-6 border border-sage/10 dark:border-dark-border"
              >
                <p className="font-body text-charcoal/80 dark:text-dark-text/80 text-sm sm:text-base leading-relaxed italic mb-3">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-sage/10 dark:bg-dark-sage/20 flex items-center justify-center">
                    <span className="font-heading text-sage dark:text-dark-sage text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-body text-deep-brown dark:text-dark-text text-sm font-medium">&mdash; {t.name}</p>
                    <p className="font-body text-soft-brown/70 dark:text-dark-muted text-xs">{t.pattern} Pattern</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* BOTTOM CTA: Full Community Pitch */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-sage/8 via-sage/5 to-muted-gold/5 dark:from-dark-sage/15 dark:via-dark-surface dark:to-muted-gold/5 rounded-2xl p-6 sm:p-8 md:p-10 text-center border border-sage/15 dark:border-dark-border">
            <h2 className="font-heading text-2xl md:text-3xl text-deep-brown dark:text-dark-text mb-2">
              What You Get Inside
            </h2>
            <p className="font-body text-soft-brown dark:text-dark-muted text-center text-sm mb-8">
              Everything your nervous system needs to go from surviving to living.
            </p>

            <div className="space-y-3 text-left max-w-xl mx-auto mb-8">
              {communityValueStack.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                  className="flex items-start gap-4 bg-white/60 dark:bg-dark-card/60 rounded-xl p-4 sm:p-5 border border-sage/10 dark:border-dark-border"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage/10 dark:bg-dark-sage/20 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-sage dark:text-dark-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-heading text-base sm:text-lg text-deep-brown dark:text-dark-text mb-1">{item.title}</h4>
                    <p className="font-body text-charcoal/70 dark:text-dark-text/70 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="font-body text-soft-brown dark:text-dark-muted italic text-base sm:text-lg mb-4 max-w-lg mx-auto leading-relaxed">
              {cta.headline}
            </p>
            <p className="font-body text-charcoal/80 dark:text-dark-text/80 text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto">
              {cta.subline}
            </p>

            <div className="mb-6">
              <div className="inline-flex items-baseline gap-1">
                <span className="font-heading text-4xl sm:text-5xl text-deep-brown dark:text-dark-text">$22</span>
                <span className="font-body text-soft-brown dark:text-dark-muted text-sm">/month</span>
              </div>
              <p className="font-body text-soft-brown/70 dark:text-dark-muted/70 text-xs mt-1">
                Less than a single therapy session. Cancel anytime.
              </p>
            </div>

            <p className="font-body text-charcoal/60 dark:text-dark-muted/60 text-xs sm:text-sm mb-6 max-w-md mx-auto italic leading-relaxed">
              {cta.urgencyLine}
            </p>

            <a href={communityUrl} target="_blank" rel="noopener noreferrer">
              <Button className="text-base sm:text-lg px-8 sm:px-10 py-4">
                {cta.buttonText} &rarr;
              </Button>
            </a>

            <p className="font-body text-soft-brown/50 dark:text-dark-muted/50 text-xs mt-4">
              Instant access &middot; Cancel anytime &middot; {socialProofData.memberCount} members inside
            </p>
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* SHARE + START OVER */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={handleShare} variant="secondary" className="w-full sm:w-auto">
              Share
            </Button>
            <Button onClick={handleStartOver} variant="secondary" className="w-full sm:w-auto">
              Start Over
            </Button>
          </div>
          {shareMessage && (
            <p className="text-center mt-3 font-body text-sm text-sage dark:text-dark-sage">{shareMessage}</p>
          )}
        </motion.section>

        {/* ============================================= */}
        {/* FOOTER */}
        {/* ============================================= */}
        <footer className="text-center border-t border-sage/10 dark:border-dark-border pt-8 pb-20 sm:pb-4">
          <p className="font-body text-xs text-soft-brown/60 dark:text-dark-muted/60 leading-relaxed max-w-lg mx-auto mb-3">
            This assessment is for educational and self-awareness purposes only. It is not a clinical
            diagnosis or substitute for professional mental health care.
          </p>
          <p className="font-body text-xs text-soft-brown/40 dark:text-dark-muted/40">
            &copy; 2025 Ase Reiki &amp; Hypnotherapy&trade;
          </p>
        </footer>
      </div>
    </div>
  );
}
