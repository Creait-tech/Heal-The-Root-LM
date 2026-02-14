"use client";

import type { Question, Answer, ScenarioAnswer, SliderAnswer } from "@/lib/types";
import ScenarioQuestion from "./ScenarioQuestion";
import SliderQuestion from "./SliderQuestion";

interface QuestionRendererProps {
  question: Question;
  answer?: Answer;
  onAnswer: (answer: Answer) => void;
}

export default function QuestionRenderer({
  question,
  answer,
  onAnswer,
}: QuestionRendererProps) {
  switch (question.type) {
    case "scenario":
      return (
        <ScenarioQuestion
          question={question}
          answer={answer as ScenarioAnswer | undefined}
          onAnswer={onAnswer}
        />
      );
    case "identity-slider":
    case "ns-slider":
      return (
        <SliderQuestion
          question={question}
          answer={answer as SliderAnswer | undefined}
          onAnswer={onAnswer}
        />
      );
    default:
      return null;
  }
}
