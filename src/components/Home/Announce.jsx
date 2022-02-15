import React from 'react';
import styled from 'styled-components';
import { colors } from 'styles';

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
  background: ${colors.gray500};
  border-radius: 4px;
`;
const NoAnnounce = styled.div`
  color: ${colors.gray200};
  padding: 36px;
  margin: auto;
`;

export const Announce = () => {
  return (
    <>
      <Title>公告</Title>
      <Content>
        <NoAnnounce>
          {'抱歉，目前沒有公告 <(_ _)>'}
        </NoAnnounce>
      </Content>
    </>
  );
};
