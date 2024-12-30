import styled from "styled-components";
import SignupForm from "../components/SignupForm";
import SignupQuote from "../components/SignupQuote";
import { Outlet } from "react-router-dom";

const StyledSignup = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SignupLayout = () => {
  return (
    <StyledSignup>
      <Outlet />
      <SignupQuote />
    </StyledSignup>
  );
};

export default SignupLayout;
