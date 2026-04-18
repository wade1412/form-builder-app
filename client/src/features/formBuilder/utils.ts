import { QuestionEnum } from "../../types/formTypes";
import type { QuestionUI } from "./types";

export function changeQuestionType(
  question: QuestionUI,
  newType: QuestionEnum,
) {
  if (question.type === newType) return { ...question };

  if (
    newType === QuestionEnum.MULTIPLE_CHOICE ||
    newType === QuestionEnum.CHECKBOX
  ) {
    return (question.options?.length ?? 0) < 3
      ? {
          ...question,
          type: newType,
          options: ["Option 1", "Option 2", "Option 3"],
        }
      : { ...question, type: newType };
  }

  if (newType === QuestionEnum.TEXT || newType === QuestionEnum.DATE) {
    return question.options?.length === 0
      ? { ...question, type: newType }
      : { ...question, type: newType, options: [] };
  }

  return question;
}

export function addNewOption(question: QuestionUI, newOption: string) {
  if (newOption.trim() === "" || (question.options ?? []).includes(newOption)) {
    return { ...question };
  }

  return {
    ...question,
    options: [...(question.options || []), newOption],
  };
}

export function changeOptionType(
  question: QuestionUI,
  newOptionIndex: number,
  newOptionText: string,
) {
  return {
    ...question,
    options: (question.options ?? []).map((opt: string, index: number) =>
      index === newOptionIndex ? newOptionText : opt,
    ),
  };
}
