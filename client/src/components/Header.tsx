import { Link } from "react-router-dom";
import type { HeaderProps } from "../types/componentTypes";

function Header({ headerText }: HeaderProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 py-4 px-8 ">
      <h1 className="text-2xl font-bold">{headerText}</h1>
      <div className=" flex gap-4">
        <Link
          to="/forms/new"
          className="responses-btn  bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-600 hover:-translate-y-1 transition-all text-xl"
        >
          Create Form
        </Link>
        <Link
          to="/"
          className="responses-btn  bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-600 hover:-translate-y-1 transition-all text-xl"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default Header;
