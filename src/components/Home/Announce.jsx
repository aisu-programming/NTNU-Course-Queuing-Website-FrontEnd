import React from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import { MdCircle } from 'react-icons/md';

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
  // padding: 10px 10px;
  // background: ${colors.gray500};
  border-radius: 4px;
`;
const NoAnnounce = styled.div`
  color: ${colors.gray200};
  padding: 36px;
  margin: auto;
`;
const AnnounceBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const AnnounceTitle = styled.h4`
  color: ${(props) =>
    props.isTop ? colors.danger : colors.white};
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 8px;
`;
const AnnounceDate = styled.span`
  color: ${colors.gray300};
  font-size: 14px;
  margin-left: 8px;
`;
const AnnounceText = styled.h5`
  color: ${colors.gray100};
  margin-bottom: 8px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;
const AnnounceIcon = styled.span`
  svg {
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
`

export const Announce = () => {
  const hasAnnounce = true;
  return (
    <>
      <Title>公告</Title>
      <Content>
        {!hasAnnounce && (
          <NoAnnounce>
            {'抱歉，目前沒有公告 <(_ _)>'}
          </NoAnnounce>
        )}
        {hasAnnounce && (
          <>
            <AnnounceBox>
              <AnnounceTitle isTop>
                緊急維修
                <AnnounceDate>02/18 17:15</AnnounceDate>
              </AnnounceTitle>
              <AnnounceText>
                <AnnounceIcon>
                  <MdCircle />
                </AnnounceIcon>
                目前大一、大二的通識領域改制，故無法正常選擇領域
              </AnnounceText>
              <AnnounceText>
                <AnnounceIcon>
                  <MdCircle />
                </AnnounceIcon>
                若遇到 BUG 可以聯繫我們 Q~Q
              </AnnounceText>
            </AnnounceBox>
          </>
        )}
      </Content>
    </>
  );
};
