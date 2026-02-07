"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { QuestionType } from "@/lib/types";

interface QuestionCounterProps {
  current: number;
  total: number;
  type?: QuestionType;
  className?: string;
}

const typeBadge: Record<QuestionType, string> = {
  scenario: "Scenario",
  slider: "Scale",
  "open-ended": "Reflection",
};

export default function QuestionCounter({
  current,
  total,
  type,
  className = "",
}: QuestionCounterProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-2">
        <span className="font-body text-xs sm:text-sm text-soft-brown">Question</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="font-body text-xs sm:text-sm font-semibold text-charcoal"
          >
            {current}
          </motion.span>
        </AnimatePresence>
        <span className="font-body text-xs sm:text-sm text-soft-brown">of {total}</span>
      </div>

      {type && (
        <AnimatePresence mode="wait">
          <motion.span
            key={type}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-body text-sage bg-sage/10 px-2.5 py-1 rounded-full"
          >
            {typeBadge[type]}
          </motion.span>
        </AnimatePresence>
      )}
    </div>
  );
}
