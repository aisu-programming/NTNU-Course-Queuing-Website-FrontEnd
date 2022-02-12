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

export const columns = (lists=[2952]) => {
  const checkList = (id) => {
    return `${lists.includes(id)}`;
  }
  return (
    [
      {
        Header: '序號',
        accessor: 'serialNo',
        width: 60,
        maxWidth: 60,
      },
      {
        Header: '課程名稱',
        accessor: 'courseName',
        width: 200,
        maxWidth: 200,
      },
      {
        Header: '教師',
        accessor: 'teacher',
        width: 120,
        maxWidth: 120,
        show: true,
      },
      {
        Header: '時間地點',
        accessor: 'time',
      },
      // {
      //   Header: '地點',
      //   accessor: 'place',
      // },
      // {
      //   Header: '教室',
      //   accessor: 'classroom',
      //   width: 80,
      //   maxWidth: 80,
      // },
      {
        Header: '開課系所',
        accessor: 'department',
      },
      {
        Header: '學分',
        accessor: 'credit',
        width: 60,
        maxWidth: 60,
      },
      {
        Header: () => null,
        id: 'expander',
        width: 40,
        maxWidth: 40,
        Cell: ({ row }) => (
          <IconWrapper
            isExpanded={row.isExpanded}
            {...row.getToggleRowExpandedProps()}
          >
            <MdExpandMore />
          </IconWrapper>
        ),
      },
      {
        Header: () => null,
        id: 'isInList',
        width: 40,
        maxWidth: 40,
        Cell: ({ row }) => (
          <div>
            {checkList(row.original.serialNo)}
            {row.getRowProps()}
          </div>
        ),
      },
    ]
  )
}

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