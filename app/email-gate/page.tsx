'use client';

import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import {
  IDENTITY_DISPLAY_NAMES,
  NS_SHORT_NAMES,
} from '@/lib/types';
import { trackEvent } from '@/lib/analytics';

export default function EmailGatePage() {
  const router = useRouter();
  const { scoringResult, answers, sessionId, assessmentStartedAt, setUserInfo, setQuizResultId } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});

  useEffect(() => {
    setMounted(true);
    trackEvent('email_gate_view');
  }, []);

  useEffect(() => {
    if (mounted && !scoringResult) {
      router.push('/assessment');
    }
  }, [mounted, scoringResult, router]);

  if (!mounted || !scoringResult) {
    return null;
  }

  const identityName = IDENTITY_DISPLAY_NAMES[scoringResult.primary.type];
  const nsName = NS_SHORT_NAMES[scoringResult.dominantNSState];

  const validate = (): boolean => {
    const newErrors: { firstName?: string; email?: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    trackEvent('email_submit');

    // Store user info
    setUserInfo({ firstName: firstName.trim(), email: email.trim() });

    // Calculate completion time
    const completionTimeS = assessmentStartedAt
      ? Math.round((Date.now() - new Date(assessmentStartedAt).getTime()) / 1000)
      : null;

    // Detect device type
    const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';

    // Submit to API (non-blocking — navigate immediately)
    fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.trim(),
        email: email.trim(),
        answers,
        scoringResult,
        sessionId,
        deviceType,
        completionTimeS,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) setQuizResultId(data.id);
      })
      .catch((err) => console.error('Quiz submit error:', err));

    // Navigate to results
    router.push('/results');
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg flex items-center justify-center px-4 py-12 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-2xl shadow-soft dark:shadow-dark-soft p-6 sm:p-8 md:p-10 border border-sage/10 dark:border-dark-border">
          {/* Results teaser */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-6"
          >
            <p className="font-body text-soft-brown/70 dark:text-dark-muted text-xs uppercase tracking-widest mb-3">
              Assessment Complete
            </p>
            <h1 className="font-heading text-2xl sm:text-3xl text-deep-brown dark:text-dark-text mb-2">
              Your results are ready.
            </h1>

            {/* Blurred teaser of their result */}
            <div className="relative bg-sage/5 dark:bg-dark-surface rounded-xl p-4 mt-4 mb-2 border border-sage/10 dark:border-dark-border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-muted-gold animate-pulse" />
                <span className="font-body text-xs text-muted-gold font-medium uppercase tracking-wider">
                  Profile Detected
                </span>
              </div>
              {/* Partially revealed identity */}
              <p className="font-heading text-lg text-deep-brown/80 dark:text-dark-text/80">
                {identityName}
              </p>
              <p className="font-body text-soft-brown dark:text-dark-muted text-xs mt-1">
                {nsName} Pattern
              </p>
              {/* Blurred overlay on what's below */}
              <div className="mt-3 space-y-1.5">
                <div className="h-2.5 bg-sage/10 dark:bg-dark-border rounded-full w-full" />
                <div className="h-2.5 bg-sage/10 dark:bg-dark-border rounded-full w-4/5" />
                <div className="h-2.5 bg-sage/10 dark:bg-dark-border rounded-full w-3/5" />
              </div>
              <p className="font-body text-soft-brown/60 dark:text-dark-muted/80 text-xs mt-3 italic">
                Full profile, nervous system map, and healing pathway inside...
              </p>
            </div>
          </motion.div>

          <p className="font-body text-soft-brown dark:text-dark-muted text-center mb-5 text-sm leading-relaxed">
            Enter your information to unlock your full Survival Identity Profile and personalized healing pathway.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block font-body text-sm text-charcoal dark:text-dark-text mb-1.5">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
                }}
                placeholder="Your first name"
                className="w-full bg-white/60 dark:bg-dark-surface border border-sage/20 dark:border-dark-border rounded-lg px-4 py-3 font-body text-charcoal dark:text-dark-text placeholder:text-soft-brown/40 dark:placeholder:text-dark-muted/50 focus:outline-none focus:ring-2 focus:ring-muted-gold/50 focus:border-muted-gold transition-colors"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-body">{errors.firstName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-body text-sm text-charcoal dark:text-dark-text mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="you@email.com"
                className="w-full bg-white/60 dark:bg-dark-surface border border-sage/20 dark:border-dark-border rounded-lg px-4 py-3 font-body text-charcoal dark:text-dark-text placeholder:text-soft-brown/40 dark:placeholder:text-dark-muted/50 focus:outline-none focus:ring-2 focus:ring-muted-gold/50 focus:border-muted-gold transition-colors"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-body">{errors.email}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              loading={loading}
              className="w-full mt-2"
            >
              Unlock My Full Profile &rarr;
            </Button>
          </form>

          {/* Privacy Text */}
          <p className="mt-5 text-center text-xs text-soft-brown/60 dark:text-dark-muted/70 font-body leading-relaxed">
            Your information is secure and will never be shared. We only use it to deliver your personalized results.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
