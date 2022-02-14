import React from 'react';
import { useDataContext } from 'data';
import { colors, device, size } from 'styles';
import styled, { css } from 'styled-components';
import { FullDisclaimer } from 'components/Home';

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
`;
const Wrapper = styled.div`
  // width: 100%;
  display: flex;
  flex-direction: column;
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

export const Disclaimer = () => {
  return (
    <Container>
      <Title>免責聲明</Title>
      <Content>
        <Wrapper>
          <FullDisclaimer />
        </Wrapper>
      </Content>
    </Container>
  );
};
