import React from "react";
import styled from "styled-components";
import { colors } from "../styles";

const Option = styled.div`
  width: 100%;
  color: ${colors.gray200};
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) => (props.isActive ? colors.gray400 : "none")};
  transition: 0.3s;

  svg,
  h4 {
    color: ${(props) => (props.isActive ? colors.white : "")};
    transform: ${(props) => (props.isActive ? "translate(10px, 0)" : "none")};
    transition: 0.3s ease;
  }
  &:hover {
    background: ${colors.gray400};
    svg,
    h4 {
      color: ${colors.white};
      transform: translate(10px, 0);
    }
  }

  svg {
    height: 24px;
    width: 24px;
    margin-right: 10px;
  }
`;

const Text = styled.h4`
  position: relative;
  top: 1px;
  font-size: 16px;
  letter-spacing: 2px;
`;

export const ButtonOption = ({ option, active, children }) => {
  return (
    <Option isActive={active}>
      {children}
      <Text>{option}</Text>
    </Option>
  );
};
