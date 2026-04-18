import type { FormCardProps } from "../types/componentTypes.ts";
import { Link } from "react-router-dom";

function FormCard({ id, title, description }: FormCardProps) {
  return (
    <div className="form-card flex flex-col p-4 gap-4 bg-gray-300 text-center rounded-xl text-lg">
      <h3 className="form-title font-semibold text-xl">{title}</h3>
      <p className="form-description">{description || "No description"}</p>
      <div className="button-div flex p-2 justify-center gap-6">
        <Link
          to={`/forms/${id}/fill`}
          className="fill-btn bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 hover:-translate-y-1 transition-all"
        >
          Fill
        </Link>
        <Link
          to={`/forms/${id}/responses`}
          className="responses-btn  bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 hover:-translate-y-1 transition-all"
        >
          Responses
        </Link>
      </div>
    </div>
  );
}

export default FormCard;
