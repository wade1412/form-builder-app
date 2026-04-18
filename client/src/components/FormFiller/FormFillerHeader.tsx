import type { FormFillerHeaderProps } from "../../types/componentTypes";

function FormFillerHeader({ title, description }: FormFillerHeaderProps) {
  return (
    <div className="flex flex-col text-xl gap-4 mb-4 bg-gray-300 rounded-lg p-4 shadow-sm font-semibold">
      <div className="flex gap-4 items-center ">
        <p className="  border-b border-gray-400 px-2 py-1 ps-3 ">Form name:</p>
        <p>{title}</p>
      </div>
      <div className="flex gap-4 items-center ">
        <p className=" px-2 py-1 ps-3 ">Form description:</p>
        <p>{description ?? "No description"}</p>
      </div>
    </div>
  );
}

export default FormFillerHeader;
