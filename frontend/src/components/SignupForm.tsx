import { useContext, useState } from "react";
import styled from "styled-components";

import { Link, Navigate, useNavigate } from "react-router-dom";

import { SignUpInput } from "@nishanthredde/medium-common";

import { BACKEND_URL } from "../utils/constants";

import axios from "axios";
import { UserContext } from "../context/UserProvider";

export const StyledInput = styled.input`
  border: 2px solid #cbd5e1;
  padding: 8px 16px;
  border-radius: 4px;
  &:active {
    border: 3px solid #1e293b;
  }
`;

const SignupForm = () => {

  const [inputs, setInputs] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/signup`,
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
        onSubmit={handleSignUp}
        className="flex flex-col grow max-w-[500px] gap-4"
      >
        <h1 className="text-4xl text-slate-800 font-bold">Create an Account</h1>
        <div className="text-slate-400">
          Already have an account?{" "}
          <Link className="underline" to={"login"}>
            Login
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold">Name</label>
          <StyledInput
            placeholder="Enter your name"
            type="text"
            value={inputs.name}
            onChange={(e) => {
              setInputs((prevInputs) => {
                return { ...prevInputs, name: e.target.value };
              });
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold">Email</label>
          <StyledInput
            type="email"
            placeholder="mx@example.com"
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
            type="password"
            value={inputs.password}
            onChange={(e) => {
              setInputs((prevInputs) => {
                return { ...prevInputs, password: e.target.value };
              });
            }}
          />
        </div>

        <button className="bg-blue-900 text-white text-center uppercase font-bold py-2 rounded-md">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
