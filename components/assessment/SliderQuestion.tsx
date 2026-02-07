"use client";

import { motion } from "framer-motion";
import Slider from "../ui/Slider";
import type { SliderQuestion as SliderQuestionType, SliderAnswer } from "@/lib/types";

interface SliderQuestionProps {
  question: SliderQuestionType;
  answer?: SliderAnswer;
  onAnswer: (answer: SliderAnswer) => void;
}

export default function SliderQuestion({
  question,
  answer,
  onAnswer,
}: SliderQuestionProps) {
  const handleChange = (value: number) => {
    onAnswer({
      questionId: question.id,
      type: "slider",
      value,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-charcoal font-heading text-lg sm:text-xl mb-2 text-center"
      >
        {question.prompt}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="text-soft-brown font-body text-sm text-center mb-10"
      >
        Rate how strongly this applies to you
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="px-2 sm:px-4"
      >
        <Slider
          value={answer?.value ?? 5}
          onChange={handleChange}
          minLabel={question.minLabel}
          maxLabel={question.maxLabel}
        />
      </motion.div>
    </div>
  );
}
