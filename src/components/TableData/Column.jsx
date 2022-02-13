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
    Header: '序號',
    accessor: 'courseNo',
    width: 40,
    maxWidth: 60,
  },
  {
    Header: '課程名稱',
    accessor: 'chineseName',
    width: 200,
    maxWidth: 200,
  },
  {
    Header: '教師',
    accessor: 'teacher',
    width: 100,
    maxWidth: 100,
    show: true,
  },
  {
    Header: '時間地點',
    accessor: 'timeInfo',
    width: 100,
    maxWidth: 100,
  },
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
    id: 'isOrdered',
    width: 40,
    maxWidth: 40,
  },
];
