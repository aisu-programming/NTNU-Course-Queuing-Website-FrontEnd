import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../styles';
import { useDataContext } from 'data';

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
    color: ${(props) => (props.isActive ? colors.white : '')};
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

  ${props => props.isDanger && css`
    &:hover {
      background: ${colors.danger}${colors.opacity30};
    }
  `}
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
const Alert = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 2px 6px;
  margin-left: auto;
  display: flex;
  align-items: center;
  background: ${colors.danger};
  border-radius: 20px;
`;
const AlertCount = styled.h5`
  color: ${colors.white}${colors.opacity90};
  font-size: 14px;
  transform: translateY(1px);
`;

export const ButtonOption = ({
  isRWD,
  isDanger,
  alert,
  option,
  active,
  children,
  onClick,
}) => {
  const { hasAlert } = useDataContext();

  return (
    <>
      {!isRWD && (
        <Option isActive={active} isDanger={isDanger} onClick={onClick}>
          {children}
          <Text>{option}</Text>
          {alert && !!hasAlert && (
            <Alert>
              <AlertCount>{hasAlert}</AlertCount>
            </Alert>
          )}
        </Option>
      )}
      {isRWD && (
        <OptionRWD isActive={active} isDanger={isDanger} onClick={onClick}>{children}</OptionRWD>
      )}
    </>
  );
};
