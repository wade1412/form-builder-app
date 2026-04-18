import type { FormBuilderHeaderProps } from "../types";

function FormBuilderHeader({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: FormBuilderHeaderProps) {
  return (
    <div className="flex flex-col text-xl gap-4 mb-4 bg-gray-300 rounded-lg p-4 shadow-sm">
      <div className="flex gap-4 items-center ">
        <label
          htmlFor="form-name"
          className="font-semibold border-b border-gray-400 px-2 py-1 ps-3 "
        >
          Name your form:
        </label>
        <input
          className="p-1 ps-3 rounded-lg bg-gray-200"
          id="form-name"
          type="text"
          placeholder="Form name..."
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>
      <div className="flex gap-4 items-center">
        <label htmlFor="form-description" className="font-semibold px-2 py-1 ">
          Description:
        </label>
        <input
          className="p-1 ps-3 rounded-lg bg-gray-200"
          id="form-description"
          type="text"
          placeholder="Form description..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default FormBuilderHeader;
