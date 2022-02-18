import React from 'react';
import styled from 'styled-components';
import Ticker from 'react-ticker';
import { colors } from 'styles';
import moment from 'moment';

const News = styled.h4`
  color: ${colors.gray100};
  white-space: nowrap;
  margin-right: 20px;
  padding: 8px;

  span {
    color: ${colors.primary};
    padding: 4px 8px;
    background: ${colors.gray500};
    border-radius: 4px;
  }
`;

export const NewsTicker = ({ news, stop }) => {
  moment.locale('zh-tw');

  const courseId = news.map((item) => item.courseNo);
  const courseName = news.map((item) => item.chineseName);
  const studentId = news.map((item) => {
    const year = item.student_id.slice(0, 3);
    const dept = `***`;
    const id = item.student_id.slice(6, 9);
    return `${year}${dept}${id}`;
  });
  const time = news.map((item) =>
    moment(item.succeedTime).format('MM/DD HH:mm')
  );

  const User = ({ index }) => {
    const i = index % news.length;
    return (
      <>
        {!news && <News> 目前還沒有人搶到課程噢~ </News>}
        {!!news && (
          <News>
            {`恭喜! `}
            <span>{studentId[i]}</span>
            {` 同學~ 於 `}
            <span>{time[i]}</span>
            {` 刷到了 `}
            <span>
              {courseId[i]} {courseName[i]}
            </span>
            {` !`}
          </News>
        )}
      </>
    );
  };

  return (
    <Ticker move={!stop} offset='run-in' speed={10}>
      {({ index }) => <User index={index} />}
    </Ticker>
  );
};
