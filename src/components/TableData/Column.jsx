import React from 'react';
import styled from 'styled-components';
import { MdExpandMore } from 'react-icons/md';

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 20px;
    height: 20px;
    transform: ${(props) =>
      props.isExpanded ? `rotate(-180deg)` : `none`};
    transition: 0.3s;
  }
`;

export const columns = [
  {
    Header: '開課序號',
    accessor: 'serialNo',
    width: 100,
    minWidth: 50,
  },
  {
    Header: '課程名稱',
    accessor: 'courseName',
  },
  {
    Header: '教師',
    accessor: 'teacher',
  },
  {
    Header: '時間',
    accessor: 'time',
  },
  {
    Header: '地點',
    accessor: 'place',
  },
  {
    Header: '教室',
    accessor: 'classroom',
  },
  {
    Header: '開課系所',
    accessor: 'department',
  },
  {
    Header: '學分',
    accessor: 'credit',
  },
  {
    Header: () => null,
    id: 'expander',
    width: 50,
    Cell: ({ row }) => (
      <IconWrapper
        isExpanded={row.isExpanded}
        {...row.getToggleRowExpandedProps()}
      >
        <MdExpandMore />
      </IconWrapper>
    ),
  },
];

export const fakeData = {
  serialNo: 2952,
  courseName: '離散數學',
  teacher: '王弘倫',
  time: '一 8',
  place: '公館',
  classroom: 'E 102',
  department: '資工系',
  credit: '3',
};


// export const appendData = (data) =>{
  
// }