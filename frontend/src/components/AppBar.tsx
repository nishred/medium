import { useContext } from "react";

import { UserContext } from "../context/UserProvider";

import Avatar from "./Avatar";
import { Link, useNavigate } from "react-router-dom";

const AppBar = ({ publishPage = false }: { publishPage: boolean }) => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <div className="flex justify-between py-4 px-8 border-b border-solid border-slate-500 items-center">
      <Link to={"/blogs"}>
        <div className="text-2xl font-bold uppercase text-slate-800">
          Medium
        </div>
      </Link>

      <div>
        {!publishPage && (
          <button
            onClick={() => {
              navigate("/publish");
            }}
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Create Blog
          </button>
        )}
        <Avatar name={user.name} />
      </div>
    </div>
  );
};

export default AppBar;

