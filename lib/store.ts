'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AppState, Answer, UserInfo, ScoringResult } from './types';

interface AppActions {
  markPartComplete: (partId: number) => void;
  isPartUnlocked: (partId: number) => boolean;
  isAllPartsComplete: () => boolean;
  setAnswer: (answer: Answer) => void;
  getAnswer: (questionId: number) => Answer | undefined;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  setUserInfo: (info: UserInfo) => void;
  setScoringResult: (result: ScoringResult) => void;
  startAssessment: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
  resetAll: () => void;
}

type AppStore = AppState & AppActions;

const initialState: AppState = {
  completedParts: [],
  currentQuestionIndex: 0,
  answers: [],
  userInfo: null,
  scoringResult: null,
  assessmentStartedAt: null,
  assessmentCompletedAt: null,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      markPartComplete: (partId) =>
        set((state) => ({
          completedParts: state.completedParts.includes(partId)
            ? state.completedParts
            : [...state.completedParts, partId].sort(),
        })),

      isPartUnlocked: (partId) => {
        if (partId === 1) return true;
        return get().completedParts.includes(partId - 1);
      },

      isAllPartsComplete: () => {
        const parts = get().completedParts;
        return parts.includes(1) && parts.includes(2) && parts.includes(3);
      },

      setAnswer: (answer) =>
        set((state) => {
          const newAnswers = [...state.answers];
          const idx = newAnswers.findIndex((a) => a.questionId === answer.questionId);
          if (idx >= 0) {
            newAnswers[idx] = answer;
          } else {
            newAnswers.push(answer);
          }
          return { answers: newAnswers };
        }),

      getAnswer: (questionId) => {
        return get().answers.find((a) => a.questionId === questionId);
      },

      goToQuestion: (index) => set({ currentQuestionIndex: index }),

      nextQuestion: () =>
        set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),

      prevQuestion: () =>
        set((state) => ({ currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1) })),

      setUserInfo: (info) => set({ userInfo: info }),

      setScoringResult: (result) => set({ scoringResult: result }),

      startAssessment: () =>
        set({ assessmentStartedAt: new Date().toISOString() }),

      completeAssessment: () =>
        set({ assessmentCompletedAt: new Date().toISOString() }),

      resetAssessment: () =>
        set({
          currentQuestionIndex: 0,
          answers: [],
          scoringResult: null,
          assessmentStartedAt: null,
          assessmentCompletedAt: null,
        }),

      resetAll: () => set(initialState),
    }),
    {
      name: 'heal-the-root-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
