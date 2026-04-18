import { QuestionEnum } from "../constants/QuestionEnum.js";

export const validateQuestions = (questionsArr) => {
  questionsArr.forEach(({ type, text, options }) => {
    //Validate question text and its length
    if (!text || text.length < 5) {
      throw new Error("Question should have a minimum length of 5 symbols");
    }

    //Validate type and options array
    validateTypeAndOptions(type, options);
  });
};

const validateTypeAndOptions = (questionType, questionOptions) => {
  //Validate question type
  const allowedTypes = Object.values(QuestionEnum);
  if (!allowedTypes.includes(questionType)) {
    throw new Error(`Unsupported question type: ${questionType}`);
  }

  //Check for types that shouldnt have options
  const noOptionsTypes = [QuestionEnum.TEXT, QuestionEnum.DATE];
  if (noOptionsTypes.includes(questionType)) {
    if (questionOptions && questionOptions.length) {
      throw new Error("Options not allowed for this question type");
    }
  }

  //Check for types that should have options
  const requireOptionsType = [
    QuestionEnum.CHECKBOX,
    QuestionEnum.MULTIPLE_CHOICE,
  ];
  if (requireOptionsType.includes(questionType)) {
    //if options is not an array or length is too short, throw error
    if (!Array.isArray(questionOptions) || questionOptions.length <= 2) {
      throw new Error("This type of questions require at least 2 options");
    }

    //Validate options for duplicates and empty values
    validateEachOption(questionOptions);
  }
};

const validateEachOption = (optionsArr) => {
  //Check if there are empty values in an array
  const hasEmpty = optionsArr.some((option) => option === "");

  if (hasEmpty) {
    throw new Error("Options cant be empty");
  }

  //Check for duplicates: if Set length is smaller than options array length - there were duplicates in options
  const hasDupes = () => new Set(optionsArr).size !== optionsArr.length;

  if (hasDupes()) {
    throw new Error("Options have duplicates");
  }
};
