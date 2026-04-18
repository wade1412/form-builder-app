import FormFiller from "../components/FormFiller/FormFiller";
import Header from "../components/Header";

function FormFillerPage() {
  return (
    <section>
      <Header headerText={"Filling form"} />
      <FormFiller />
    </section>
  );
}

export default FormFillerPage;
