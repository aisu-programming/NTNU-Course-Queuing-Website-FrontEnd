import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors, device } from 'styles';
import {
  useOutletContext,
  useLocation,
} from 'react-router-dom';
import {
  MdOutlineThumbUpAlt,
  MdOutlinePauseCircleOutline,
  MdDeleteOutline,
  MdLoop,
} from 'react-icons/md';
import { IconButton } from 'components';
import { useDataContext } from 'data';

const StateColor = {
  active400: `${colors.active400}`,
  active300: `${colors.active300}`,
  active200: `${colors.active400}${colors.opacity60}`,
  active100: `${colors.active300}${colors.opacity60}`,
  pause400: `${colors.pause400}`,
  pause300: `${colors.pause300}`,
  pause200: `${colors.pause400}${colors.opacity60}`,
  pause100: `${colors.pause300}${colors.opacity60}`,
  delete200: `${colors.gray400}`,
  delete100: `${colors.gray300}${colors.opacity40}`,
  done400: `${colors.success400}`,
  done300: `${colors.success300}`,
  delete: '#EC250C',
  blue400: '#4599f5',
  blue300: '#9fccff',
};

const Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  );
  gap: 20px;
  @media ${device.phone} {
    grid-template-columns: repeat(
      auto-fill,
      minmax(100%, 1fr)
    );
  }
`;
// Card
const Container = styled.div`
  border-radius: 4px;
  overflow: hidden;
`;
const Header = styled.div`
  display: flex;
  padding: 8px 12px;
  font-weight: ${(props) =>
    props.isWhite ? '400' : '500'};
  color: ${(props) => props.isWhite && colors.white};
  background: ${(props) =>
    StateColor[props.state + (400 - props.isChange)]};
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 16px 12px;
  background: ${(props) =>
    StateColor[props.state + (300 - props.isChange)]};
  h4 {
    color: ${(props) => props.isWhite && colors.white};
  }
  h5 {
    color: ${(props) =>
      props.isWhite ? colors.gray100 : colors.gray600};
  }

  @media ${device.phoneSmall} {
    grid-template-columns: 3fr 2fr;
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 12px;
  gap: 8px;
  background: ${(props) =>
    StateColor[props.state + (300 - props.isChange)]};
  border-top: 1px solid ${colors.black}${colors.opacity10};
`;
const TextBox = styled.div`
  display: flex;
  align-items: flex-start;
  overflow: hidden;
`;
const Title = styled.h5`
  font-size: 14px;
  color: ${colors.gray600};
  flex-shrink: 0;
  transform: translate(0, 2px);
`;
const Desc = styled.h4`
  color: ${colors.gray900};
  margin-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Text = styled.div`
  margin-left: 12px;
  &:first-of-type {
    margin-left: 0;
  }
`;
const Empty = styled.div`
  color: ${colors.gray300};
  font-size: 20px;
  margin: auto;
`;
const Card = ({ item }) => {
  const { courseData, courseList, setCourseList } =
    useDataContext();

  const {
    state,
    courseNo,
    chineseName,
    department,
    teacher,
    timeInfo,
    domains,
  } = item;
  const isWhite = state === 'delete';

  const isChange = () => {
    const courseItem = courseData.find((item) => {
      return item.courseNo === courseNo;
    });

    if (!courseItem) return 200;
    if (courseItem.state !== state) return 200;
    return 0;
  };

  const handleAction = (action) => {
    const changeState = courseList.map((item) => {
      if (item.courseNo === courseNo) {
        const updateCourse = {
          ...item,
          state: action,
        };
        return updateCourse;
      }
      return item;
    });
    setCourseList(changeState);
  };

  return (
    <Container>
      <Header
        isWhite={isWhite}
        state={state}
        isChange={isChange()}
      >
        <Text>{courseNo}</Text>
        <Text>{chineseName}</Text>
      </Header>
      <Content
        isWhite={isWhite}
        state={state}
        isChange={isChange()}
      >
        <TextBox>
          <Title>開課系所:</Title>
          <Desc>{department}</Desc>
        </TextBox>
        <TextBox>
          <Title>教師:</Title>
          <Desc>{teacher}</Desc>
        </TextBox>
        <TextBox style={{ gridColumn: '1/3' }}>
          <Title>時間地點:</Title>
          <Desc>{timeInfo}</Desc>
        </TextBox>
        <TextBox style={{ gridColumn: '1/3' }}>
          <Title>通識領域:</Title>
          <Desc>無</Desc>
        </TextBox>
      </Content>
      {state !== 'done' && (
        <Footer state={state} isChange={isChange()}>
          {state === 'pause' && item.department === '通識' && (
            <IconButton
              onClick={() => handleAction('pause')}
              text={'變更領域'}
            >
              <MdLoop />
            </IconButton>
          )}
          {state !== 'active' && (
            <IconButton
              onClick={() => handleAction('active')}
              text={'搶'}
            >
              <MdOutlineThumbUpAlt />
            </IconButton>
          )}
          {state !== 'pause' && (
            <IconButton
              onClick={() => handleAction('pause')}
              text={'暫停'}
            >
              <MdOutlinePauseCircleOutline />
            </IconButton>
          )}
          {state !== 'delete' && (
            <IconButton
              isDanger={StateColor['delete']}
              onClick={() => handleAction('delete')}
              text={'刪除'}
            >
              <MdDeleteOutline />
            </IconButton>
          )}
        </Footer>
      )}
    </Container>
  );
};

export const CardBox = () => {
  const { Change } = useOutletContext();
  const setHasChange = Change[1];
  const { courseData, courseList, setCourseList } =
    useDataContext();
  const location = useLocation();
  const path = location.pathname.split('/')[2];

  const checkChange = () => {
    const changeList = courseList.filter((item, index) => {
      const course = courseData.find((data) => {
        return data.courseNo === item.courseNo;
      });

      const isNewCourse = !course;
      if (isNewCourse) return item;

      const isChangeState = course.state !== item.state;
      if (isChangeState) return item;
    });
    return !!changeList.length;
  };

  useEffect(() => {
    setCourseList([...courseData, ...courseList]);
    setHasChange(checkChange);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const waitCards = courseList
    .filter((item) => item.state !== 'done')
    .map((item) => {
      return (
        <li key={`${item.courseNo}`}>
          <Card item={item} />
        </li>
      );
    });
  const doneCards = courseList
    .filter((item) => item.state === 'done')
    .map((item) => (
      <li key={`${item.courseNo}`}>
        <Card item={item} />
      </li>
    ));

  return (
    <>
      {path === 'wait' && !waitCards.length && (
        <Empty>{`這裡沒有任何課程噢 >uO`}</Empty>
      )}
      {path === 'done' && !doneCards.length && (
        <Empty>{`這裡沒有任何課程噢 >uO`}</Empty>
      )}
      <Cards>
        {path === 'wait' && waitCards}
        {path === 'done' && doneCards}
      </Cards>
    </>
  );
};
