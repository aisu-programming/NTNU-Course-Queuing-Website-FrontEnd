import React from 'react';
import styled from 'styled-components'
import { colors } from '../styles'
import { Dropdown } from 'components/Dropdown';
import { DropdownV2 } from 'components/Dropdown';

const SearchContainer = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: ${colors.gray500};
  padding: 40px;
`
const Title = styled.h1`
  color: ${colors.title};
  font-size: 32px;
  letter-spacing: 4px;
  margin-bottom: 40px;
`

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
`

const LeftWrapper = styled.div`
  min-width: 300px;
  // width: 100%;
  height: fit-content;
  padding: 20px;
  flex-shrink: 0;
  background: ${colors.gray400};
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.3);
  `

const RightWrapper = styled.div`
  width: 100%;
  height: 420px;
  background: ${colors.gray400};
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.3);
  margin-left: 12px;
`

const DropdownBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  &:last-of-type {
    margin-bottom: 0;
  }
`

const DropdownTitle = styled.h4`
  position: relative;
  left: 1px;
  letter-spacing: 2px;
  color: ${colors.gray100};
  margin-bottom: 4px;
`

const SubTitle = styled.div`
  font-size: 30px;
  color: ${colors.subtitle}
`
const Line = styled.div`
  margin-top: 20px;
  border-bottom: 2px solid ${colors.gray500};
`

export const Search = (props) => {
  return (
    <SearchContainer>
      <Title>查詢課程</Title>
      <ContentContainer>
        <LeftWrapper>
          <DropdownBox>
            <DropdownTitle>課程代號</DropdownTitle>
            <DropdownV2></DropdownV2>
          </DropdownBox>
          <DropdownBox>
            <DropdownTitle>開課系所</DropdownTitle>
            <DropdownV2></DropdownV2>
          </DropdownBox>
          <DropdownBox>
            <DropdownTitle>大屌怪</DropdownTitle>
            <DropdownV2></DropdownV2>
          </DropdownBox>
        </LeftWrapper>
        <RightWrapper></RightWrapper>
      </ContentContainer>
      {/* <SubTitle>ABCDEFG</SubTitle> */}
    </SearchContainer>
  )
};
