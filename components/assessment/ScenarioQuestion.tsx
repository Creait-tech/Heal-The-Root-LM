"use client";

import { motion } from "framer-motion";
import type { ScenarioQuestion as ScenarioQuestionType, ScenarioAnswer } from "@/lib/types";

const optionVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.35, ease: "easeOut" as const },
  }),
};

interface ScenarioQuestionProps {
  question: ScenarioQuestionType;
  answer?: ScenarioAnswer;
  onAnswer: (answer: ScenarioAnswer) => void;
}

export default function ScenarioQuestion({
  question,
  answer,
  onAnswer,
}: ScenarioQuestionProps) {
  const handleSelect = (optionIndex: number) => {
    const option = question.options[optionIndex];
    onAnswer({
      questionId: question.id,
      type: "scenario",
      selectedIdentity: option.maps,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Prompt */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-charcoal dark:text-dark-text font-heading text-lg sm:text-xl mb-6 text-center"
      >
        {question.prompt}
      </motion.p>

      {/* Options */}
      <div className="space-y-3" role="radiogroup" aria-label={question.prompt}>
        {question.options.map((option, i) => {
          const isSelected = answer?.selectedIdentity === option.maps;
          const label = String.fromCharCode(65 + i); // A, B, C, D, E
          return (
            <motion.button
              key={i}
              custom={i}
              variants={optionVariants}
              initial="hidden"
              animate="visible"
              onClick={() => handleSelect(i)}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-colors duration-200
                         font-body text-sm sm:text-base flex items-start gap-3
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-gold
                         ${
                           isSelected
                             ? "border-muted-gold bg-muted-gold/5 dark:bg-muted-gold/10 text-charcoal dark:text-dark-text shadow-sm"
                             : "border-sage/10 dark:border-dark-border bg-white/40 dark:bg-dark-surface/40 text-charcoal/80 dark:text-dark-text/80 hover:border-sage/30 dark:hover:border-dark-border hover:bg-white/60 dark:hover:bg-dark-surface/60"
                         }`}
              role="radio"
              aria-checked={isSelected}
            >
              <motion.span
                animate={isSelected ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-medium mt-0.5
                           ${
                             isSelected
                               ? "border-muted-gold bg-muted-gold text-cream"
                               : "border-sage/30 dark:border-dark-border text-soft-brown dark:text-dark-muted"
                           }`}
              >
                {label}
              </motion.span>
              <span className="flex-1">{option.text}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
