"use client";

import type { Question, Answer, ScenarioAnswer, SliderAnswer, OpenEndedAnswer } from "@/lib/types";
import ScenarioQuestion from "./ScenarioQuestion";
import SliderQuestion from "./SliderQuestion";
import OpenEndedQuestion from "./OpenEndedQuestion";

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
    case "slider":
      return (
        <SliderQuestion
          question={question}
          answer={answer as SliderAnswer | undefined}
          onAnswer={onAnswer}
        />
      );
    case "open-ended":
      return (
        <OpenEndedQuestion
          question={question}
          answer={answer as OpenEndedAnswer | undefined}
          onAnswer={onAnswer}
        />
      );
    default:
      return null;
  }
}
