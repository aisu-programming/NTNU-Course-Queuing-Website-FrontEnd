import React from 'react';
import { Link } from 'react-router-dom';
import { useDataContext } from 'data';
import { colors, device, size } from 'styles';
import styled from 'styled-components';

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
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  flex-shrink: 0;
  background: ${colors.gray400};
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  @media ${device.phone} {
    padding: 20px;
    border-radius: 2px;
  }
`;

export const Home = (props) => {
  const { courseList, setCourseList } = useDataContext();
  console.log(courseList);
  console.log(setCourseList);
  return (
    <Container>
      <Title>首頁</Title>
      <Wrapper>ABCDEFG</Wrapper>
    </Container>
  );
};
