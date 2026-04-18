import type { QuestionInputProps } from "../../types/componentTypes";
import { QuestionEnum } from "../../types/formTypes";

function QuestionInput({
  id,
  type,
  options,
  answerValue,
  handleInputChange,
  handleMultipleChange,
}: QuestionInputProps) {
  return (
    <div className="flex gap-4 flex-col  justify-center p-4">
      {type === QuestionEnum.TEXT && (
        <div className="flex gap-2 items-center">
          <label htmlFor={`answer-input-${id}`} className="font-semibold">
            Enter your answer:
          </label>
          <input
            id={`answer-input-${id}`}
            type="text"
            className="bg-white rounded-lg border border-gray-400 p-2 ps-3"
            value={answerValue[0] || ""}
            onChange={handleInputChange}
          />
        </div>
      )}

      {type === QuestionEnum.DATE && (
        <div className="flex gap-2 items-center">
          <label htmlFor={`answer-input-${id}`} className="font-semibold">
            Enter your answer:
          </label>
          <input
            id={`answer-input-${id}`}
            type="date"
            className="bg-white rounded-lg border border-gray-400 p-2 ps-3"
            value={answerValue[0] || ""}
            onChange={handleInputChange}
          />
        </div>
      )}

      {type === QuestionEnum.MULTIPLE_CHOICE &&
        (options ?? []).map((option: string, index: number) => (
          <div
            key={`option-${id}-${index}`}
            className="flex gap-2 items-center"
          >
            <input
              type="radio"
              name={`question-${id}`}
              value={option}
              id={`option-${id}-${index}`}
              checked={answerValue.includes(option)}
              onChange={handleMultipleChange}
            ></input>
            <label htmlFor={`option-${id}-${index}`}>{option}</label>
          </div>
        ))}

      {type === QuestionEnum.CHECKBOX &&
        (options ?? []).map((option: string, index: number) => (
          <div
            key={`option-${id}-${index}`}
            className="flex gap-2 items-center"
          >
            <input
              type="checkbox"
              name={`question-${id}`}
              value={option}
              id={`option-${id}-${index}`}
              checked={answerValue.includes(option)}
              onChange={handleMultipleChange}
            ></input>
            <label htmlFor={`option-${id}-${index}`}>{option}</label>
          </div>
        ))}
    </div>
  );
}

export default QuestionInput;
