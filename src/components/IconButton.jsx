import React from 'react';
import styled from 'styled-components';
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
  }
  &:hover {
    background: ${colors.white}${colors.opacity60};
    svg {
      transform: rotate(10deg);
    }
  }

  svg {
    height: 16px;
    width: 16px;
    margin-right: 4px;
  }
`;

const Text = styled.h4`
  position: relative;
  top: 1px;
`;

export const IconButton = (props) => {
  const { isDanger, handleEvent, text, children } = props;
  return (
    <Button onClick={handleEvent} isDanger={isDanger}>
      {children}
      <Text>{text}</Text>
    </Button>
  );
};
