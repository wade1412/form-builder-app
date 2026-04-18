import { findFormById, createNewForm } from "../services/formService.js";
import {
  findResponsesByFormId,
  submitNewResponse,
} from "../services/responseService.js";
import { db } from "../db/db.js";

export const resolvers = {
  Query: {
    forms: () => {
      return db.forms;
    },
    form: findFormById,
    responses: findResponsesByFormId,
  },
  Mutation: {
    createForm: createNewForm,
    submitResponse: submitNewResponse,
  },
};
