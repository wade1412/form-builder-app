import { useGetFormsQuery } from "../api/formApi";
import FormCard from "../components/FormCard";
import Header from "../components/Header";

function HomePage() {
  const { data, isLoading, error } = useGetFormsQuery();

  if (isLoading) {
    return (
      <div className="loading-div flex h-50 w-full items-center justify-center p-10 text-3xl text-gray-500">
        Loading forms...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-div flex h-50 w-full items-center justify-center p-10 text-3xl text-gray-500">
        Something went wrong
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="empty-div flex h-50 w-full items-center justify-center p-10 text-3xl text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <section>
      <div className="form-container">
        <Header headerText={`Available forms:`} />

        <div className="form-list grid grid-cols-3 gap-4 px-6 py-4">
          {data.map(({ id, title, description }) => (
            <FormCard
              key={id}
              id={id}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
