export const QuestionEnum = {
  TEXT: "TEXT",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  CHECKBOX: "CHECKBOX",
  DATE: "DATE",
} as const;

export type QuestionEnum = (typeof QuestionEnum)[keyof typeof QuestionEnum];

// Main types
export type Form = {
  id: string;
  title: string;
  description?: string | null;
  questions: Question[];
};

export type Question = {
  id: string;
  type: QuestionEnum;
  text: string;
  options?: string[];
};

export type Response = {
  id: string;
  formId: string;
  answers: Answer[];
};

export type Answer = {
  questionId: string;
  value: string[];
};

// Input types
export type QuestionInput = {
  type: QuestionEnum;
  text: string;
  options?: string[];
};

export type AnswerInput = {
  questionId: string;
  value: string[];
};

// Resolvers Args

export type MutationCreateFormArgs = {
  title: string;
  description?: string | null;
  questions: QuestionInput[];
};

export type MutationSubmitResponseArgs = {
  formId: string;
  answers: AnswerInput[];
};
