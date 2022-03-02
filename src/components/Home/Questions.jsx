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
      <Title>FAQ</Title>
      <Content>
        <ToggleQA
          question={'我能如何保護我的帳密？'}
          answer=  {'建議在刷到你要的課後馬上更改校方帳密'}
        />
        <ToggleQA
          question={'若我擔心校務行政系統上的個資會外洩？'}
          answer=  {'建議不要使用本網站，以避免疑慮猜忌'}
        />
        <ToggleQA
          question={'開發者會刪除我的登入資訊嗎？'}
          answer=  {'選課時間結束後會全數刪除'}
        />
        <ToggleQA
          question={'這個網站的服務方式和流程是？'}
          answer=  {'開發者帳號偵測空位、並用你的帳號選課'}
        />
        <ToggleQA
          question={'為甚麼這個網頁不會癱瘓學校系統？'}
          answer=  {'因為我們把對學校伺服器的負擔壓到最低'}
        />
        <ToggleQA
          question={'我大概要等多久才能拿到我要的課？'}
          answer=  {'若沒錯過空位，大約跟你手動刷課一樣久'}
        />
        <ToggleQA
          question={'若我手動刷課，會是我搶到還是網站？'}
          answer=  {'你會搶到，因為網站偵測的速度非常慢'}
        />
        <ToggleQA
          question={'每個使用者的可登記數量上限是？'}
          answer=  {'為維護使用者間的公平，僅可登記 10 堂'}
        />
      </Content>
    </>
  );
};
