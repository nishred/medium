import styled from "styled-components";
import Spinner from "./Spinner";

const StyledLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f4f4f5;
  opacity: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <StyledLoading>
      <Spinner />
    </StyledLoading>
  );
};

export default Loading;
