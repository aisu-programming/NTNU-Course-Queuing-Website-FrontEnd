import React, { Fragment, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { colors, size, device } from 'styles';
import {
  useTable,
  useExpanded,
  usePagination,
} from 'react-table';
import {
  MdOutlinePlaylistAdd,
  MdPlaylistAddCheck,
  MdFastRewind,
  MdSkipPrevious,
  MdSkipNext,
  MdFastForward,
} from 'react-icons/md';
import { columns } from 'components/TableData';
import { useMediaQuery } from 'react-responsive';
import { IconButton } from 'components';
import { useDataContext } from 'data';
import Skeleton, {
  SkeletonTheme,
} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { v4 as uuidv4 } from 'uuid';
import { convertDomains } from 'utils';
import { scroller } from 'react-scroll';

const Styles = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 240px);
  max-width: calc(100vw - 672px);
  // menu 240 + bodyPad 40 * 2 + search 300
  // marginLeft 12 + insidePad 20 * 2
  overflow-y: scroll;
  position: relative;
  border-radius: 6px;
  box-shadow: 2px 2px 4px ${colors.black}${colors.opacity20};

  @media ${device.table} {
    max-width: calc(100vw - 492px);
    // max-height: 100%;
  }
  @media ${device.phone} {
    max-width: calc(100vw);
    max-height: 100%;
  }

  table {
    width: 100%;
    color: ${colors.gray100};

    thead {
      tr {
        position: sticky;
        top: 0;
        background: ${colors.gray500};
        z-index: 1;

        th {
          // height: 60px;
          height: fit-content;
          padding: 10px 16px;
          vertical-align: middle;
          border-bottom: 2px solid ${colors.gray600};
          border-right: none;
          overflow: hidden;
          white-space: nowrap;
          // text-overflow: ellipsis;
          transform: translateY(2px);

          @media ${device.phone} {
            padding: 10px 12px;
            font-size: 14px;
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
          line-height: 1.2rem;
          &:last-of-type {
            padding: 0;
          }

          @media ${device.phone} {
            padding: 10px 10px;
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
`;
const Title = styled.h5`
  font-size: 14px;
  color: ${colors.gray200};
  margin-right: 8px;
`;
const Desc = styled.h4`
  font-size: 16px;
  color: ${colors.gray100};
`;

const shake = keyframes`
  from {
    transform: translate(-50%, -50%) translate(5px, 0px) rotate(1deg);
  }
  to {
    transform: translate(-50%, -50%) translate(-5px, 0px) rotate(-1deg);
  }
`;
const shake2 = keyframes`
from {
  transform: translate(5px, 0px);
  overflowY: hidden;
}
to {
  transform: translate(-5px, 0px);
  overflowY: hidden;
}
`;
const Empty = styled.div`
  width: fit-content;
  color: ${colors.gray300};
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${shake} 0.1s alternate ease-in-out 5;

  @media ${device.phone} {
    margin: auto;
    position: relative;
    inset: auto;
    transform: none;
    animation: ${shake2} 0.1s alternate ease-in-out 5;
    text-align: center;
    padding: 20px 0;
  }
`;
const PageRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: sticky;
  bottom: 0;
  padding: 4px 0;
  background: ${colors.gray600};
  margin-top: 8px;
`;
const PageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 4px;
  border-radius: 4px;
  margin-right: 4px;
  background: ${(props) =>
    props.disabled
      ? colors.gray500
      : colors.gray300 + colors.opacity50};
  cursor: ${(props) =>
    props.disabled ? 'default' : 'pointer'};
  svg {
    width: 1rem;
    height: 1rem;
    color: ${colors.white};
  }
`;
const PageText = styled.div`
  color: ${colors.white};
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 4px;
  margin-right: 4px;
  background: ${colors.gray500};
`;

const generateSkeleton = (isTable) => {
  const count = isTable ? 3 : 6;
  return (
    <tr key={uuidv4()}>
      {[...Array(count)].map((_) => (
        <td key={uuidv4()}>
          <Skeleton />
        </td>
      ))}
      <td></td>
    </tr>
  );
};

const ExpandRow = ({ row }) => {
  const { courseData, courseList, setCourseList } =
    useDataContext();
  const isTable = useMediaQuery({
    maxWidth: size.table,
  });
  const { courseNo, teacher, department, credit } =
    row.original;

  const hasCourse = () => {
    const checkList = (list) => {
      return !!list.find((item) => {
        return item.courseNo === courseNo;
      });
    };
    const originList = checkList(courseData);
    const tempList = checkList(courseList);

    if (originList || tempList) return true;
    return false;
  };

  const handleAdd = () => {
    if (hasCourse()) {
      // Handle Has Course
      // console.log('hasCourse!');
      return;
    }
    const addCourse = {
      ...row.original,
      status: 'pause',
      domain: convertDomains(row.original.domains)[0],
    };
    const newCourseList = [...courseList, addCourse];
    setCourseList(newCourseList);
  };

  return (
    <Container>
      {(() => {
        if (!isTable) {
          return (
            <LeftWrapper>
              <TextBox>
                <Title>這裡沒有更多資訊了 OuO</Title>
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
        <IconButton
          onClick={handleAdd}
          text={'搶課清單'}
          disableText={'已加入'}
          disabled={hasCourse()}
        >
          {hasCourse() && <MdPlaylistAddCheck />}
          {!hasCourse() && <MdOutlinePlaylistAdd />}
        </IconButton>
      </RightWrapper>
    </Container>
  );
};

const resetScrollInsideTable = () => {
  scroller.scrollTo('top', {
    duration: 800,
    delay: 0,
    smooth: 'easeOutQuint',
    containerId: 'rt-body',
  });
  scroller.scrollTo('table-top', {
    duration: 800,
    delay: 0,
    smooth: 'easeOutQuint',
    offset: -120,
  });
};

export const Table = ({ columns, data, loading }) => {
  const isTable = useMediaQuery({
    maxWidth: size.table,
  });
  const checkSize = () => {
    if (isTable) {
      return ['teacher', 'department', 'credit', 'isOrdered'];
    }
    return ['isOrdered'];
  };
  const hiddenColumn = checkSize();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    prepareRow,
    visibleColumns,
    setHiddenColumns,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 20,
        hiddenColumns: hiddenColumn,
      },
    },
    useExpanded,
    usePagination
  );
  useEffect(() => {
    setHiddenColumns(checkSize());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTable]);
  // Render the UI for your table

  return (
    <>
      <table name='top' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
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
          {loading && (
            <SkeletonTheme
              baseColor={colors.gray500}
              highlightColor={colors.gray400}
              duration={1.2}
            >
              {[...Array(12)].map((_) => {
                return generateSkeleton(isTable);
              })}
            </SkeletonTheme>
          )}
          {page.map((row, i) => {
            prepareRow(row);
            const isOdd = i % 2 === 1;
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
      {!!data.length && (
        <PageRow>
          <PageButton
            onClick={() => {
              resetScrollInsideTable(0);
              gotoPage(0);
              return;
            }}
            disabled={!canPreviousPage}
          >
            <MdFastRewind />
          </PageButton>
          <PageButton
            onClick={() => {
              resetScrollInsideTable(0);
              previousPage();
              return;
            }}
            disabled={!canPreviousPage}
          >
            <MdSkipPrevious />
          </PageButton>
          <PageButton
            onClick={() => {
              resetScrollInsideTable(0);
              nextPage();
              return;
            }}
            disabled={!canNextPage}
          >
            <MdSkipNext />
          </PageButton>
          <PageButton
            onClick={() => {
              resetScrollInsideTable(0);
              gotoPage(pageCount - 1);
              return;
            }}
            disabled={!canNextPage}
          >
            <MdFastForward />
          </PageButton>
          <PageText>
            {`第 ${pageIndex + 1} 頁 / 共 ${
              pageOptions.length
            } 頁`}
          </PageText>
        </PageRow>
      )}
    </>
  );
};

export const TableContainer = ({ data, loading }) => {
  const noData = () => {
    if (!data.length)
      return <Empty>抱歉，找不到任何課程噢 OuO</Empty>;
  };
  return (
    <Styles name='table-top' id='rt-body' className='rt-tbody'>
      <Table columns={columns} data={data} loading={loading} />
      {!loading && noData()}
    </Styles>
  );
};
