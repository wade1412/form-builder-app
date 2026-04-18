import { v4 as uuidv4 } from "uuid";
import { db } from "../db/db.js";
import {
  validateDuplicateAnswers,
  validateAnswer,
} from "../validation/answerValidation.js";
import { validateArray } from "../validation/generalValidation.js";

export const findResponsesByFormId = (_, { formId }) => {
  //Check if the form with this id exists
  const formExists = db.forms.some((f) => f.id === formId);
  if (!formExists) {
    throw new Error("Form with this formId does not exist");
  }

  //Return the responses with this formId or []
  return db.responses.filter((r) => r.formId === formId);
};

export const submitNewResponse = (_, { formId, answers }) => {
  //Find the form by Id and check is it found
  const foundForm = db.forms.find((form) => form.id === formId);
  if (!foundForm) {
    throw new Error("Form not found");
  }

  //Check if the asnwers is an array and not empty
  validateArray(answers, "No answers in response");

  //Check for duplicate answers for same question
  validateDuplicateAnswers(answers);

  //Validate each answer
  answers.forEach((answer) => {
    const ansQuestion = foundForm.questions.find(
      (q) => q.id === answer.questionId,
    );

    //Throw error if question for the asnwer wasnt found

    if (!ansQuestion) {
      throw new Error(`Question not found for the answer`);
    }

    //Validate answer based on the question type
    validateAnswer(answer, ansQuestion);
  });

  const newResponse = {
    id: uuidv4(),
    formId,
    answers,
  };

  db.responses.push(newResponse);

  return newResponse;
};
