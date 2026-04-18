import type { Answer, Question, QuestionEnum } from "./formTypes";

export type HeaderProps = {
  headerText: string;
};

export type FormCardProps = {
  id: string;
  title: string;
  description?: string | null;
};

export type ResponsesParams = {
  id: string;
};

export type ResponseCardProps = {
  responseNumber: number;
  questions: Question[];
  answers: Answer[];
};

export type QuestionMap = {
  [key: string]: Question;
};

export type FormFillerParams = {
  id: string;
};

export type FormFillerHeaderProps = {
  title: string;
  description: string | null | undefined;
};

export type QuestionCardProps = {
  id: string;
  text: string;
  type: QuestionEnum;
  options?: string[];
  handleAnswer: (id: string, answer: string[]) => void;
};

export type QuestionInputProps = {
  id: string;
  type: QuestionEnum;
  options?: string[];
  answerValue: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMultipleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
