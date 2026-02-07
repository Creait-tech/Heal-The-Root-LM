'use client';

import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { identityContent } from '@/lib/results-content';
import type { RegulationPattern } from '@/lib/types';

async function submitToWebhook(data: {
  firstName: string;
  email: string;
  phone: string;
  pattern: string;
  identity: string;
}) {
  // TODO: Replace with your GoHighLevel webhook URL
  const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;
  if (!webhookUrl || webhookUrl === 'YOUR_WEBHOOK_URL_HERE') {
    console.log('Webhook URL not configured. Data:', data);
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: data.firstName,
        email: data.email,
        phone: data.phone,
        regulation_pattern: data.pattern,
        survival_identity: data.identity,
        source: 'heal-the-cycle-assessment',
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Webhook submission failed:', error);
    // Don't block user flow on webhook failure
  }
}

export default function EmailGatePage() {
  const router = useRouter();
  const { scoringResult, setUserInfo } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ firstName?: string; email?: string; phone?: string }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !scoringResult) {
      router.push('/assessment');
    }
  }, [mounted, scoringResult, router]);

  if (!mounted || !scoringResult) {
    return null;
  }

  const patternLabels: Record<RegulationPattern, string> = {
    'fight-flight': 'Fight / Flight',
    freeze: 'Freeze',
    fawn: 'People-Pleasing',
  };

  const identityName = identityContent[scoringResult.survivalIdentity].name;
  const patternName = patternLabels[scoringResult.primaryPattern];

  const validate = (): boolean => {
    const newErrors: { firstName?: string; email?: string; phone?: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    // Store user info
    setUserInfo({ firstName: firstName.trim(), email: email.trim(), phone: phone.trim() });

    // Fire webhook asynchronously (don't await - don't block navigation)
    submitToWebhook({
      firstName: firstName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      pattern: scoringResult.primaryPattern,
      identity: scoringResult.survivalIdentity,
    });

    // Navigate to results
    router.push('/results');
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
          {/* Results teaser */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-6"
          >
            <p className="font-body text-soft-brown/70 text-xs uppercase tracking-widest mb-3">
              Assessment Complete
            </p>
            <h1 className="font-heading text-2xl sm:text-3xl text-deep-brown mb-2">
              Your results are ready.
            </h1>

            {/* Blurred teaser of their result */}
            <div className="relative bg-sage/5 rounded-xl p-4 mt-4 mb-2 border border-sage/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-muted-gold animate-pulse" />
                <span className="font-body text-xs text-muted-gold font-medium uppercase tracking-wider">
                  Profile Detected
                </span>
              </div>
              {/* Partially revealed identity */}
              <p className="font-heading text-lg text-deep-brown/80">
                {identityName}
              </p>
              <p className="font-body text-soft-brown text-xs mt-1">
                {patternName} Pattern
              </p>
              {/* Blurred overlay on what's below */}
              <div className="mt-3 space-y-1.5">
                <div className="h-2.5 bg-sage/10 rounded-full w-full" />
                <div className="h-2.5 bg-sage/10 rounded-full w-4/5" />
                <div className="h-2.5 bg-sage/10 rounded-full w-3/5" />
              </div>
              <p className="font-body text-soft-brown/60 text-xs mt-3 italic">
                Full profile, core wound, and healing pathway inside...
              </p>
            </div>
          </motion.div>

          <p className="font-body text-soft-brown text-center mb-5 text-sm leading-relaxed">
            Enter your information to unlock your full Nervous System Profile and personalized healing pathway.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block font-body text-sm text-charcoal mb-1.5">
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
                className="w-full bg-white/60 border border-sage/20 rounded-lg px-4 py-3 font-body text-charcoal focus:outline-none focus:ring-2 focus:ring-muted-gold/50 focus:border-muted-gold transition-colors"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600 font-body">{errors.firstName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block font-body text-sm text-charcoal mb-1.5">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="(555) 000-0000"
                className="w-full bg-white/60 border border-sage/20 rounded-lg px-4 py-3 font-body text-charcoal focus:outline-none focus:ring-2 focus:ring-muted-gold/50 focus:border-muted-gold transition-colors"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 font-body">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-body text-sm text-charcoal mb-1.5">
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
                className="w-full bg-white/60 border border-sage/20 rounded-lg px-4 py-3 font-body text-charcoal focus:outline-none focus:ring-2 focus:ring-muted-gold/50 focus:border-muted-gold transition-colors"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 font-body">{errors.email}</p>
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
          <p className="mt-5 text-center text-xs text-soft-brown/60 font-body leading-relaxed">
            Your information is secure and will never be shared. We only use it to deliver your personalized results.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
