"use client";

import { motion } from "framer-motion";
import TextArea from "../ui/TextArea";
import type { OpenEndedQuestion as OpenEndedQuestionType, OpenEndedAnswer } from "@/lib/types";

interface OpenEndedQuestionProps {
  question: OpenEndedQuestionType;
  answer?: OpenEndedAnswer;
  onAnswer: (answer: OpenEndedAnswer) => void;
}

export default function OpenEndedQuestion({
  question,
  answer,
  onAnswer,
}: OpenEndedQuestionProps) {
  const handleChange = (text: string) => {
    onAnswer({
      questionId: question.id,
      type: "open-ended",
      text,
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
        className="text-soft-brown font-body text-sm text-center mb-8"
      >
        This is for your reflection only — there are no wrong answers
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <TextArea
          value={answer?.text || ""}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={question.placeholder || "Write what comes to mind..."}
        />
      </motion.div>
    </div>
  );
}
