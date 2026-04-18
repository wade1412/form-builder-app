import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFormQuery, useSubmitResponseMutation } from "../../api/formApi";
import type { FormFillerParams } from "../../types/componentTypes";
import type { AnswerInput } from "../../types/formTypes";
import FormFillerHeader from "./FormFillerHeader";
import QuestionCard from "./QuestionCard";

function FormFiller() {
  const navigate = useNavigate();
  const { id } = useParams<FormFillerParams>();
  const [answers, setAnswers] = useState<AnswerInput[]>([]);

  const {
    data: formData,
    isLoading: isFormLoading,
    error: formError,
  } = useGetFormQuery(id ?? "", {
    skip: !id,
  });

  const [submitResponse, { isLoading, error }] = useSubmitResponseMutation();

  const handleAnswer = (id: string, value: string[]) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === id);

      if (existing) {
        return prev.map((a) => (a.questionId === id ? { ...a, value } : a));
      }

      return [...prev, { questionId: id, value }];
    });
  };

  const handleSubmit = async () => {
    if (!id) return;
    if (!id || !isFormValid) return;

    try {
      await submitResponse({
        formId: id,
        answers,
      }).unwrap();

      alert("Responses submitted successfully");

      setAnswers([]);
      navigate("/");
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const isFormValid =
    formData?.questions.every((q) =>
      answers.find((a) => a.questionId === q.id && a.value.length > 0),
    ) ?? false;

  if (isFormLoading) {
    return (
      <div className="loading-div flex h-50 w-full items-center justify-center p-10 text-3xl text-gray-500">
        Loading form...
      </div>
    );
  }
  if (formError) {
    return (
      <div className="error-div flex h-50 w-full items-center justify-center p-10 text-3xl text-gray-500">
        Something went wrong
      </div>
    );
  }
  if (!formData) {
    return (
      <div className="empty-div flex h-50 w-full items-center justify-center p-10 text-3xl text-gray-500">
        Form not found
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-div flex h-50 w-full items-center justify-center p-10 text-3xl text-gray-500">
        Failed to submit
      </div>
    );
  }

  return (
    <section className="mx-4 flex flex-col gap-4 rounded-2xl bg-gray-200 p-6 text-lg">
      <FormFillerHeader
        title={formData.title}
        description={formData.description}
      />
      <div className="questions-div mb-2 flex flex-col">
        {formData.questions.map((q) => (
          <QuestionCard
            key={q.id}
            id={q.id}
            text={q.text}
            type={q.type}
            options={q.options}
            handleAnswer={handleAnswer}
          />
        ))}
      </div>
      <div className="mb-4 flex w-full items-center justify-center">
        <button
          type="button"
          className="rounded-xl bg-blue-500 px-8 py-4 text-xl text-white transition-all hover:-translate-y-1 hover:bg-blue-400"
          onClick={handleSubmit}
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? "Submitting..." : "Submit Response"}
        </button>
      </div>
    </section>
  );
}

export default FormFiller;
