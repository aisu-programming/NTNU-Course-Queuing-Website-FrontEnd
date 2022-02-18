import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../styles';
import { useDataContext } from 'data';

const Option = styled.div`
  width: 100%;
  color: ${colors.gray200};
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) =>
    props.isActive ? colors.gray400 : 'none'};
  transition: 0.3s;

  svg,
  h4 {
    color: ${(props) => (props.isActive ? colors.white : '')};
    transform: ${(props) =>
      props.isActive ? 'translate(10px, 0)' : 'none'};
    transition: 0.3s ease;
  }
  &:hover {
    background: ${colors.gray400};
    svg,
    h4 {
      color: ${colors.white};
      transform: translate(10px, 0);
    }
  }

  svg {
    height: 24px;
    width: 24px;
    margin-right: 10px;
    flex-shrink: 0;
  }
`;
const OptionRWD = styled(Option)`
  padding: 8px;

  svg,
  h4 {
    transform: none;
  }
  &:hover {
    svg,
    h4 {
      transform: none;
    }
  }
  svg {
    margin-right: 0;
  }
`;

const Text = styled.h4`
  position: relative;
  top: 1px;
  font-size: 16px;
  letter-spacing: 2px;
  white-space: nowrap;
`;
const Alert = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 2px 6px;
  margin-left: auto;
  display: flex;
  align-items: center;
  background: ${colors.danger};
  border-radius: 20px;
`;
const AlertCount = styled.h5`
  color: ${colors.white}${colors.opacity90};
  font-size: 14px;
  transform: translateY(1px);
`;

export const changeCourseCount = (originData, alterData) => {
  const newData = alterData.filter((item) =>
    item.hasOwnProperty('isOrdered')
  );
  const oldData = alterData.filter(
    (item) => !item.hasOwnProperty('isOrdered')
  );
  const changeData = oldData.filter((item) => {
    const findData = originData.find((i) => {
      return i.courseNo === item.courseNo;
    });
    if (findData.status !== item.status) return true;
    if (findData.domain !== item.domain) return true;
    return false;
  });
  const changes = [...newData, ...changeData];
  return changes.length;
};

export const ButtonOption = ({
  isRWD,
  hasAlert,
  option,
  active,
  children,
}) => {
  const {
    courseData,
    courseList,
    courseTotal
  } = useDataContext();
  const [count, setCount] = useState();

  useEffect(() => {
    const changes = changeCourseCount(courseData, [...courseList, ...courseData]);
    setCount(changes);
  }, [courseList, courseTotal]);

  useEffect(() => {
    const changes = changeCourseCount(courseData, courseTotal);
    setCount(changes);
  }, [courseTotal]);

  return (
    <>
      {!isRWD && (
        <Option isActive={active}>
          {children}
          <Text>{option}</Text>
          {hasAlert && !!count && (
            <Alert>
              <AlertCount>{count}</AlertCount>
            </Alert>
          )}
        </Option>
      )}
      {isRWD && (
        <OptionRWD isActive={active}>{children}</OptionRWD>
      )}
    </>
  );
};
