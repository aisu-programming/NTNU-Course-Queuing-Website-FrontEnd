import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles';

const Option = styled.div`
  width: 100%;
  color: ${colors.gray200};
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) =>
    props.isActive ? colors.gray400 : 'none'};
  transition: 0.3s;

  svg,
  h4 {
    color: ${(props) =>
      props.isActive ? colors.white : ''};
    transform: ${(props) =>
      props.isActive ? 'translate(10px, 0)' : 'none'};
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
    flex-shrink: 0;
  }
`;
const OptionRWD = styled(Option)`
  padding: 8px;

  svg,
  h4 {
    transform: none;
  }
  &:hover {
    svg,
    h4 {
      transform: none;
    }
  }
  svg {
    margin-right: 0;
  }
`;

const Text = styled.h4`
  position: relative;
  top: 1px;
  font-size: 16px;
  letter-spacing: 2px;
  white-space: nowrap;
`;

export const ButtonOption = ({
  isRWD,
  option,
  active,
  children,
}) => {
  return (
    <>
      {!isRWD && (
        <Option isActive={active}>
          {children}
          <Text>{option}</Text>
        </Option>
      )}
      {isRWD && (
        <OptionRWD isActive={active}>{children}</OptionRWD>
      )}
    </>
  );
};
