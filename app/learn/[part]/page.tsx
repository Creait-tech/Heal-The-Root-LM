"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { educationalParts } from "@/lib/educational-content";
import type { ContentSection } from "@/lib/educational-content";
import Button from "@/components/ui/Button";
import VideoPlaceholder from "@/components/ui/VideoPlaceholder";

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

export default function LearnPartPage() {
  const router = useRouter();
  const params = useParams();
  const [mounted, setMounted] = useState(false);

  const completedParts = useAppStore((s) => s.completedParts);
  const markPartComplete = useAppStore((s) => s.markPartComplete);
  const isPartUnlocked = useAppStore((s) => s.isPartUnlocked);
  const isAllPartsComplete = useAppStore((s) => s.isAllPartsComplete);

  const partNumber = Number(params.part);
  const isValidPart = partNumber === 1 || partNumber === 2 || partNumber === 3;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!isValidPart) {
      router.replace("/learn/1");
      return;
    }

    if (!isPartUnlocked(partNumber)) {
      router.replace("/learn/1");
    }
  }, [mounted, isValidPart, partNumber, isPartUnlocked, router]);

  // Loading skeleton for SSR / hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-sage/10 rounded w-full" />
            <div className="h-8 bg-sage/10 rounded w-2/3 mx-auto" />
            <div className="h-4 bg-sage/10 rounded w-1/2 mx-auto" />
            <div className="aspect-video bg-sage/5 rounded-xl" />
            <div className="space-y-4 mt-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-sage/10 rounded"
                  style={{ width: `${80 - i * 8}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isValidPart || !isPartUnlocked(partNumber)) {
    return null; // Will redirect via useEffect
  }

  const partData = educationalParts.find((p) => p.id === partNumber);
  if (!partData) return null;

  const isCompleted = completedParts.includes(partNumber);
  const allComplete = isAllPartsComplete();
  const nextPart = partNumber < 3 ? partNumber + 1 : null;

  function handleMarkComplete() {
    markPartComplete(partNumber);
  }

  function renderSection(section: ContentSection, index: number) {
    switch (section.type) {
      case "heading":
        return (
          <motion.h2
            key={index}
            variants={fadeIn}
            className="font-heading text-2xl md:text-3xl text-deep-brown mt-10 mb-4"
          >
            {section.content}
          </motion.h2>
        );

      case "subheading":
        return (
          <motion.h3
            key={index}
            variants={fadeIn}
            className="font-heading text-xl md:text-2xl text-deep-brown mt-8 mb-3"
          >
            {section.content}
          </motion.h3>
        );

      case "paragraph":
        return (
          <motion.p
            key={index}
            variants={fadeIn}
            className="font-body text-soft-brown leading-relaxed mb-4"
          >
            {section.content}
          </motion.p>
        );

      case "quote":
        return (
          <motion.blockquote
            key={index}
            variants={fadeIn}
            className="border-l-4 border-muted-gold pl-6 py-3 my-6 italic font-body text-deep-brown/80"
          >
            {section.content}
          </motion.blockquote>
        );

      case "list":
        return (
          <motion.div key={index} variants={fadeIn} className="my-4">
            {section.content && (
              <p className="font-body text-soft-brown mb-3">
                {section.content}
              </p>
            )}
            <ul className="space-y-2 ml-1">
              {section.items?.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-gold mt-2.5 flex-shrink-0" />
                  <span className="font-body text-soft-brown leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        );

      case "video-placeholder":
        return (
          <motion.div key={index} variants={fadeIn} className="my-6">
            <VideoPlaceholder title={section.content} />
          </motion.div>
        );

      case "emphasis":
        return (
          <motion.p
            key={index}
            variants={fadeIn}
            className="font-body font-semibold text-deep-brown text-lg my-6 leading-relaxed"
          >
            {section.content}
          </motion.p>
        );

      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Progress Stepper */}
      <div className="sticky top-0 z-10 bg-cream/95 backdrop-blur-sm border-b border-sage/10">
        <div className="max-w-3xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {educationalParts.map((part, index) => {
              const isStepCompleted = completedParts.includes(part.id);
              const isCurrent = part.id === partNumber;
              const isLocked = !isPartUnlocked(part.id);

              return (
                <div key={part.id} className="flex items-center flex-1">
                  {/* Step circle + title */}
                  <button
                    onClick={() => {
                      if (!isLocked) router.push(`/learn/${part.id}`);
                    }}
                    disabled={isLocked}
                    className={`flex items-center gap-2 group transition-colors ${
                      isLocked
                        ? "cursor-not-allowed opacity-40"
                        : "cursor-pointer"
                    }`}
                    aria-label={`Part ${part.id}: ${part.title}${
                      isStepCompleted
                        ? " (completed)"
                        : isCurrent
                        ? " (current)"
                        : isLocked
                        ? " (locked)"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-medium transition-colors ${
                        isStepCompleted
                          ? "bg-sage text-white"
                          : isCurrent
                          ? "bg-muted-gold text-white"
                          : "bg-sage/10 text-soft-brown/50"
                      }`}
                    >
                      {isStepCompleted ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        part.id
                      )}
                    </div>
                    <span
                      className={`text-xs font-body hidden sm:block ${
                        isCurrent
                          ? "text-deep-brown font-medium"
                          : isStepCompleted
                          ? "text-sage"
                          : "text-soft-brown/50"
                      }`}
                    >
                      {part.title}
                    </span>
                  </button>

                  {/* Connector line */}
                  {index < educationalParts.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-3 ${
                        isStepCompleted ? "bg-sage" : "bg-sage/15"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Part header */}
          <motion.div variants={fadeIn} className="text-center mb-10">
            <p className="text-sm font-body tracking-[0.2em] uppercase text-muted-gold mb-3">
              {partData.subtitle}
            </p>
            <h1 className="font-heading text-3xl md:text-4xl text-deep-brown mb-2">
              {partData.title}
            </h1>
            <p className="font-body text-sm text-soft-brown/60">
              {partData.estimatedMinutes} min read
            </p>
          </motion.div>

          {/* Content sections */}
          {partData.sections.map((section, index) =>
            renderSection(section, index)
          )}

          {/* Bottom Actions */}
          <motion.div variants={fadeIn} className="mt-14 mb-8">
            {/* Mark Complete / Completed state */}
            {!isCompleted ? (
              <div className="text-center">
                <Button
                  onClick={handleMarkComplete}
                  variant="primary"
                  className="px-10 py-4 text-base"
                >
                  Mark as Complete
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-sage">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-body font-medium text-sage">
                    Completed
                  </span>
                </div>

                {nextPart && !allComplete && (
                  <Button
                    variant="primary"
                    className="px-8 py-3 text-base"
                    onClick={() => router.push(`/learn/${nextPart}`)}
                  >
                    Continue to Part {nextPart} &rarr;
                  </Button>
                )}

                {partNumber === 3 && !allComplete && (
                  <p className="font-body text-sm text-soft-brown/60">
                    Complete all parts to unlock the assessment.
                  </p>
                )}
              </div>
            )}

            {/* Transition Card: All parts complete */}
            {allComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12 bg-white rounded-2xl shadow-sm border border-sage/10 p-8 md:p-10 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-7 h-7 text-sage"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <h3 className="font-heading text-2xl text-deep-brown mb-3">
                  You&apos;re ready.
                </h3>
                <p className="font-body text-soft-brown mb-2">
                  The assessment is now unlocked.
                </p>
                <p className="font-body text-sm text-soft-brown/60 max-w-md mx-auto mb-8">
                  You&apos;ll answer 24 questions designed to reveal your
                  regulation pattern, core wound, and survival identity. Answer
                  honestly &mdash; your nervous system already knows the truth.
                </p>

                <Button
                  variant="primary"
                  className="px-10 py-4 text-base"
                  onClick={() => router.push("/assessment")}
                >
                  Begin Assessment &rarr;
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
