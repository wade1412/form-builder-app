import { QuestionEnum } from "../../types/formTypes";
import type { FormAction, FormState } from "./types";
import { addNewOption, changeOptionType, changeQuestionType } from "./utils";

export const initialState: FormState = {
  title: "",
  description: "",
  questions: [],
};

export function formBuilderReducer(
  state: FormState,
  action: FormAction,
): FormState {
  switch (action.type) {
    case "UPDATE_TITLE":
      return {
        ...state,
        title: action.payload,
      };
    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };
    case "ADD_QUESTION":
      return {
        ...state,
        questions: [
          ...state.questions,
          {
            id: crypto.randomUUID(),
            text: "",
            type: QuestionEnum.TEXT,
            options: [],
          },
        ],
      };
    case "REMOVE_QUESTION":
      return {
        ...state,
        questions: state.questions.filter((q) => q.id !== action.payload),
      };
    case "UPDATE_QUESTION_TEXT":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id ? { ...q, text: action.payload.text } : q,
        ),
      };
    case "UPDATE_QUESTION_TYPE":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id
            ? changeQuestionType(q, action.payload.type)
            : q,
        ),
      };
    case "ADD_OPTION":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id
            ? addNewOption(q, action.payload.newOption)
            : q,
        ),
      };
    case "REMOVE_OPTION":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id
            ? {
                ...q,
                options: (q.options ?? []).filter(
                  (_, oldIndx) => oldIndx !== action.payload.index,
                ),
              }
            : q,
        ),
      };
    case "UPDATE_OPTION":
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id
            ? changeOptionType(
                q,
                action.payload.index,
                action.payload.newOption,
              )
            : q,
        ),
      };
    default:
      return state;
  }
}
