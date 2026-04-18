import { useMemo } from "react";
import type { QuestionMap, ResponseCardProps } from "../types/componentTypes";

function ResponseCard({
  responseNumber,
  questions,
  answers,
}: ResponseCardProps) {
  //Creating a question Map to get the question values based on questionId from answers - using Memo to avoid unnecessary creation if questions are the same
  const questionMap: QuestionMap = useMemo(() => {
    if (questions.length === 0) return {};

    return Object.fromEntries(questions.map((q) => [q.id, q]));
  }, [questions]);

  return (
    <div className="response-card flex flex-col p-4 gap-4 bg-gray-300 text-center rounded-xl text-lg">
      <h1 className="font-bold text-xl">Response # {responseNumber + 1}</h1>
      {answers.map((a) => (
        <div key={a.questionId} className="bg-gray-400 rounded-xl py-2">
          <h2>
            <span className="font-semibold">Question:</span>{" "}
            {/* Fallback for questions that cant be found to avoid undefined */}
            {questionMap[a.questionId]?.text || "Unknown question"}
          </h2>
          <h2>
            <span className="font-semibold">Answer:</span>{" "}
            {a.value.length === 1 ? a.value[0] : a.value.join(", ")}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ResponseCard;
