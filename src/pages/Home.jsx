import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDataContext } from 'data';
import { colors, device, size } from 'styles';
import styled, { css } from 'styled-components';
import { MdOutlineCampaign } from 'react-icons/md';
import {
  MiniDisclaimer,
  NewsTicker,
  Announce,
  Questions,
  Developers
} from 'components/Home';
import { GetLine, GetRecord } from 'api/utlis';
import { useMediaQuery } from 'react-responsive';

const Container = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: ${colors.gray500};
  padding: 40px;
  display: flex;
  flex-direction: column;

  @media ${device.phone} {
    padding: 20px 10px 0;
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
const ContentRow = styled.div`
  display: flex;
  margin-bottom: 12px;
  flex: 0;
  ${(props) =>
    props.flex &&
    css`
      flex: ${props.flex};
    `}

  &:last-of-type {
    margin-bottom: 0;
  }

  @media ${device.phone} {
    flex-direction: column;
  }
`;
const Wrapper = styled.div`
  // width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-shrink: 0;
  padding: 20px;
  color: ${colors.gray100};
  background: ${(props) =>
    props.dark ? colors.gray600 : colors.gray400};
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  margin-left: 12px;
  overflow: hidden;

  &:first-of-type {
    margin-left: 0;
  }

  @media ${device.phone} {
    padding: 20px 20px;
    border-radius: 2px;
    margin-bottom: 12px;
    margin-left: 0;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;
const News = styled(Wrapper)`
  padding: 0;
  flex-direction: row;
  align-items: center;

  @media ${device.phone} {
    padding: 0;
  }
`;
const TitleBox = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  flex: 0;
  color: ${colors.primaryText};
  font-weight: 500;
  background: ${colors.primary};
  padding: 4px 12px;
  border-radius: 2px;
  white-space: nowrap;

  svg {
    width: 24px;
    height: 24px;
    transform: translateY(-1px);
    margin-right: 4px;
  }
  @media ${device.phone} {
    padding: 4px 8px;
    svg {
      margin-right: 0;
    }
  }
`;
const ContentBox = styled.div`
  flex: 1;
  text-align: center;
`;

export const Home = () => {
  const isPhone = useMediaQuery({ maxWidth: size.phone });
  const { courseList, setCourseList } = useDataContext();
  const [news, setNews] = useState([]);
  const [stop, setStop] = useState(false);

  const handleEnter = () => {
    if (!stop) setStop(!stop);
  };
  const handleLeave = () => {
    if (stop) setStop(!stop);
  };

  useEffect(() => {
    const fetchNews = async () => {
      const record = await GetRecord();
      setNews(record);
    };
    fetchNews();
  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps

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
          <News
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <TitleBox>
              <MdOutlineCampaign />
              {!isPhone && '捷報'}
            </TitleBox>
            <ContentBox>
              {!news.length && '嗨，目前沒有任何捷報 OuO~'}
              {news.length && <NewsTicker news={news} stop={stop} />}
            </ContentBox>
          </News>
        </ContentRow>
        <ContentRow flex={1}>
          <Wrapper>
            <Announce />
          </Wrapper>
          <Wrapper>
            <Questions />
          </Wrapper>
        </ContentRow>
        <ContentRow>
          <Wrapper>
            <Developers />
          </Wrapper>
        </ContentRow>
      </Content>
    </Container>
  );
};
