import React from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../styles';

const Button = styled.div`
  width: fit-content;
  color: ${(props) =>
    props.isDanger ? props.isDanger : colors.gray600};
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid ${colors.white}${colors.opacity50};
  background: ${colors.white}${colors.opacity40};
  box-shadow: 2px 2px 8px ${colors.black}${colors.opacity20};
  transition: 0.3s;

  svg {
    transform: '';
    transition: 0.3s;
    height: 16px;
    width: 16px;
    margin-right: 4px;
  }
  &:hover {
    background: ${colors.white}${colors.opacity60};
    svg {
      transform: rotate(10deg);
    }
  }

  ${(props) =>
    props.disabled &&
    css`
      cursor: default;
      filter: brightness(0.6) contrast(0.8);
      &:hover {
        background: ${colors.white}${colors.opacity40};
        filter: brightness(0.6) contrast(0.8);
        svg {
          transform: none;
        }
      }
    `}
`;

const Text = styled.h4`
  position: relative;
  top: 1px;
`;

export const IconButton = (props) => {
  const { isDanger, onClick, disabled, text, disableText, children } =
    props;
  const textResult = () => {
    if (!disabled) {
      return text;
    }
    if (!!disabled) {
      return disableText;
    }
  }
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      isDanger={isDanger}
    >
      {children}
      <Text>{textResult()}</Text>
    </Button>
  );
};
