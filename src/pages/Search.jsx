import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles';
import { DropdownV2 } from 'components/Dropdown';
import { Test } from 'components';

const SearchContainer = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: ${colors.gray500};
  padding: 40px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  color: ${colors.title};
  font-size: 32px;
  letter-spacing: 4px;
  margin-bottom: 40px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const LeftWrapper = styled.div`
  min-width: 300px;
  // width: 100%;
  height: fit-content;
  padding: 20px;
  flex-shrink: 0;
  background: ${colors.gray400};
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
`;

const RightWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background: ${colors.gray400};
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  margin-left: 12px;
  display: flex;
  flex-direction: column;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SearchTitle = styled.h4`
  position: relative;
  left: 1px;
  letter-spacing: 2px;
  color: ${colors.gray100};
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  max-height: 40px;
  padding: 10px 18px;
  font-size: 18px;
  color: #d0d0d3;
  border-radius: 4px;
  background: ${colors.gray500};
  border: none;
  outline: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0);
  transition: 0.2s;
  &:focus {
    border: 1px solid ${colors.primary500};
  }
`;

const BoxTitle = styled.h3`
  // padding: 16px 16px 0px;
  color: ${colors.gray000};
  letter-spacing: 2px;
  font-size: 24px;
  margin-bottom: 12px;
`;

const Button = styled.div`
  background: linear-gradient(45deg, #f6d365 0%, #fda085 100%);
  width: 100%;
  height: fit-content;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 4px;
  text-align: center;
  transition: 0.3s;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    filter: brightness(0.9);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    filter: brightness(0.7);
  }
`;

export const Search = (props) => {
  return (
    <SearchContainer>
      <Title>查詢課程</Title>
      <ContentContainer>
        <LeftWrapper>
          <SearchBox>
            <SearchTitle>開課序號</SearchTitle>
            <Input type="text" />
          </SearchBox>
          <SearchBox>
            <SearchTitle>科目名稱</SearchTitle>
            <Input type="text" />
          </SearchBox>
          <SearchBox>
            <SearchTitle>課程系所 / 學程</SearchTitle>
            <DropdownV2></DropdownV2>
          </SearchBox>
          <SearchBox>
            <SearchTitle>教師名稱</SearchTitle>
            <Input type="text" />
          </SearchBox>
          <SearchBox>
            <SearchTitle>課程時間</SearchTitle>
            <DropdownV2></DropdownV2>
          </SearchBox>
          <SearchBox>
            <SearchTitle>課程地點</SearchTitle>
            <DropdownV2></DropdownV2>
          </SearchBox>
          <SearchBox>
            <Button>查詢</Button>
          </SearchBox>
        </LeftWrapper>
        <RightWrapper>
          <BoxTitle>課程列表</BoxTitle>
          <Test></Test>
        </RightWrapper>
      </ContentContainer>
    </SearchContainer>
  );
};
