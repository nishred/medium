import { useContext } from "react";

import { UserContext } from "../context/UserProvider";

import Avatar from "./Avatar";

const AppBar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex justify-between py-4 px-8 border-b border-solid border-slate-500 items-center">
      <div>Medium</div>

      <div>
        <Avatar name={user.name} />
      </div>
    </div>
  );
};

export default AppBar;
