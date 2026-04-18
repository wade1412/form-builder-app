import Header from "../components/Header";
import FormBuilder from "../features/formBuilder/FormBuilder";

function FormBuilderPage() {
  return (
    <section>
      <Header headerText="Build your form:" />
      <FormBuilder />
    </section>
  );
}

export default FormBuilderPage;
