import React from 'react';
import styled from 'styled-components';
import { colors, device, size } from 'styles';
import ScheduleSelector from 'react-schedule-selector';
import { format } from 'date-fns';
import zh_tw from 'date-fns/locale/zh_tw';
import { useMediaQuery } from 'react-responsive';

const DateLabel = styled.div`
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
`;

const TimeLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const ScheduleCell = styled.div`
  width: 48px;
  height: 32px;
  margin-bottom: 2px;
  display: flex;
  justify-content: center;
  align-item: center;
  cursor: pointer;
  background: ${(props) =>
    props.selected ? colors.primary : colors.gray500};
  &:hover {
    background: ${(props) => {
      // if (props.selected) return colors.gray500;
      return colors.primary + colors.opacity40;
    }}
  }

  @media ${device.phone} {
    width: 30px;
    height: 20px;
    &:hover {
      background: ${(props) =>
        props.selected ? colors.primary : colors.gray500};
    }
  }
`;

export const TimeSelector = ({ schedule, setSchedule }) => {
  const isPhone = useMediaQuery({ maxWidth: size.phone });

  const handleChange = (newSchedule) => {
    // console.log(newSchedule);
    // console.log(format(newSchedule[0], 'd H', { locale: zh_tw }));
    setSchedule(newSchedule);
  };

  const renderCustomDateCell = (time, selected, innerRef) => {
    return <ScheduleCell selected={selected} ref={innerRef} />;
  };

  const renderCustomDateLabel = (time) => {
    const dateFormat = isPhone ? 'dd' : 'dddd';
    const Label = format(time, dateFormat, { locale: zh_tw });
    return <DateLabel>{Label}</DateLabel>;
  };

  const renderCustomTimeLabel = (time) => {
    const Label = format(time, 'HH');
    const CourseTime = {
      11: 'A',
      12: 'B',
      13: 'C',
      14: 'D',
    };
    return (
      <TimeLabel>{Label < 11 ? Label : CourseTime[Label]}</TimeLabel>
    );
  };
  return (
    <ScheduleSelector
      selection={schedule}
      numDays={6}
      minTime={1}
      maxTime={15}
      columnGap={`${isPhone ? '6px' : '12px'}`}
      rowGap={'0px'}
      unselectedColor={`${colors.gray500}`}
      selectedColor={`${colors.primary}`}
      hoveredColor={`${colors.primary}${colors.opacity40}`}
      renderDateLabel={renderCustomDateLabel}
      renderTimeLabel={renderCustomTimeLabel}
      renderDateCell={renderCustomDateCell}
      startDate={new Date(2022, 2, 7)}
      onChange={handleChange}
    />
  );
};
