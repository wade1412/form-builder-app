import { useCallback, useReducer } from "react";
import { formBuilderReducer, initialState } from "./formBuilderReducer";
import { QuestionEnum } from "../../types/formTypes";
import { useCreateFormMutation } from "../../api/formApi";

export const useFormBuilder = () => {
  const [state, dispatch] = useReducer(formBuilderReducer, initialState);

  const updateTitle = useCallback((title: string) => {
    dispatch({ type: "UPDATE_TITLE", payload: title });
  }, []);

  const updateDescription = useCallback((description: string) => {
    dispatch({ type: "UPDATE_DESCRIPTION", payload: description });
  }, []);

  const addQuestion = useCallback(() => {
    dispatch({ type: "ADD_QUESTION" });
  }, []);

  const removeQuestion = useCallback((questionId: string) => {
    dispatch({ type: "REMOVE_QUESTION", payload: questionId });
  }, []);

  const updateQuestionText = useCallback((questionId: string, text: string) => {
    dispatch({
      type: "UPDATE_QUESTION_TEXT",
      payload: { id: questionId, text: text },
    });
  }, []);

  const updateQuestionType = useCallback(
    (questionId: string, newType: QuestionEnum) => {
      dispatch({
        type: "UPDATE_QUESTION_TYPE",
        payload: { id: questionId, type: newType },
      });
    },
    [],
  );

  const addOption = useCallback((questionId: string, newOption: string) => {
    dispatch({
      type: "ADD_OPTION",
      payload: { id: questionId, newOption: newOption },
    });
  }, []);

  const removeOption = useCallback((questionId: string, optIndex: number) => {
    dispatch({
      type: "REMOVE_OPTION",
      payload: { id: questionId, index: optIndex },
    });
  }, []);

  const updateOption = useCallback(
    (questionId: string, optIndex: number, newOption: string) => {
      dispatch({
        type: "UPDATE_OPTION",
        payload: { id: questionId, index: optIndex, newOption: newOption },
      });
    },
    [],
  );

  const [createForm, { isLoading, error }] = useCreateFormMutation();

  const transformQuestions = useCallback(() => {
    return state.questions.map((q) => {
      const base = {
        type: q.type,
        text: q.text.trim(),
      };

      if (
        q.type === QuestionEnum.MULTIPLE_CHOICE ||
        q.type === QuestionEnum.CHECKBOX
      ) {
        return {
          ...base,
          options: q.options ?? [],
        };
      }

      return base;
    });
  }, [state.questions]);

  const submitForm = async () => {
    if (!state.title.trim() || state.questions.length === 0) return;

    const payload = {
      title: state.title,
      description: state.description || null,
      questions: transformQuestions(),
    };

    try {
      await createForm(payload).unwrap();

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return {
    //form Building state and actions
    form: state,
    updateTitle,
    updateDescription,
    addQuestion,
    removeQuestion,
    updateQuestionText,
    updateQuestionType,
    addOption,
    removeOption,
    updateOption,
    //form submit actions and loading/err states
    submitForm,
    isCreating: isLoading,
    createError: error,
  };
};
