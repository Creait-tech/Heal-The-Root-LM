"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TextArea from "../ui/TextArea";
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
  const [openEndedText, setOpenEndedText] = useState(answer?.openEndedText || "");

  const handleSelect = (label: string) => {
    onAnswer({
      questionId: question.id,
      type: "scenario",
      selectedOption: label,
      openEndedText: label === "D" ? openEndedText : undefined,
    });
  };

  const handleOpenEndedChange = (text: string) => {
    setOpenEndedText(text);
    if (answer?.selectedOption === "D") {
      onAnswer({
        questionId: question.id,
        type: "scenario",
        selectedOption: "D",
        openEndedText: text,
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Scenario */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-4 px-4 py-3 bg-sage/5 rounded-lg border border-sage/10"
      >
        <p className="text-sm text-soft-brown font-body uppercase tracking-wide mb-1">
          Scenario
        </p>
        <p className="text-charcoal font-body text-base sm:text-lg">{question.scenario}</p>
      </motion.div>

      {/* Prompt */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="text-charcoal font-heading text-lg sm:text-xl mb-6 italic"
      >
        &ldquo;{question.prompt}&rdquo;
      </motion.p>

      {/* Options */}
      <div className="space-y-3" role="radiogroup" aria-label={question.scenario}>
        {question.options.map((option, i) => {
          const isSelected = answer?.selectedOption === option.label;
          return (
            <motion.button
              key={option.label}
              custom={i}
              variants={optionVariants}
              initial="hidden"
              animate="visible"
              onClick={() => handleSelect(option.label)}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-colors duration-200
                         font-body text-sm sm:text-base flex items-start gap-3
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-gold
                         ${
                           isSelected
                             ? "border-muted-gold bg-muted-gold/5 text-charcoal shadow-sm"
                             : "border-sage/10 bg-white/40 text-charcoal/80 hover:border-sage/30 hover:bg-white/60"
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
                               : "border-sage/30 text-soft-brown"
                           }`}
              >
                {option.label}
              </motion.span>
              <span className="flex-1">{option.text}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Open-ended text field for option D */}
      {answer?.selectedOption === "D" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <TextArea
            value={openEndedText}
            onChange={(e) => handleOpenEndedChange(e.target.value)}
            placeholder="Tell us what comes up for you..."
          />
        </motion.div>
      )}
    </div>
  );
}
