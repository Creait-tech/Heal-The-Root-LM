"use client";

import { motion } from "framer-motion";
import Slider from "../ui/Slider";
import type {
  IdentitySliderQuestion,
  NSSliderQuestion,
  SliderAnswer,
} from "@/lib/types";
import { SLIDER_LABELS } from "@/lib/types";

interface SliderQuestionProps {
  question: IdentitySliderQuestion | NSSliderQuestion;
  answer?: SliderAnswer;
  onAnswer: (answer: SliderAnswer) => void;
}

export default function SliderQuestion({
  question,
  answer,
  onAnswer,
}: SliderQuestionProps) {
  const currentValue = answer?.value ?? 0;

  const handleChange = (value: number) => {
    onAnswer({
      questionId: question.id,
      type: question.type,
      value,
    });
  };

  const statement =
    question.type === "identity-slider" ? question.statement : question.statement;

  const subtitle =
    question.type === "identity-slider"
      ? "Rate how strongly this resonates daily."
      : "Rate how often your body does this — not how you think about it.";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-charcoal dark:text-dark-text font-heading text-lg sm:text-xl mb-2 text-center"
      >
        {statement}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="text-soft-brown dark:text-dark-muted font-body text-sm text-center mb-10"
      >
        {subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="px-2 sm:px-4"
      >
        {/* Current value display */}
        <div className="text-center mb-4">
          <span className="font-heading text-3xl text-muted-gold">
            {currentValue}
          </span>
        </div>

        <Slider
          value={currentValue}
          onChange={handleChange}
          minLabel="Not me"
          maxLabel="Me always"
          min={0}
          max={5}
        />

        {/* Label for current value */}
        <p className="text-center mt-4 font-body text-charcoal dark:text-dark-text font-medium text-sm">
          {SLIDER_LABELS[currentValue] ?? ""}
        </p>
      </motion.div>
    </div>
  );
}
