import type { QuestionEnum } from "../../types/formTypes";

export type QuestionUI = {
  id: string;
  type: QuestionEnum;
  text: string;
  options: string[];
};

export type FormState = {
  title: string;
  description?: string;
  questions: QuestionUI[];
};

export type FormAction =
  | { type: "UPDATE_TITLE"; payload: string }
  | { type: "UPDATE_DESCRIPTION"; payload: string }
  | { type: "ADD_QUESTION" }
  | { type: "REMOVE_QUESTION"; payload: string }
  | { type: "UPDATE_QUESTION_TEXT"; payload: { id: string; text: string } }
  | {
      type: "UPDATE_QUESTION_TYPE";
      payload: { id: string; type: QuestionEnum };
    }
  | {
      type: "ADD_OPTION";
      payload: { id: string; newOption: string };
    }
  | {
      type: "REMOVE_OPTION";
      payload: { id: string; index: number };
    }
  | {
      type: "UPDATE_OPTION";
      payload: { id: string; index: number; newOption: string };
    };

export type FormBuilderHeaderProps = {
  title: string;
  description: string | undefined;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
};

export type QuestionItemProps = {
  id: string;
  text: string;
  type: QuestionEnum;
  options: string[];
  onQuestionTextChange: (id: string, text: string) => void;
  onSelectTypeChange: (id: string, newType: QuestionEnum) => void;
  onOptionChange: (id: string, index: number, newOption: string) => void;
  onOptionRemove: (id: string, index: number) => void;
  onOptionAdd: (id: string, newOption: string) => void;
  onQuestionRemove: (id: string) => void;
};
