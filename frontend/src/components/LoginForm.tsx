import { useContext, useState } from "react";
import styled from "styled-components";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { StyledInput } from "./SignupForm";

import axios from "axios";

import { SignInInput } from "@nishanthredde/medium-common";
import { BACKEND_URL } from "../utils/constants";
import { UserContext } from "../context/UserProvider";

const LoginForm = () => {
  const [inputs, setInputs] = useState<SignInInput>({
    email: "",
    password: "",
  });

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/signin`,
      inputs,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = response.data.data.token;

    const { id, name, email } = response.data.data.user;

    setUser({
      id,
      name,
      email,
      isAuthenticated: true,
    });

    window.localStorage.setItem("token", token);

    navigate("/blogs");
  }

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col grow max-w-[500px] gap-4"
      >
        <h1 className="text-4xl text-slate-800 font-bold">
          Login to your account
        </h1>
        <div className="text-slate-400">
          Don't have an account?{" "}
          <Link className="underline" to={"/signup"}>
            Sign up
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold">Email</label>
          <StyledInput
            placeholder="mx@example.com"
            type="email"
            value={inputs.email}
            onChange={(e) => {
              setInputs((prevInputs) => {
                return { ...prevInputs, email: e.target.value };
              });
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold">Password</label>
          <StyledInput
            value={inputs.password}
            type="password"
            onChange={(e) => {
              setInputs((prevInputs) => {
                return { ...prevInputs, password: e.target.value };
              });
            }}
          />
        </div>

        <button className="bg-blue-900 text-white text-center uppercase font-bold py-2 rounded-md">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
