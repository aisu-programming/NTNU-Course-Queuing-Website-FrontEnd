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
  const studentId = news.map((item) => item.student_id);
  const time = news.map((item) =>
    moment(item.succeedTime).format('MM/D HH:m')
  );

  const User = ({ index }) => {
    const i = index % news.length;

    return (
      <News>
        {`恭喜! `}
        <span>{studentId[i]}</span>
        {` 同學~ 於 `}
        <span>{time[i]}</span>
        {` 搶到了 `}
        <span>
          {courseId[i]} {courseName[i]}
        </span>
        {` !`}
      </News>
    );
  };

  return (
    <Ticker move={!stop} offset='run-in' speed={10}>
      {({ index }) => <User index={index} />}
    </Ticker>
  );
};