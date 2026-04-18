import { QuestionEnum } from "../constants/QuestionEnum.js";
import { validateArray } from "./generalValidation.js";

export const validateDuplicateAnswers = (answersArr) => {
  //Create empty Set
  const seen = new Set();

  for (let answer of answersArr) {
    //Throw error if Set already has this questionId
    if (seen.has(answer.questionId)) {
      throw new Error("Duplicate answers for question");
    }

    //Add questionId to Set
    seen.add(answer.questionId);
  }
};

export const validateAnswer = (answer, question) => {
  validateArray(answer.value);
  const value = answer.value;

  //Diferrent validation based on the type of the question
  switch (question.type) {
    case QuestionEnum.TEXT:
      if (value.length > 1) {
        throw new Error(
          `Only one answer required for ${question.type} type question`,
        );
      }

      if (typeof value[0] !== "string") {
        throw new Error("Answer has incorrect type; type required: string");
      }

      if (value[0].trim().length === 0) {
        throw new Error("The answer is empty");
      }
      break;
    case QuestionEnum.MULTIPLE_CHOICE:
      if (value.length !== 1) {
        throw new Error(
          `One answer required for ${question.type} type question`,
        );
      }

      if (typeof value[0] !== "string") {
        throw new Error("Answer has incorrect type; type required: string");
      }

      if (!question.options.includes(value[0])) {
        throw new Error(`Answer is not present in question options`);
      }

      break;

    case QuestionEnum.CHECKBOX:
      if (value.length < 1) {
        throw new Error("This type of question requires at least one asnwer");
      }

      if (value.some((val) => val.trim() === "")) {
        throw new Error("Some of the answers are empty");
      }

      if (value.some((val) => !question.options.includes(val))) {
        throw new Error(`Answer is not present in question options`);
      }

      break;
    case QuestionEnum.DATE: {
      if (value.length > 1) {
        throw new Error(
          `Only one asnwer required for ${question.type} type question`,
        );
      }
      let d = new Date(value[0]);
      if (isNaN(d.getTime())) {
        throw new Error("Answer has incorrect type; type required: date");
      }
    }
  }
};
