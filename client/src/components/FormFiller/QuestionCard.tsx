import { useState } from "react";
import QuestionInput from "./QuestionInput";
import { QuestionEnum } from "../../types/formTypes";
import type { QuestionCardProps } from "../../types/componentTypes";

function QuestionCard({
  id,
  text,
  type,
  options,
  handleAnswer,
}: QuestionCardProps) {
  const [answerValue, setAnswerValue] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAnswerValue([value]);

    if (value.trim()) {
      handleAnswer(id, [value]);
    } else {
      handleAnswer(id, []);
    }
  };

  const handleMultipleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    let updated: string[];

    if (type === QuestionEnum.MULTIPLE_CHOICE) {
      updated = [value];
    } else {
      updated = answerValue.includes(value)
        ? answerValue.filter((item) => item !== value)
        : [...answerValue, value];
    }

    setAnswerValue(updated);
    handleAnswer(id, updated);
  };

  return (
    <div className="question-card flex flex-col gap-4 bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 justify-center mb-4">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h3 className="font-semibold border-b border-gray-400 px-2 py-1">
          {text}
        </h3>
        <QuestionInput
          id={id}
          type={type}
          options={options}
          answerValue={answerValue}
          handleInputChange={handleInputChange}
          handleMultipleChange={handleMultipleChange}
        />
      </div>
    </div>
  );
}

export default QuestionCard;
