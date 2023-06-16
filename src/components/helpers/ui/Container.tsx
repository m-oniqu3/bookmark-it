import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const StyledContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Container = ({ children, className }: Props) => {
  return <StyledContainer className={className}>{children}</StyledContainer>;
};

export default Container;
