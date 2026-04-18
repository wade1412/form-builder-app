import { useState } from "react";
import { QuestionEnum } from "../../../types/formTypes";
import type { QuestionItemProps } from "../types";

function QuestionItem({
  id,
  text,
  type,
  options,
  onQuestionTextChange,
  onSelectTypeChange,
  onOptionChange,
  onOptionRemove,
  onOptionAdd,
  onQuestionRemove,
}: QuestionItemProps) {
  const [newOptionText, setNewOptionText] = useState("");

  return (
    <div className="question-item flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <label
          htmlFor={`q-text-${id}`}
          className="border-b border-gray-400 px-2 py-1 font-semibold"
        >
          Question:
        </label>
        <input
          id={`q-text-${id}`}
          className="rounded-lg bg-white p-1 ps-3"
          placeholder="Enter your question..."
          value={text}
          onChange={(e) => onQuestionTextChange(id, e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        <label htmlFor={`q-type-${id}`} className="px-2 py-1 font-semibold">
          Choose a question type:
        </label>
        <select
          className="rounded-lg border border-gray-400 bg-white p-2 text-center font-semibold"
          id={`q-type-${id}`}
          value={type}
          onChange={(e) =>
            onSelectTypeChange(id, e.target.value as QuestionEnum)
          }
        >
          {Object.values(QuestionEnum).map((value) => (
            <option
              key={value}
              value={value}
              className="rounded-lg border border-gray-400 bg-white p-2 text-center"
            >
              {value.charAt(0) + value.replace("_", " ").toLowerCase().slice(1)}
            </option>
          ))}
        </select>
      </div>

      {(type === QuestionEnum.CHECKBOX ||
        type === QuestionEnum.MULTIPLE_CHOICE) && (
        <>
          <div className="options-div flex flex-col gap-4 text-lg">
            {(options ?? []).map((opt, index) => (
              <div key={`${id}-${index}`} className="flex gap-4 px-2">
                <div className="flex items-center gap-4">
                  <label
                    htmlFor={`opt-${id}-${index}`}
                    className="font-semibold"
                  >{`Option ${index + 1} text: `}</label>
                  <input
                    className="rounded-lg border border-gray-400 bg-white p-2 ps-3"
                    id={`opt-${id}-${index}`}
                    type="text"
                    value={opt}
                    onChange={(e) => onOptionChange(id, index, e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="mx-auto rounded-xl bg-gray-500 px-4 py-2 text-lg text-white transition-all hover:-translate-y-1 hover:bg-gray-400"
                    onClick={() => onOptionRemove(id, index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 px-2 py-4">
                <label htmlFor="add-option" className="font-semibold">
                  New option text:
                </label>
                <input
                  id="add-option"
                  className="rounded-lg border border-gray-400 bg-white p-2 ps-3"
                  type="text"
                  value={newOptionText}
                  onChange={(e) => setNewOptionText(e.target.value)}
                  placeholder="Name option..."
                />
              </div>
              <div>
                <button
                  type="button"
                  className={`px-4 py-2 transition mx-auto text-lg text-white rounded-lg ${
                    !newOptionText.trim()
                      ? "bg-gray-400 pointer-events-none"
                      : "bg-blue-500 hover:bg-blue-600 hover:-translate-y-1 transition-all"
                  }`}
                  onClick={() => {
                    if (!newOptionText.trim()) return;
                    onOptionAdd(id, newOptionText);
                    setNewOptionText("");
                  }}
                >
                  Add option
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-row-reverse px-4">
        <button
          type="button"
          className="remove-q rounded-xl bg-red-400 px-4 py-3 text-lg text-white transition-all hover:-translate-y-1 hover:bg-red-300"
          onClick={() => onQuestionRemove(id)}
        >
          Remove question
        </button>
      </div>
    </div>
  );
}

export default QuestionItem;
