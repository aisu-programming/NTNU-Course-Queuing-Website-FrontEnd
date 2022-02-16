import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

const Title = styled.h3`
  color: ${colors.white};
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 2px;
  margin-bottom: 12px;
`;
const Content = styled.div`
  // width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 4px;
`;
const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-top: 2px solid ${colors.gray500}${colors.opacity80};
  cursor: pointer;
  margin-bottom: ${(props) =>
    props.isOpen ? '20px' : '0px'};
  transition: 0.3s;
  &:first-of-type {
    border-top: none;
  }
`;
const LeftWrapper = styled.div`
  margin-right: 12px;

  svg {
    width: 20px;
    height: 20px;
    transform: translateY(1px);
  }
`;
const RightWrapper = styled.div`
  flex: 1;
`;
const Question = styled.h5`
  position: relative;
  color: ${colors.gray100};
  padding: 4px 0;
  transition: 0.3s;
  background: ${colors.gray400};
  z-index: 1;
`;
const Answer = styled.h5`
  position: absolute;
  color: ${colors.gray200}${colors.opacity70};
  transform: ${(props) =>
    props.isOpen
      ? 'translate(32px, 24px)'
      : 'translate(32px, 0px)'};
  transform-origin: top;
  transition: 0.3s;
  z-index: 0;
`;

const ToggleQA = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Box onClick={handleClick} isOpen={isOpen}>
        <LeftWrapper>
          {isOpen && <MdRemoveCircleOutline />}
          {!isOpen && <MdAddCircleOutline />}
        </LeftWrapper>
        <RightWrapper>
          <Question>{question}</Question>
        </RightWrapper>
        <Answer isOpen={isOpen}>{answer}</Answer>
      </Box>
    </>
  );
};

export const Questions = () => {
  return (
    <>
      <Title>問與答</Title>
      <Content>
        <ToggleQA
          question={'這個網頁會癱瘓學校系統嗎?'}
          answer={'不會 >.O'}
        />
        <ToggleQA
          question={'我大概要多久才能搶到我要的課?'}
          answer={'大概跟你坐在電腦前刷到課一樣久'}
        />
      </Content>
    </>
  );
};
