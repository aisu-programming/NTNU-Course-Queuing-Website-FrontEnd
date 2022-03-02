import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors, device } from 'styles';
import {
  useOutletContext,
  useLocation,
} from 'react-router-dom';
import {
  MdOutlineThumbUpAlt,
  MdOutlinePauseCircleOutline,
  MdDeleteOutline,
  MdLoop,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from 'react-icons/md';
import { IconButton } from 'components';
import {
  useDataContext,
  domain as Domain,
  domain_109 as Domain_109,
} from 'data';
import { CustomModal } from 'components/Modal';
import { v4 as uuidv4 } from 'uuid';
import Skeleton, {
  SkeletonTheme,
} from 'react-loading-skeleton';
import { GetList } from 'api';

const StateColor = {
  activate400: `${colors.active400}`,
  activate300: `${colors.active300}`,
  activate200: `${colors.active400}${colors.opacity60}`,
  activate100: `${colors.active300}${colors.opacity60}`,
  pause400: `${colors.pause400}`,
  pause300: `${colors.pause300}`,
  pause200: `${colors.pause400}${colors.opacity60}`,
  pause100: `${colors.pause300}${colors.opacity60}`,
  delete200: `${colors.gray400}`,
  delete100: `${colors.gray300}${colors.opacity40}`,
  successful400: `${colors.success400}`,
  successful300: `${colors.success300}`,
  delete: '#EC250C',
  blue400: '#4599f5',
  blue300: '#9fccff',
};

const Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  @media ${device.phone} {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`;
// Card
const Container = styled.div`
  border-radius: 4px;
  overflow: hidden;
`;
const Header = styled.div`
  display: flex;
  padding: 8px 12px;
  font-weight: ${(props) => (props.isWhite ? '400' : '500')};
  color: ${(props) => props.isWhite && colors.white};
  background: ${(props) =>
    StateColor[props.status + (400 - props.isChange)]};
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 16px 12px;
  background: ${(props) =>
    StateColor[props.status + (300 - props.isChange)]};
  h4 {
    color: ${(props) => props.isWhite && colors.white};
  }
  h5 {
    color: ${(props) =>
      props.isWhite ? colors.gray100 : colors.gray600};
  }

  @media ${device.phoneSmall} {
    grid-template-columns: 3fr 2fr;
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 12px;
  gap: 8px;
  background: ${(props) =>
    StateColor[props.status + (300 - props.isChange)]};
  border-top: 1px solid ${colors.black}${colors.opacity10};
`;
const TextBox = styled.div`
  display: flex;
  align-items: flex-start;
  overflow: hidden;
`;
const Title = styled.h5`
  font-size: 14px;
  color: ${colors.gray600};
  flex-shrink: 0;
  transform: translateY(1px);
`;
const Desc = styled.h4`
  color: ${colors.gray900};
  margin-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  span {
    margin-right: 4px;
    &:last-of-type {
      margin-right: 0px;
    }
  }
`;
const Reason = styled.span`
  font-size: 14px;
  color: ${colors.danger};
  margin-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const Text = styled.div`
  margin-left: 12px;
  &:first-of-type {
    margin-left: 0;
  }
`;
const Empty = styled.div`
  color: ${colors.gray300};
  font-size: 20px;
  margin: auto;
`;
const ModalContent = styled.div`
  width: 300px;
  // height: fit-px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ModalRadioBox = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  color: ${colors.white};
  cursor: pointer;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 0px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
const ModalTitle = styled.h4`
  font-size: 14px;
  color: ${colors.gray200};
  margin-bottom: 12px;
`;
const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  &:nth-child(3) {
    margin-bottom: 24px;
  }
`;
const ModalKey = styled.div`
  color: ${colors.gray200};
  font-size: 14px;
  margin-right: 12px;
  transform: translateY(1px);
`;
const ModalValue = styled.div`
  color: ${colors.white};
`;
const ModalRadioText = styled.div`
  font-size: 18px;
  margin-left: 12px;
`;

const RadioBox = ({ selected, setSelected, text }) => {
  const isSelect = selected === text;
  const handleSelected = (e) => {
    setSelected(e.currentTarget.dataset.value);
  };
  return (
    <ModalRadioBox
      key={uuidv4()}
      onClick={(e) => handleSelected(e)}
      data-value={text}
    >
      {isSelect && <MdRadioButtonChecked />}
      {!isSelect && <MdRadioButtonUnchecked />}
      <ModalRadioText>{text}</ModalRadioText>
    </ModalRadioBox>
  );
};

const Card = ({ item }) => {
  const { grade, courseData, courseTotal, setCourseTotal } =
    useDataContext();
  const {
    status,
    pauseReason,
    courseNo,
    chineseName,
    department,
    teacher,
    timeInfo,
    domains,
    domain,
  } = item;
  const [isOpen, setIsOpen] = useState(false);
  const [choice, setChoice] = useState(domain);
  const isWhite = status === 'delete';
  const isGU = department === '通識';
  const getDomainName = () => {
    if (!isGU) return 0;
    const dataBase = grade >= 109 ? Domain_109 : Domain;
    const generateBinary = () => {
      const binary = domains
        .toString(2)
        .padStart(10, '0')
        .split('');
      return binary;
    };
    const binaryDomain = generateBinary();
    const domainName = binaryDomain
      .map((item, index) => {
        if (item === '0') return '';
        return dataBase[index + 1];
      })
      .filter((item) => {
        return !!item;
      })
      .map((item) => {
        return item.label;
      });
    return domainName;
  };
  const domainNames = getDomainName();

  const isChange = () => {
    const courseItem = courseData.find((item) => {
      const isCourse = item.courseNo === courseNo;
      const isDone = item.status === 'successful';
      const isDataDone = status === 'successful';
      return !isDataDone && !isDone && isCourse;
    });
    const courseDoneItem = courseData.find((item) => {
      const isCourse = item.courseNo === courseNo;
      const isDone = item.status === 'successful';
      const isDataDone = status === 'successful';
      return isDataDone && isCourse && isDone;
    });

    if (!courseItem && courseDoneItem) return 0;
    if (!courseItem) return 200;
    if (courseItem.status !== status) return 200;
    if (courseItem.domain !== domain) return 200;
    return 0;
  };

  const handleAction = (action) => {
    const changeStatus = courseTotal.map((item) => {
      const isDone = item.status === 'successful';
      const isCourse = item.courseNo === courseNo;
      if (!isDone && isCourse) {
        const updateCourse = {
          ...item,
          status: action,
        };
        return updateCourse;
      }
      return item;
    });
    setCourseTotal(changeStatus);
  };

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleSelect = () => {
    const changeStatus = courseTotal.map((item) => {
      const isDone = item.status === 'successful';
      const isCourse = item.courseNo === courseNo;
      if (!isDone && isCourse && isGU) {
        const updateCourse = {
          ...item,
          domain: choice,
        };
        return updateCourse;
      }
      return item;
    });
    setCourseTotal(changeStatus);
  };

  return (
    <>
      <Container>
        <Header
          isWhite={isWhite}
          status={status}
          isChange={isChange()}
        >
          <Text>{courseNo}</Text>
          <Text>{chineseName}</Text>
        </Header>
        <Content
          isWhite={isWhite}
          status={status}
          isChange={isChange()}
        >
          <TextBox>
            <Title>開課系所:</Title>
            <Desc>{department}</Desc>
          </TextBox>
          <TextBox>
            <Title>教師:</Title>
            <Desc>{teacher}</Desc>
          </TextBox>
          <TextBox style={{ gridColumn: '1/3' }}>
            <Title>時間地點:</Title>
            <Desc>{timeInfo}</Desc>
          </TextBox>
          <TextBox style={{ gridColumn: '1/3' }}>
            <Title>通識領域:</Title>
            <Desc>
              {(() => {
                if (!isGU) return '無';
                if (!domain) return '請選擇領域';
                if (!!domain) return domain;
              })()}
            </Desc>
          </TextBox>
          <TextBox style={{ gridColumn: '1/3' }}>
            <Title>狀態:</Title>
            <Desc>
              {(() => {
                const statusName = {activate: '刷課中...', pause: '暫停' , delete: '按下儲存即刪除'};
                return `${statusName[status]}`
              })()}
              {status === 'pause' && !!pauseReason && (
                <Reason>{`(${pauseReason})`}</Reason>
              )}
            </Desc>
          </TextBox>
        </Content>
        {status !== 'successful' && (
          <Footer status={status} isChange={isChange()}>
            {status !== 'delete' && item.department === '通識' && (
              <IconButton
                onClick={handleIsOpen}
                text={'變更領域'}
              >
                <MdLoop />
              </IconButton>
            )}
            {status !== 'activate' && (
              <IconButton
                onClick={() => handleAction('activate')}
                text={'刷'}
              >
                <MdOutlineThumbUpAlt />
              </IconButton>
            )}
            {status !== 'pause' && (
              <IconButton
                onClick={() => handleAction('pause')}
                text={'暫停'}
              >
                <MdOutlinePauseCircleOutline />
              </IconButton>
            )}
            {status !== 'delete' && (
              <IconButton
                isDanger={StateColor['delete']}
                onClick={() => handleAction('delete')}
                text={'刪除'}
              >
                <MdDeleteOutline />
              </IconButton>
            )}
          </Footer>
        )}
      </Container>
      {isGU && (
        <CustomModal
          isOpen={isOpen}
          handleConfirm={handleSelect}
          handleIsOpen={handleIsOpen}
          title='設定領域'
        >
          <ModalContent>
            <ModalTitle>{`請設定此課程的通識領域`}</ModalTitle>
            <ModalWrapper>
              <ModalKey>課程序號</ModalKey>
              <ModalValue>{courseNo}</ModalValue>
            </ModalWrapper>
            <ModalWrapper>
              <ModalKey>課程名稱</ModalKey>
              <ModalValue>{chineseName}</ModalValue>
            </ModalWrapper>
            {domainNames &&
              domainNames.map((domainName) => {
                return (
                  <RadioBox
                    key={uuidv4()}
                    selected={choice}
                    setSelected={setChoice}
                    text={domainName}
                  />
                );
              })}
          </ModalContent>
        </CustomModal>
      )}
    </>
  );
};

export const CardBox = () => {
  const { Change, Loading } = useOutletContext();
  const setHasChange = Change[1];
  const [loading, setLoading] = Loading;

  const {
    courseData,
    courseList,
    courseTotal,
    setCourseData,
    setCourseTotal,
  } = useDataContext();
  const location = useLocation();
  const path = location.pathname.split('/')[2];

  const checkChange = () => {
    const changeList = courseTotal.filter((item) => {
      const course = courseData.find((data) => {
        return data.courseNo === item.courseNo;
      });

      const isNewCourse = !course;
      if (isNewCourse) return true;

      const isChangeStatus = course.status !== item.status;
      if (isChangeStatus) return true;

      const isChangeDomain = course.domain !== item.domain;
      if (isChangeDomain) return true;

      return false;
    });
    return !!changeList.length;
  };

  useEffect(() => {
    setHasChange(checkChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await GetList();
      setCourseData(data);
      setLoading(false);
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCourseTotal([...courseList, ...courseData]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseData, courseList]);

  useEffect(() => {
    setHasChange(checkChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseTotal]);

  const waitCards = courseTotal
    .filter((item) => item.status !== 'successful')
    .map((item) => {
      return (
        <li key={uuidv4()}>
          <Card item={item} />
        </li>
      );
    });
  const doneCards = courseTotal
    .filter((item) => item.status === 'successful')
    .map((item) => {
      return (
        <li key={uuidv4()}>
          <Card item={item} />
        </li>
      );
    });
  return (
    <>
      <Cards>
        {!loading && path === 'wait' && waitCards}
        {!loading && path === 'done' && doneCards}
        {loading && (
          <SkeletonTheme
            baseColor={colors.gray500}
            highlightColor={colors.gray400}
            duration={1.2}
          >
            {[...Array(6)].map((_) => {
              return <Skeleton key={uuidv4()} height={200} />;
            })}
          </SkeletonTheme>
        )}
      </Cards>
      {!loading && path === 'wait' && !waitCards.length && (
        <Empty>{`這裡沒有任何課程噢 >uO`}</Empty>
      )}
      {!loading && path === 'done' && !doneCards.length && (
        <Empty>{`這裡沒有任何課程噢 >uO`}</Empty>
      )}
    </>
  );
};
