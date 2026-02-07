'use client';

import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import {
  patternContent,
  woundContent,
  identityContent,
  practicesByPattern,
  whatThisMeansContent,
  personalizedCTA,
  communityValueStack,
  socialProofData,
  lockedContentTeaser,
} from '@/lib/results-content';
import type { RegulationPattern } from '@/lib/types';

const patternLabels: Record<RegulationPattern, string> = {
  'fight-flight': 'Fight / Flight',
  freeze: 'Freeze',
  fawn: 'People-Pleasing',
};

// Polyvagal display — the 3 true nervous system states
const polyvagalLabels = {
  sympathetic: 'Sympathetic (Fight/Flight)',
  'dorsal-vagal': 'Dorsal Vagal (Freeze)',
  'ventral-vagal': 'Ventral Vagal (Regulated)',
} as const;

type PolyvagalKey = keyof typeof polyvagalLabels;

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function ResultsPage() {
  const router = useRouter();
  const { scoringResult, userInfo } = useAppStore();

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
  }, [mounted, scoringResult, userInfo, router]);

  // Show sticky CTA after user scrolls past the survival identity section
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
  const { primaryPattern, secondaryPattern, isBlended, coreWounds, survivalIdentity } = scoringResult;
  const tally = scoringResult.tally;

  // Fawn tendency (backward compat for old localStorage data)
  const fawnTendency = scoringResult.fawnTendency ?? (tally.fawn >= 3);

  // Ventral regulation calculation — fawn contributes to "not ventral" but isn't a polyvagal state
  const totalSurvivalTally = tally['fight-flight'] + tally.freeze + tally.fawn;
  const maxPossible = 20;
  const ventralScore = Math.max(0, maxPossible - totalSurvivalTally);
  const ventralAccessPercent = Math.max(0, Math.min(100, Math.round((ventralScore / maxPossible) * 100)));

  // Polyvagal graph values (3 true nervous system states)
  const polyvagalValues = {
    sympathetic: tally['fight-flight'],
    'dorsal-vagal': tally.freeze,
    'ventral-vagal': ventralScore,
  };
  const polyvagalStates: PolyvagalKey[] = ['sympathetic', 'dorsal-vagal', 'ventral-vagal'];
  const maxBarValue = Math.max(polyvagalValues.sympathetic, polyvagalValues['dorsal-vagal'], polyvagalValues['ventral-vagal'], 1);

  const ventralLevel = ventralAccessPercent >= 60
    ? 'strong'
    : ventralAccessPercent >= 40
    ? 'developing'
    : 'limited';

  const ventralLabels = {
    strong: { title: 'Strong Ventral Access', color: 'text-sage', ringColor: '#4A5D4F', desc: 'Your nervous system shows meaningful capacity for regulation and social engagement. You have access to calm, connection, and clear thinking — the work now is expanding that window.' },
    developing: { title: 'Developing Ventral Access', color: 'text-muted-gold', ringColor: '#C8A96E', desc: 'Your system moves between survival states and ventral regulation. You can access calm and connection, but your window of tolerance is still being built. This is exactly where the deepest growth happens.' },
    limited: { title: 'Survival-Dominant Pattern', color: 'text-soft-brown', ringColor: '#6B5B4E', desc: 'Your nervous system is spending most of its energy in survival states. This isn\'t a failing — it\'s your system doing exactly what it was trained to do. The path forward starts with building safety, not pushing harder.' },
  };

  const ventral = ventralLabels[ventralLevel];

  const pattern = patternContent[primaryPattern];
  const identity = identityContent[survivalIdentity];
  const practices = practicesByPattern[primaryPattern];
  const whatThisMeans = whatThisMeansContent[primaryPattern];
  const cta = personalizedCTA[primaryPattern];
  const teaserItems = lockedContentTeaser[primaryPattern];
  const communityUrl = 'https://www.skool.com/heal-the-root-3617/about?ref=d79428c015764fd8ac7a155f7426efe9';

  // For display, map fawn to the underlying polyvagal state
  const displayPatternLabel = primaryPattern === 'fawn'
    ? (tally['fight-flight'] >= tally.freeze ? 'Sympathetic with People-Pleasing' : 'Dorsal Vagal with People-Pleasing')
    : patternLabels[primaryPattern];

  const patternBadge = isBlended && secondaryPattern
    ? `${displayPatternLabel} with ${patternLabels[secondaryPattern]} Tendencies`
    : `${displayPatternLabel} Dominant`;

  const handleSavePDF = async () => {
    const element = document.getElementById('results-content');
    if (!element) return;
    const html2pdf = (await import('html2pdf.js')).default;
    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: `nervous-system-profile-${firstName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  const handleShare = async () => {
    const shareData = {
      title: 'My Nervous System Profile',
      text: `I just discovered my Nervous System Profile: ${identity.name}. Take the Heal The Cycle assessment to learn yours.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage('Link copied to clipboard!');
      setTimeout(() => setShareMessage(''), 3000);
    }
  };

  // allPatterns removed — replaced by polyvagalStates for the graph

  return (
    <div className="min-h-screen bg-cream">
      {/* Sticky bottom CTA bar */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' as const }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-sage/15 shadow-lg"
            style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
          >
            <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
              <div className="hidden sm:block flex-1 min-w-0">
                <p className="font-body text-deep-brown text-sm font-medium truncate">
                  Your healing protocol is ready
                </p>
                <p className="font-body text-soft-brown/70 text-xs">
                  $22/mo &middot; Cancel anytime
                </p>
              </div>
              <a
                href={communityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-full sm:w-auto"
              >
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
        {/* Section 1: Hero */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <p className="font-body text-soft-brown text-sm uppercase tracking-widest mb-4">
            Your Nervous System Profile
          </p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-deep-brown mb-6">
            {firstName}, here&apos;s your Nervous System Profile
          </h1>
          <div className="mb-4">
            <span className="font-heading text-2xl md:text-3xl text-sage">{identity.name}</span>
          </div>
          <span className="inline-block bg-sage/10 text-sage font-body text-sm px-4 py-2 rounded-full border border-sage/20">
            {patternBadge}
          </span>
        </motion.section>

        {/* ============================================= */}
        {/* Section 1.5: Ventral Regulation Status */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-deep-brown mb-6 text-center">
            Your Ventral Regulation Status
          </h2>

          <div className="bg-white/60 rounded-xl p-6 md:p-8 border border-sage/10">
            <div className="flex flex-col items-center">
              {/* SVG Progress Ring */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  {/* Background circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#F5F0EB"
                    strokeWidth="10"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke={ventral.ringColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                    whileInView={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - ventralAccessPercent / 100) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.3 }}
                  />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className={`font-heading text-3xl sm:text-4xl ${ventral.color}`}
                  >
                    {ventralAccessPercent}%
                  </motion.span>
                  <span className="font-body text-xs text-soft-brown">Ventral Access</span>
                </div>
              </div>

              {/* Status label */}
              <h3 className={`font-heading text-xl ${ventral.color} mb-3`}>
                {ventral.title}
              </h3>

              {/* Description */}
              <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed text-center max-w-lg">
                {ventral.desc}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* Section 2: Your Regulation Pattern */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-deep-brown mb-6">
            Your Regulation Pattern
          </h2>

          {/* Polyvagal State Distribution Graph */}
          <div className="space-y-4 mb-8">
            {polyvagalStates.map((state) => {
              const value = polyvagalValues[state];
              const barPercent = Math.round((value / maxBarValue) * 100);
              const isHighest = value === maxBarValue && value > 0;

              // Color scheme per polyvagal state
              const barColor = state === 'ventral-vagal'
                ? 'bg-gradient-to-r from-sage to-sage/80'
                : state === 'sympathetic'
                ? 'bg-gradient-to-r from-muted-gold to-muted-gold/70'
                : 'bg-gradient-to-r from-soft-brown/50 to-soft-brown/30';

              return (
                <div key={state} className="flex items-center gap-3 sm:gap-4">
                  <span className={`font-body text-xs sm:text-sm w-28 sm:w-36 text-right flex-shrink-0 leading-tight ${
                    isHighest ? 'text-deep-brown font-semibold' : 'text-soft-brown'
                  }`}>
                    {polyvagalLabels[state]}
                  </span>
                  <div className="flex-1 h-8 sm:h-10 bg-sage/5 rounded-lg overflow-hidden relative">
                    <motion.div
                      className={`h-full rounded-lg ${barColor}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max(barPercent, 8)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.2 }}
                    />
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 font-body text-xs sm:text-sm font-medium ${
                        isHighest ? 'text-white' : 'text-charcoal/60'
                      }`}
                    >
                      {value.toFixed(1)}
                    </motion.span>
                  </div>
                  {isHighest && (
                    <span className={`text-xs font-body px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:block ${
                      state === 'ventral-vagal'
                        ? 'text-sage bg-sage/10'
                        : state === 'sympathetic'
                        ? 'text-muted-gold bg-muted-gold/10'
                        : 'text-soft-brown bg-soft-brown/10'
                    }`}>
                      Dominant
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* People-Pleasing Tendencies Note — only shown when significant */}
          {fawnTendency && (
            <div className="bg-muted-gold/5 rounded-xl p-5 border border-muted-gold/15 mb-8">
              <h4 className="font-heading text-base text-deep-brown mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-muted-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                People-Pleasing Tendencies Detected
              </h4>
              <p className="font-body text-charcoal/70 text-sm leading-relaxed">
                Your responses also indicate significant people-pleasing (fawn) tendencies.
                While not a polyvagal state itself, fawn is a learned behavioral response that
                often develops alongside sympathetic or dorsal vagal activation. It means your
                nervous system learned that safety comes from managing other people&apos;s emotions
                and needs — sometimes at the expense of your own. This is reflected in your
                survival identity and recommended practices below.
              </p>
            </div>
          )}

          {/* Pattern Details */}
          <div className="bg-white/60 rounded-xl p-6 md:p-8 border border-sage/10">
            <h3 className="font-heading text-xl text-deep-brown mb-1">{pattern.name}</h3>
            <p className="font-body text-muted-gold text-sm italic mb-4">{pattern.tagline}</p>
            <div className="font-body text-charcoal/80 leading-relaxed space-y-3">
              {pattern.description.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* Section 3: Your Core Wound(s) */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-deep-brown mb-6">
            Your Core Wound{coreWounds.length > 1 ? 's' : ''}
          </h2>

          <div className="space-y-6">
            {coreWounds.map((wound) => {
              const w = woundContent[wound];
              return (
                <div
                  key={wound}
                  className="bg-white/60 rounded-xl p-6 md:p-8 border border-sage/10"
                >
                  <h3 className="font-heading text-xl text-deep-brown mb-3">{w.name}</h3>
                  <div className="font-body text-charcoal/80 leading-relaxed space-y-3">
                    {w.description.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* Section 4: Your Survival Identity */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-deep-brown mb-6">
            Your Survival Identity
          </h2>

          <div className="bg-white/60 rounded-xl p-6 md:p-8 border border-sage/10">
            <h3 className="font-heading text-2xl text-sage mb-2">{identity.name}</h3>
            <p className="font-body text-soft-brown italic text-lg mb-6 border-l-4 border-muted-gold/40 pl-4">
              &ldquo;{identity.coreBelief}&rdquo;
            </p>

            <div className="space-y-6">
              {/* How It Formed */}
              <div>
                <h4 className="font-heading text-lg text-deep-brown mb-2">How It Formed</h4>
                <p className="font-body text-charcoal/80 leading-relaxed">{identity.howItFormed}</p>
              </div>

              {/* How It Shows Up */}
              <div>
                <h4 className="font-heading text-lg text-deep-brown mb-2">How It Shows Up</h4>
                <p className="font-body text-charcoal/80 leading-relaxed">{identity.howItShowsUp}</p>
              </div>

              {/* What It Costs */}
              <div>
                <h4 className="font-heading text-lg text-deep-brown mb-2">What It Costs</h4>
                <p className="font-body text-charcoal/80 leading-relaxed">{identity.whatItCosts}</p>
              </div>

              {/* The Reframe */}
              <div>
                <h4 className="font-heading text-lg text-deep-brown mb-2">The Reframe</h4>
                <p className="font-body text-charcoal/80 leading-relaxed">{identity.keyReframe}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* Section 5: What This Means For You */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-deep-brown mb-6">
            What This Means For You
          </h2>

          <div className="bg-white/60 rounded-xl p-6 md:p-8 border border-sage/10 mb-6">
            <p className="font-body text-charcoal/80 leading-relaxed">{whatThisMeans}</p>
          </div>

          <div className="space-y-4">
            {[
              {
                num: 1,
                title: 'Regulation',
                desc: 'Learning to bring your nervous system back to a window of tolerance so you can respond rather than react.',
              },
              {
                num: 2,
                title: 'Rewiring',
                desc: 'Identifying the core beliefs and survival patterns that run your decisions, and creating new neural pathways.',
              },
              {
                num: 3,
                title: 'Alignment',
                desc: 'Moving from survival-based living into choices rooted in your true self, values, and desires.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="flex gap-4 bg-white/60 rounded-xl p-5 border border-sage/10"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                  <span className="font-heading text-sage text-lg">{item.num}</span>
                </div>
                <div>
                  <h4 className="font-heading text-lg text-deep-brown mb-1">{item.title}</h4>
                  <p className="font-body text-charcoal/80 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* Section 6: Recommended Practices (Preview) */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-deep-brown mb-3">
            Recommended Practices
          </h2>
          <p className="font-body text-soft-brown mb-6">
            Based on your profile, these practices will help most.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practices.map((practice, i) => (
              <div
                key={i}
                className="bg-white/60 rounded-xl p-6 border border-sage/10 flex flex-col"
              >
                <h4 className="font-heading text-lg text-deep-brown mb-2">{practice.name}</h4>
                <p className="font-body text-charcoal/80 text-sm leading-relaxed mb-1">
                  {practice.description}
                </p>
                <p className="font-body text-sage text-sm italic mb-4">{practice.whyForYou}</p>
                <a
                  href={communityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto font-body text-sm text-muted-gold hover:text-muted-gold/80 transition-colors"
                >
                  Access in Community &rarr;
                </a>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* Section 6.5: Open Loop — Locked Deeper Content */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-16"
        >
          <div className="bg-gradient-to-b from-white/80 to-white/40 rounded-2xl border border-sage/15 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-muted-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <h3 className="font-heading text-lg text-deep-brown">
                  Your Full Recovery Protocol — Available Inside
                </h3>
              </div>
              <p className="font-body text-soft-brown text-sm mb-5">
                This assessment revealed your pattern. Inside the community, you&apos;ll get the specific tools to change it:
              </p>
              <div className="space-y-3">
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
                    <span className="font-body text-charcoal/80 text-sm leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Gradient fade overlay suggesting more content */}
            <div className="h-12 bg-gradient-to-t from-cream/90 to-transparent" />
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* Section 7: Social Proof */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <p className="font-body text-soft-brown text-sm uppercase tracking-widest mb-2">
              From Inside the Community
            </p>
            <p className="font-heading text-xl md:text-2xl text-deep-brown">
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
                className="bg-white/60 rounded-xl p-5 sm:p-6 border border-sage/10"
              >
                <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed italic mb-3">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center">
                    <span className="font-heading text-sage text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-body text-deep-brown text-sm font-medium">— {t.name}</p>
                    <p className="font-body text-soft-brown/70 text-xs">{t.pattern} Pattern</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* Section 8: Value Stack */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-deep-brown mb-2 text-center">
            What You Get Inside
          </h2>
          <p className="font-body text-soft-brown text-center text-sm mb-8">
            Everything your nervous system needs to go from surviving to living.
          </p>

          <div className="space-y-3">
            {communityValueStack.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i, duration: 0.4 }}
                className="flex items-start gap-4 bg-white/60 rounded-xl p-4 sm:p-5 border border-sage/10"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-base sm:text-lg text-deep-brown mb-1">{item.title}</h4>
                  <p className="font-body text-charcoal/70 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* Section 9: The Conversion CTA */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-sage/8 via-sage/5 to-muted-gold/5 rounded-2xl p-6 sm:p-8 md:p-10 text-center border border-sage/15">
            {/* Personalized headline */}
            <p className="font-body text-soft-brown italic text-base sm:text-lg mb-4 max-w-lg mx-auto leading-relaxed">
              {cta.headline}
            </p>
            <p className="font-body text-charcoal/80 text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto">
              {cta.subline}
            </p>

            {/* Price anchor */}
            <div className="mb-6">
              <div className="inline-flex items-baseline gap-1">
                <span className="font-heading text-4xl sm:text-5xl text-deep-brown">$22</span>
                <span className="font-body text-soft-brown text-sm">/month</span>
              </div>
              <p className="font-body text-soft-brown/70 text-xs mt-1">
                Less than a single therapy session. Cancel anytime.
              </p>
            </div>

            {/* Urgency line */}
            <p className="font-body text-charcoal/60 text-xs sm:text-sm mb-6 max-w-md mx-auto italic leading-relaxed">
              {cta.urgencyLine}
            </p>

            {/* CTA Button */}
            <a
              href={communityUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="text-base sm:text-lg px-8 sm:px-10 py-4">
                {cta.buttonText} &rarr;
              </Button>
            </a>

            {/* Micro-copy */}
            <p className="font-body text-soft-brown/50 text-xs mt-4">
              Instant access &middot; Cancel anytime &middot; {socialProofData.memberCount} members inside
            </p>
          </div>
        </motion.section>

        {/* ============================================= */}
        {/* Section 10: Save / Share */}
        {/* ============================================= */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionVariants}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={handleSavePDF} variant="secondary" className="w-full sm:w-auto">
              Save My Results
            </Button>
            <Button onClick={handleShare} variant="secondary" className="w-full sm:w-auto">
              Share
            </Button>
          </div>
          {shareMessage && (
            <p className="text-center mt-3 font-body text-sm text-sage">{shareMessage}</p>
          )}
        </motion.section>

        {/* ============================================= */}
        {/* Footer: Disclaimer */}
        {/* ============================================= */}
        <footer className="text-center border-t border-sage/10 pt-8 pb-20 sm:pb-4">
          <p className="font-body text-xs text-soft-brown/60 leading-relaxed max-w-lg mx-auto mb-3">
            This assessment is for educational and self-awareness purposes only. It is not a clinical
            diagnosis or substitute for professional mental health care.
          </p>
          <p className="font-body text-xs text-soft-brown/40">
            &copy; 2025 Ase Reiki &amp; Hypnotherapy&trade;
          </p>
        </footer>
      </div>
    </div>
  );
}
