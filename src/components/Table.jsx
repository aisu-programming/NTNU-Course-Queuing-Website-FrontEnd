import React, {
  useState,
  Fragment,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { colors, size, device } from 'styles';
import { useTable, useExpanded } from 'react-table';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { columns, fakeData } from 'components/TableData';
import { useMediaQuery } from 'react-responsive';
import { IconButton } from 'components';

const Styles = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 240px);
  max-width: calc(100vw - 672px);
  // menu 240 + bodyPad 40 * 2 + search 300
  // marginLeft 12 + insidePad 20 * 2
  overflow-y: scroll;
  border-radius: 6px;
  box-shadow: 2px 2px 4px ${colors.black}${colors.opacity20};

  @media ${device.table} {
    max-width: calc(100vw - 492px);
    // max-height: 100%;
  }
  @media ${device.phone} {
    max-width: calc(100vw);
    // max-height: 100%;
  }

  table {
    width: 100%;
    color: ${colors.gray100};

    thead {
      // color: ${colors.primary};
      tr {
        position: sticky;
        top: 0;
        background: ${colors.gray500};
        border-bottom: 2px solid ${colors.gray600};
        th {
          // height: 60px;
          height: fit-content;
          padding: 10px 16px;
          vertical-align: middle;

          @media ${device.phone} {
            padding: 10px 12px;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            // transform: translateY(2px);
          }
        }
      }
    }

    tbody {
      color: ${colors.gray200};
      tr {
        // background: ${colors.gray400}${colors.opacity60};
        height: 48px;
        // &:nth-child(even) {
        //   background: ${colors.gray500}${colors.opacity60};
        // }
        td {
          padding: 10px 16px;
          vertical-align: middle;
          &:last-of-type {
            padding: 0;
          }
        }
      }
    }

    // thead {
    //   overflow-y: auto;
    //   overflow-x: hidden;
    // }

    tbody {
      ${
        '' /* These styles are required for a scrollable table body */
      }
      overflow-y: scroll;
      overflow-x: hidden;
      height: fit-content;
    }
    tr {
      // :last-child {
      //   td {
      //     border-bottom: 0;
      //   }
      // }
    }

    th,
    td {
      border-right: 1px solid ${colors.gray600}${colors.opacity20};
      :last-child {
        border-right: 0;
      }
    }
  }
`;

const TableRowOdd = styled.tr`
  background: ${colors.gray400}${colors.opacity60};
`;
const TableRowEven = styled.tr`
  background: ${colors.gray500}${colors.opacity60};
`;

const ExpandTableRowOdd = styled.td`
  transition: 0.3s;
  background: ${colors.gray400}${colors.opacity60};
  box-shadow: inset 0 8px 10px -8px ${colors.black}${colors.opacity60};
`;
const ExpandTableRowEven = styled.td`
  background: ${colors.gray500}${colors.opacity60};
  box-shadow: inset 0 8px 10px -8px ${colors.black}${colors.opacity60};
`;

const Container = styled.div`
  padding: 16px;
  display: flex;

  @media ${device.table} {
    padding: 24px 16px 16px;
  }
`;
const Wrapper = styled.div`
  flex: 1;
`;
const LeftWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const RightWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: flex-end;
`;
const TextBox = styled.div`
  display: flex;
  margin-bottom: 16px;
  &:last-of-type {
    margin-bottom: 0;
  }
`
const Title = styled.h5`
  font-size: 14px;
  color: ${colors.gray200};
  margin-right: 8px;
  transform: translateY(2px);
`
const Desc = styled.h4`
  font-size: 16px;
  color: ${colors.gray100};
`

const ExpandRow = ({ row }) => {
  const isTable = useMediaQuery({
    maxWidth: size.table,
  });
  const { teacher, department, credit } = row.original;

  return (
    <Container>
      {(() => {
        if (!isTable) {
          return (
            <LeftWrapper>
              <TextBox>
                <Title>
                  這裡沒有更多資訊了 OuO
                </Title>
              </TextBox>
            </LeftWrapper>
          );
        }
        return (
          <LeftWrapper>
            <TextBox>
              <Title>老師:</Title>
              <Desc>{teacher}</Desc>
            </TextBox>
            <TextBox>
              <Title>系所:</Title>
              <Desc>{department}</Desc>
            </TextBox>
            <TextBox>
              <Title>學分:</Title>
              <Desc>{credit}</Desc>
            </TextBox>
          </LeftWrapper>
        );
      })()}
      <RightWrapper>
        <IconButton text={'搶課清單'}>
          <MdOutlinePlaylistAdd />
        </IconButton>
      </RightWrapper>
    </Container>
  );
};

export const Table = ({ columns, data }) => {
  const [list, setList] = useState([]);
  const isTable = useMediaQuery({
    maxWidth: size.table,
  });
  const isPhone = useMediaQuery({ maxWidth: size.phone });
  const checkSize = () => {
    if (isTable) {
      return [
        'teacher',
        'department',
        'credit',
        'isInList',
      ];
    }
    return ['isInList'];
  };
  const hiddenColumn = checkSize();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    setHiddenColumns,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: hiddenColumn,
      },
    },
    useExpanded
  );
  useEffect(() => {
    setHiddenColumns(checkSize());
  }, [isTable]);
  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr
            key={i}
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps({
                  style: {
                    width: column.width,
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  },
                })}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          const isOdd = i % 2 == 1;
          const buildRowCell = row.cells.map((cell, i) => {
            return (
              <td {...cell.getCellProps()}>
                {cell.render('Cell')}
              </td>
            );
          });
          return (
            <Fragment key={i}>
              {isOdd ? (
                <TableRowOdd {...row.getRowProps()}>
                  {buildRowCell}
                </TableRowOdd>
              ) : (
                <TableRowEven {...row.getRowProps()}>
                  {buildRowCell}
                </TableRowEven>
              )}

              {row.isExpanded && isOdd && (
                <tr>
                  <ExpandTableRowOdd
                    colSpan={visibleColumns.length}
                  >
                    {console.log(row)}
                    <ExpandRow row={row} />
                    {/* {renderRowSubComponent({ row })} */}
                  </ExpandTableRowOdd>
                </tr>
              )}
              {row.isExpanded && !isOdd && (
                <tr>
                  <ExpandTableRowEven
                    colSpan={visibleColumns.length}
                  >
                    <ExpandRow row={row} />
                  </ExpandTableRowEven>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export const Test = ( {data} ) => {
  console.log(data);

  return (
    <Styles>
      <Table
        columns={columns}
        data={data}
      />
    </Styles>
  );
};
