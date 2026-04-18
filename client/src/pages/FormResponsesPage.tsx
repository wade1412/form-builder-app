import { useParams } from "react-router-dom";
import { type ResponsesParams } from "../types/componentTypes.ts";
import {
  useGetFormQuery,
  useGetResponsesByFormIdQuery,
} from "../api/formApi.ts";
import ResponseCard from "../components/ResponseCard.tsx";
import Header from "../components/Header.tsx";

function FormResponsesPage() {
  const { id } = useParams<ResponsesParams>();

  const {
    data: responsesData,
    isLoading: isResponsesLoading,
    error: responsesError,
  } = useGetResponsesByFormIdQuery(id ?? "", {
    skip: !id,
  });
  const {
    data: formData,
    isLoading: isFormLoading,
    error: formError,
  } = useGetFormQuery(id ?? "", {
    skip: !id,
  });

  if (isResponsesLoading || isFormLoading) {
    return (
      <div className="loading-div flex h-50 w-full items-center justify-center p-10 text-3xl text-gray-500">
        Loading response...
      </div>
    );
  }

  if (responsesError || formError) {
    return (
      <div className="error-div flex h-50 w-full items-center justify-center p-10 text-3xl text-gray-500">
        Something went wrong
      </div>
    );
  }

  return (
    <section>
      <Header headerText={`Responses for Form: ${formData?.title}`} />

      {(!responsesData || responsesData.length === 0 || !formData) && (
        <div className="empty-div flex h-50 w-full items-center justify-center p-10 text-3xl text-gray-500">
          {!formData ? "Form not found" : "No responses found"}
        </div>
      )}

      {responsesData && formData && (
        <div className="responses-div grid grid-cols-3 gap-4 px-6 py-4">
          {(responsesData ?? []).map((res, index) => (
            <ResponseCard
              key={res.id}
              responseNumber={index}
              questions={formData?.questions}
              answers={res.answers}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default FormResponsesPage;
