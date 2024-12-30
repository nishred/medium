import { createContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";

type UserType = {
  name: string;
  email: string;
  id: string;
  isAuthenticated: boolean;
};

interface UserContextInterface {
  user: UserType;
  setUser(newUser: UserType): void;
}

export const UserContext = createContext<UserContextInterface | undefined>(
  undefined
);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    id: "",
    isAuthenticated: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (!token) navigate("/signup");

    async function fetchUser() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const { id, name, email } = response.data.data.user;

        setUser({
          id,
          name,
          email,
          isAuthenticated: true,
        });

        navigate("/blogs");
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Something went wrong"
        );
        navigate("/signup");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (user.isAuthenticated) {
      const token = window.localStorage.getItem("token");

      const { exp } = jwtDecode(token as string);

      const seconds = exp - Math.ceil(Date.now() / 1000);

      const id = window.setTimeout(() => {
        window.localStorage.removeItem("token");

        setUser({
          id: "",
          name: "",
          email: "",
          isAuthenticated: false,
        });
      }, seconds * 1000);

      return () => {
        window.clearTimeout(id);
      };
    }
  }, [user.isAuthenticated]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
