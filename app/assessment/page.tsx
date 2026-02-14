"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { questions, TOTAL_QUESTIONS } from "@/lib/questions";
import { calculateResults } from "@/lib/scoring";
import type { Answer } from "@/lib/types";
import QuestionRenderer from "@/components/assessment/QuestionRenderer";
import ProgressBar from "@/components/ui/ProgressBar";
import QuestionCounter from "@/components/ui/QuestionCounter";
import NavigationButtons from "@/components/ui/NavigationButtons";
import { trackEvent } from "@/lib/analytics";

export default function AssessmentPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState(1);

  const currentQuestionIndex = useAppStore((s) => s.currentQuestionIndex);
  const answers = useAppStore((s) => s.answers);
  const setAnswer = useAppStore((s) => s.setAnswer);
  const getAnswer = useAppStore((s) => s.getAnswer);
  const nextQuestion = useAppStore((s) => s.nextQuestion);
  const prevQuestion = useAppStore((s) => s.prevQuestion);
  const startAssessment = useAppStore((s) => s.startAssessment);
  const completeAssessment = useAppStore((s) => s.completeAssessment);
  const setScoringResult = useAppStore((s) => s.setScoringResult);
  const assessmentStartedAt = useAppStore((s) => s.assessmentStartedAt);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Start assessment timer on mount (if not already started)
  useEffect(() => {
    if (!mounted) return;
    if (!assessmentStartedAt) {
      startAssessment();
      trackEvent('quiz_start');
    }
  }, [mounted, assessmentStartedAt, startAssessment]);

  // Track quiz abandon on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      trackEvent('quiz_abandon', { questionIndex: currentQuestionIndex, answeredCount: answers.length });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentQuestionIndex, answers.length]);

  // Loading skeleton
  if (!mounted) {
    return (
      <div className="min-h-screen bg-cream dark:bg-dark-bg">
        <div className="max-w-2xl mx-auto px-6 py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-2 bg-sage/10 dark:bg-dark-border rounded w-full" />
            <div className="h-4 bg-sage/10 dark:bg-dark-border rounded w-1/3" />
            <div className="h-6 bg-sage/10 dark:bg-dark-border rounded w-3/4 mt-10" />
            <div className="space-y-3 mt-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-14 bg-sage/5 dark:bg-dark-card rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null;

  const currentAnswer = getAnswer(currentQuestion.id);

  const isLastQuestion = currentQuestionIndex === TOTAL_QUESTIONS - 1;

  // Determine if the current question is required and answered
  function isCurrentQuestionAnswered(): boolean {
    if (!currentQuestion) return false;

    switch (currentQuestion.type) {
      case "scenario": {
        if (!currentAnswer) return false;
        return currentAnswer.type === "scenario" && !!currentAnswer.selectedIdentity;
      }
      case "identity-slider":
      case "ns-slider": {
        if (!currentAnswer) return false;
        return (
          (currentAnswer.type === "identity-slider" || currentAnswer.type === "ns-slider") &&
          currentAnswer.value !== undefined
        );
      }
      default:
        return true;
    }
  }

  function handleAnswer(answer: Answer) {
    setAnswer(answer);
    trackEvent('question_answer', {
      questionId: answer.questionId,
      questionIndex: currentQuestionIndex,
      questionType: answer.type,
    });
  }

  function handleNext() {
    if (!isCurrentQuestionAnswered()) return;
    setDirection(1);
    nextQuestion();
  }

  function handleBack() {
    setDirection(-1);
    prevQuestion();
  }

  function handleSubmit() {
    if (!isCurrentQuestionAnswered()) return;

    // Complete the assessment
    completeAssessment();

    // Calculate scoring
    const result = calculateResults(answers);
    setScoringResult(result);

    trackEvent('quiz_complete', {
      primaryIdentity: result.primary.type,
      dominantNS: result.dominantNSState,
      combinationKey: result.combinationKey,
    });

    // Navigate to email gate
    router.push("/email-gate");
  }

  const answered = isCurrentQuestionAnswered();

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg flex flex-col">
      {/* Top bar: Progress + Counter */}
      <div className="sticky top-0 z-10 bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-sm border-b border-sage/10 dark:border-dark-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3">
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={TOTAL_QUESTIONS}
          />
          <QuestionCounter
            current={currentQuestionIndex + 1}
            total={TOTAL_QUESTIONS}
            type={currentQuestion.type}
          />
        </div>
      </div>

      {/* Main question area */}
      <div className="flex-1 flex flex-col justify-center max-w-2xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <QuestionRenderer
              question={currentQuestion}
              answer={currentAnswer}
              onAnswer={handleAnswer}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 z-10 bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-sm border-t border-sage/10 dark:border-dark-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
          <NavigationButtons
            onBack={handleBack}
            onNext={handleNext}
            onSubmit={handleSubmit}
            showBack={currentQuestionIndex > 0}
            showNext={!isLastQuestion}
            showSubmit={isLastQuestion}
            nextDisabled={!answered}
            submitDisabled={!answered}
          />
        </div>
      </div>
    </div>
  );
}
