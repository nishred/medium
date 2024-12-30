import { ReactNode, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const { user } = useContext(UserContext);

  if (!user.isAuthenticated) return <Navigate to={"/signup"} />;

  return children;
};

export default Protected;
