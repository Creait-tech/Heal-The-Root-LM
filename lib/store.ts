'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AppState, Answer, UserInfo, ScoringResult } from './types';

interface AppActions {
  markPartComplete: (partId: number) => void;
  isPartUnlocked: (partId: number) => boolean;
  isAllPartsComplete: () => boolean;
  setAnswer: (answer: Answer) => void;
  getAnswer: (questionId: string) => Answer | undefined;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  setUserInfo: (info: UserInfo) => void;
  setScoringResult: (result: ScoringResult) => void;
  setQuizResultId: (id: string) => void;
  startAssessment: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
  resetAll: () => void;
}

type AppStore = AppState & AppActions;

const generateSessionId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const initialState: AppState = {
  completedParts: [],
  currentQuestionIndex: 0,
  answers: [],
  userInfo: null,
  scoringResult: null,
  assessmentStartedAt: null,
  assessmentCompletedAt: null,
  sessionId: null,
  quizResultId: null,
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

      setQuizResultId: (id) => set({ quizResultId: id }),

      startAssessment: () =>
        set({
          assessmentStartedAt: new Date().toISOString(),
          sessionId: generateSessionId(),
        }),

      completeAssessment: () =>
        set({ assessmentCompletedAt: new Date().toISOString() }),

      resetAssessment: () =>
        set({
          currentQuestionIndex: 0,
          answers: [],
          scoringResult: null,
          assessmentStartedAt: null,
          assessmentCompletedAt: null,
          sessionId: null,
          quizResultId: null,
        }),

      resetAll: () => set(initialState),
    }),
    {
      name: 'heal-the-root-store',
      storage: createJSONStorage(() => localStorage),
      version: 2,
      migrate: (persisted, version) => {
        if (version < 2) {
          const state = persisted as AppState;
          return {
            ...state,
            sessionId: null,
            quizResultId: null,
          };
        }
        return persisted as AppState;
      },
    }
  )
);
