import { v4 as uuidv4 } from "uuid";
import { db } from "../db/db.js";
import { validateArray } from "../validation/generalValidation.js";
import { validateQuestions } from "../validation/questionValidation.js";

export const findFormById = (_, { id }) => {
  const form = db.forms.find((form) => form.id === id);

  return form || null;
};

export const createNewForm = (_, { title, description, questions }) => {
  //Normalize form title and validate
  const normalizedTitle = title.trim();
  if (!(normalizedTitle.length > 0)) {
    throw new Error("Title is required for a new form");
  }

  //Check if questions data exists
  validateArray(questions, "Form must have at least one question");

  //Normalize questions and add Id's
  const normalizedQuestions = questions.map((q) => {
    const text = q.text?.trim();
    let options = q.options;

    //Check for options and trim
    if (Array.isArray(options) && options.length > 0) {
      options = options.map((o) => o.trim());

      return {
        ...q,
        id: uuidv4(),
        text,
        options: options,
      };
    }

    return {
      ...q,
      id: uuidv4(),
      text,
    };
  });

  //Validate normalized questions
  validateQuestions(normalizedQuestions);

  //Generate Form object
  const newForm = {
    id: uuidv4(),
    title: normalizedTitle,
    description: description?.trim() || null,
    questions: normalizedQuestions,
  };

  //Push new form to DB
  db.forms.push(newForm);

  return newForm;
};
