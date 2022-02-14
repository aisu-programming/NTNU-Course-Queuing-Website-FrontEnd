import React from 'react';
import { Link } from 'react-router-dom';
import { useDataContext } from 'data';
import { colors, device, size } from 'styles';
import styled, { css } from 'styled-components';
import { MiniDisclaimer, Disclaimer } from 'components/Home';
import { GetLine } from 'api/utlis';

const Container = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: ${colors.gray500};
  padding: 40px;
  display: flex;
  flex-direction: column;

  @media ${device.phone} {
    padding: 20px 0 0;
  }
`;
const Title = styled.h1`
  color: ${colors.title};
  font-size: 32px;
  letter-spacing: 4px;
  margin-bottom: 40px;

  @media ${device.phone} {
    text-align: center;
    margin-bottom: 16px;
    font-size: 24px;
  }
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const ContentRow = styled.div`
  display: flex;
  margin-bottom: 12px;
  flex: 0;
  ${props => props.flex && css`
    flex: ${props.flex};
  `}

  &:last-of-type {
    margin-bottom: 0;
  }
`
const Wrapper = styled.div`
  // width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-shrink: 0;
  padding: 20px;
  color: ${colors.gray100};
  background: ${colors.gray400};
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  margin-left: 12px;

  &:first-of-type {
    margin-left: 0;
  }

  @media ${device.phone} {
    padding: 20px;
    border-radius: 2px;
    margin-left: 0;
  }
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  background: ${colors.gray500};
  width: fit-content;
  margin: 0 auto 20px;
  border-radius: 4px;
  color: ${colors.white};
  font-size: 18px;
`

export const Home = () => {
  const { courseList, setCourseList } = useDataContext();
  const handleClick = () => {
    console.log('a');
    GetLine();
  }
  return (
    <Container>
      <Title>首頁</Title>
      <Content>
        <ContentRow>
          <Wrapper>
            <MiniDisclaimer />
          </Wrapper>
        </ContentRow>
        <ContentRow>
          <Wrapper>
            <Button onClick={handleClick}>Button</Button>
            <Disclaimer />
          </Wrapper>
        </ContentRow>
        <ContentRow>
          <Wrapper>ABCDEFG</Wrapper>
        </ContentRow>
        <ContentRow flex={1}>
          <Wrapper>ABCDEFG</Wrapper>
          <Wrapper>ABCDEFG</Wrapper>
        </ContentRow>
        <ContentRow>
          <Wrapper>
            <div>123</div>
            <div>123</div>
            <div>123</div>
          </Wrapper>
        </ContentRow>
      </Content>
    </Container>
  );
};
