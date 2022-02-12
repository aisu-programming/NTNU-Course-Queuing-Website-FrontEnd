import React, { Fragment } from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import { useTable, useSortBy, useExpanded } from 'react-table';
import {
  MdKeyboardArrowUp,
  MdUnfoldMore,
  MdUnfoldLess,
} from 'react-icons/md';
import { columns, fakeData } from 'components/TableData';
import { Transition } from 'react-transition-group';

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
          height: 60px;
          padding: 10px 16px;
          vertical-align: middle;
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

const NavWrapper = styled.nav`
  position: fixed;
  max-width: 240px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: ${colors.background};
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const LogoBox = styled.div`
  height: 80px;
  background: #202020;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const LogoTitle = styled.div`
  font-size: 24px;
  color: ${colors.white};
`;

const OptionTitle = styled.div`
  color: ${colors.gray300};
  font-size: 14px;
  padding: 4px 10px;
`;

const NavOption = styled.li`
  margin-bottom: 4px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded
  );
  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps({
                  style: { width: column.width },
                })}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody key={'a'} {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          const isOdd = i % 2 == 1;
          const buildRowCell = row.cells.map((cell, i) => {
            return (
              <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
                  <ExpandTableRowOdd colSpan={visibleColumns.length}>
                    {/*
                        Inside it, call our renderRowSubComponent function. In reality,
                        you could pass whatever you want as props to
                        a component like this, including the entire
                        table instance. But for this example, we'll just
                        pass the row
                      */}
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
                    {/* {renderRowSubComponent({ row })} */}
                  </ExpandTableRowOdd>
                </tr>
              )}
              {row.isExpanded && !isOdd && (
                <tr>
                  <ExpandTableRowEven colSpan={visibleColumns.length}>
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
                    <div>吃屌屌</div>
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
