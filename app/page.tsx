"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { trackEvent } from "@/lib/analytics";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    trackEvent('page_view_landing');
  }, []);

  const handleCTAClick = () => {
    trackEvent('cta_click_start');
    router.push("/assessment");
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg transition-colors duration-300">
      <ThemeToggle />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-body tracking-[0.35em] uppercase text-muted-gold mb-7 font-medium"
          >
            Ase Reiki &amp; Hypnotherapy&trade;
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-[clamp(34px,7vw,60px)] text-deep-brown dark:text-dark-text leading-[1.12] mb-5"
          >
            The Survival
            <br />
            Identity Test
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="w-12 h-px bg-muted-gold/50 mx-auto my-5"
          />

          <motion.p
            variants={fadeUp}
            className="font-heading text-lg md:text-xl text-soft-brown dark:text-dark-text/80 max-w-[540px] mx-auto mb-3 leading-relaxed italic"
          >
            Find out which version of you your nervous system is protecting &mdash; and why it&apos;s blocking your next level.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-body text-sm text-soft-brown/70 dark:text-dark-muted max-w-[480px] mx-auto mb-11 leading-relaxed"
          >
            For high-functioning humans ready to stop surviving their own success.
          </motion.p>

          {/* Video Placeholder */}
          <motion.div
            variants={fadeUp}
            className="w-full max-w-[600px] mx-auto mb-12 aspect-video rounded-xl bg-white/40 dark:bg-dark-surface border border-sage/10 dark:border-dark-border flex items-center justify-center"
          >
            <div className="text-center text-soft-brown/60 dark:text-dark-muted">
              <div className="text-4xl mb-1.5 opacity-50">&#9654;</div>
              <p className="text-xs font-body">Video coming soon</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Button
              variant="primary"
              className="text-base px-10 py-4"
              onClick={handleCTAClick}
            >
              Take The Test &rarr;
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* What You'll Walk Away With */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white/40 dark:bg-dark-surface/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-deep-brown dark:text-dark-text mb-4">
              What You&apos;ll Walk Away With
            </h2>
            <div className="w-12 h-px bg-muted-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Your Clear Identity + Regulation Profile",
                description:
                  "Understand exactly what patterns formed your identity, the dysregulation flavor keeping you stuck in the loop, and why nothing has fully worked until now.",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="18" cy="12" r="5" />
                    <path d="M8 30c0-5.5 4.5-10 10-10s10 4.5 10 10" />
                    <line x1="30" y1="8" x2="30" y2="16" opacity="0.5" />
                    <line x1="26" y1="12" x2="34" y2="12" opacity="0.5" />
                  </svg>
                ),
              },
              {
                title: "How It's Showing Up + What It's Costing You",
                description:
                  "See how this pattern plays out in your relationships, your energy, your decisions \u2014 and what it would feel like to finally carry your strengths without the weight.",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="6" y="4" rx="2" width="24" height="28" />
                    <line x1="18" y1="4" x2="18" y2="32" strokeDasharray="2 2" opacity="0.4" />
                    <circle cx="13" cy="14" r="2" />
                    <circle cx="23" cy="14" r="2" />
                    <path d="M10 22c1.5 2 3.5 3 5 3" />
                    <path d="M26 22c-1.5 2-3.5 3-5 3" />
                  </svg>
                ),
              },
              {
                title: "Your Tools + The Regulated Version of You",
                description:
                  "You don't lose what you love about yourself. You update how your body carries it \u2014 plus get access to the exact meditation and somatic tools that make the shift real.",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M6 24C10 24 12 12 18 12S26 24 30 24" />
                    <circle cx="18" cy="12" r="2" fill="currentColor" opacity="0.3" />
                    <path d="M16 28l2-3 2 3" opacity="0.6" />
                    <line x1="18" y1="25" x2="18" y2="32" opacity="0.4" />
                  </svg>
                ),
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="card text-center"
              >
                <div className="w-14 h-14 rounded-full bg-sage/10 dark:bg-dark-sage/20 flex items-center justify-center mx-auto mb-4 text-muted-gold">
                  {card.icon}
                </div>
                <h3 className="font-heading text-lg text-deep-brown dark:text-dark-text mb-3">
                  {card.title}
                </h3>
                <p className="font-body text-soft-brown dark:text-dark-muted text-[13px] leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[520px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-deep-brown dark:text-dark-text mb-4">
              How It Works
            </h2>
            <div className="w-12 h-px bg-muted-gold mx-auto mb-8" />
          </motion.div>

          <div className="space-y-6 text-left">
            {[
              {
                step: "01",
                title: "Respond",
                desc: "10 real-life scenarios. Pick the one that feels most like you \u2014 not the one you think is right.",
              },
              {
                step: "02",
                title: "Rate",
                desc: "14 body-based statements about your nervous system and identity patterns. No overthinking.",
              },
              {
                step: "03",
                title: "Receive",
                desc: "A personalized profile showing your identity pattern, nervous system state, and the exact tools to start updating the loop.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-5"
              >
                <span className="text-3xl font-heading text-muted-gold/30 dark:text-muted-gold/20 flex-shrink-0 min-w-[40px]">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-heading text-xl text-deep-brown dark:text-dark-text mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-soft-brown dark:text-dark-muted text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button
              variant="secondary"
              className="text-base"
              onClick={handleCTAClick}
            >
              Start Now &rarr;
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-sage/10 dark:border-dark-border">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-body text-xs text-soft-brown/60 dark:text-dark-muted">
            &copy; 2025 Ase Reiki &amp; Hypnotherapy&trade; &mdash; All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
