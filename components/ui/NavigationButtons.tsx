"use client";

import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  showBack?: boolean;
  showNext?: boolean;
  showSubmit?: boolean;
  nextDisabled?: boolean;
  submitDisabled?: boolean;
  submitLoading?: boolean;
  className?: string;
}

export default function NavigationButtons({
  onBack,
  onNext,
  onSubmit,
  showBack = true,
  showNext = true,
  showSubmit = false,
  nextDisabled = false,
  submitDisabled = false,
  submitLoading = false,
  className = "",
}: NavigationButtonsProps) {
  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <div className="min-w-[70px]">
        <AnimatePresence mode="wait">
          {showBack && (
            <motion.button
              key="back"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              onClick={onBack}
              className="text-soft-brown font-body text-sm hover:text-charcoal transition-colors
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-gold
                         rounded px-3 py-2"
              aria-label="Go to previous question"
            >
              <span className="mr-1">&larr;</span> Back
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <div>
        <AnimatePresence mode="wait">
          {showNext && !showSubmit && (
            <motion.div
              key="next"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Button onClick={onNext} disabled={nextDisabled}>
                Continue <span className="ml-1">&rarr;</span>
              </Button>
            </motion.div>
          )}
          {showSubmit && (
            <motion.div
              key="submit"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
            >
              <Button onClick={onSubmit} disabled={submitDisabled} loading={submitLoading}>
                See My Results <span className="ml-1">&rarr;</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
