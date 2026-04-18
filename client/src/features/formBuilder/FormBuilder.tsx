import { useNavigate } from "react-router-dom";
import FormBuilderHeader from "./components/FormBuilderHeader";
import QuestionItem from "./components/QuestionItem";
import { useFormBuilder } from "./useFormBuilder";

function FormBuilder() {
  const {
    form,
    updateTitle,
    updateDescription,
    addQuestion,
    removeQuestion,
    updateQuestionText,
    updateQuestionType,
    addOption,
    removeOption,
    updateOption,
    submitForm,
    isCreating,
    createError,
  } = useFormBuilder();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const success = await submitForm();

    if (success) {
      alert("Form submitted successfully");
      navigate("/");
    } else {
      console.error("Failed to create form");
    }
  };

  const isValid =
    form.title.trim() &&
    form.questions.length > 0 &&
    form.questions.every(
      (q) =>
        q.text.trim() &&
        (q.type === "TEXT" ||
          q.type === "DATE" ||
          (q.options && q.options.length > 0)),
    );

  if (isCreating) {
    return (
      <div className="flex h-50 w-full items-center justify-center p-10 text-3xl text-gray-500">
        Your form is being uploaded
      </div>
    );
  }

  if (createError) {
    return (
      <div className="flex h-50 w-full items-center justify-center p-10 text-3xl text-gray-500">
        Something went wrong
      </div>
    );
  }

  return (
    <section className="form-div flex flex-col gap-4 p-6 mx-4 text-lg bg-gray-200 rounded-2xl">
      <FormBuilderHeader
        title={form.title}
        description={form.description}
        onTitleChange={updateTitle}
        onDescriptionChange={updateDescription}
      />

      {form.questions.length === 0 ? (
        <p className="text-lg mx-auto rounded-xl px-6 py-3 m-6 bg-gray-300">
          No questions yet
        </p>
      ) : (
        <div className="questions-div flex flex-col gap-8 mb-2">
          {form.questions.map((q) => (
            <QuestionItem
              key={q.id}
              id={q.id}
              text={q.text}
              type={q.type}
              options={q.options}
              onQuestionTextChange={updateQuestionText}
              onSelectTypeChange={updateQuestionType}
              onOptionChange={updateOption}
              onOptionRemove={removeOption}
              onOptionAdd={addOption}
              onQuestionRemove={removeQuestion}
            />
          ))}
        </div>
      )}

      <div className="flex w-full items-center gap-20 justify-center ">
        <button
          type="button"
          className=" bg-gray-800 text-xl text-white px-6 py-4 rounded-xl hover:bg-gray-700 hover:-translate-y-1 transition-all"
          onClick={addQuestion}
        >
          Add question
        </button>
        <button
          type="button"
          className={`bg-blue-500 text-xl text-white px-8 py-4 rounded-xl ${
            !isValid
              ? "bg-gray-400 pointer-events-none"
              : "hover:bg-blue-400 hover:-translate-y-1 transition-all"
          }`}
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Submit Form
        </button>
      </div>
    </section>
  );
}

export default FormBuilder;
