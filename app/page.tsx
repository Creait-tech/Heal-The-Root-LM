"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

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
  return (
    <div className="min-h-screen bg-cream">
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
            className="text-sm font-body tracking-[0.3em] uppercase text-muted-gold mb-6"
          >
            Ase Reiki &amp; Hypnotherapy&trade;
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-deep-brown leading-tight mb-6"
          >
            The Identity Your
            <br />
            Nervous System
            <br />
            Is Protecting
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="w-16 h-px bg-muted-gold mx-auto mb-8"
          />

          <motion.p
            variants={fadeUp}
            className="font-body text-lg md:text-xl text-soft-brown max-w-2xl mx-auto mb-4 leading-relaxed italic"
          >
            &ldquo;You are stuck because your nervous system is protecting an identity
            you no longer want.&rdquo;
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-body text-base text-soft-brown/70 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            This assessment will help you discover your regulation pattern, core
            wound, and survival identity — and give you a clear path forward.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Button
              variant="primary"
              className="text-base px-10 py-4"
              onClick={() => router.push("/learn/1")}
            >
              Begin Your Journey &rarr;
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-deep-brown mb-4">
              What You&apos;ll Discover
            </h2>
            <div className="w-12 h-px bg-muted-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Your Regulation Pattern",
                description:
                  "Understand your nervous system's default survival state — fight/flight, freeze, or a blend — and whether learned patterns like people-pleasing are part of the picture.",
                icon: (
                  <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                ),
              },
              {
                title: "Your Core Wound",
                description:
                  "Identify the deeper wound your system keeps circling back to — scarcity, abandonment, unworthiness, control, or burnout.",
                icon: (
                  <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                ),
              },
              {
                title: "Your Survival Identity",
                description:
                  "Meet the version of you that your nervous system built to survive — and learn how to release it so you can become who you actually are.",
                icon: (
                  <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
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
                <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                  {card.icon}
                </div>
                <h3 className="font-heading text-xl text-deep-brown mb-3">
                  {card.title}
                </h3>
                <p className="font-body text-soft-brown text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-deep-brown mb-4">
              How It Works
            </h2>
            <div className="w-12 h-px bg-muted-gold mx-auto mb-12" />
          </motion.div>

          <div className="space-y-8 text-left">
            {[
              {
                step: "01",
                title: "Learn",
                desc: "Three short educational modules that explain how your nervous system, identity, and wounds work together.",
              },
              {
                step: "02",
                title: "Assess",
                desc: "A 24-question assessment that reveals your unique regulation pattern, core wound, and survival identity.",
              },
              {
                step: "03",
                title: "Receive",
                desc: "A personalized nervous system profile with specific practices designed for your pattern.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-6"
              >
                <span className="text-4xl font-heading text-muted-gold/30 flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-heading text-xl text-deep-brown mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-soft-brown text-sm leading-relaxed">
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
            className="mt-14"
          >
            <Button
              variant="secondary"
              className="text-base"
              onClick={() => router.push("/learn/1")}
            >
              Start Now &rarr;
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-sage/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-body text-xs text-soft-brown/60">
            &copy; 2025 Ase Reiki &amp; Hypnotherapy&trade; &mdash; All Rights
            Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
