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
} from 'react-icons/md';
import { IconButton } from 'components';

const StateColor = {
  active400: `${colors.active400}`,
  active300: `${colors.active300}`,
  active200: `${colors.active400}${colors.opacity60}`,
  active100: `${colors.active300}${colors.opacity60}`,
  pause400: `${colors.pause400}`,
  pause300: `${colors.pause300}`,
  pause200: `${colors.pause400}${colors.opacity60}`,
  pause100: `${colors.pause300}${colors.opacity60}`,
  delete200: `${colors.gray400}`,
  delete100: `${colors.gray300}${colors.opacity40}`,
  done400: `${colors.success400}`,
  done300: `${colors.success300}`,
  delete: '#EC250C',
  blue400: '#4599f5',
  blue300: '#9fccff',
};

const Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  );
  gap: 20px;
  @media ${device.phone} {
    grid-template-columns: repeat(
      auto-fill,
      minmax(100%, 1fr)
    );
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
  font-weight: ${(props) =>
    props.isWhite ? '400' : '500'};
  color: ${(props) => props.isWhite && colors.white};
  background: ${(props) =>
    StateColor[props.state + (400 - props.isChange)]};
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 16px 12px;
  background: ${(props) =>
    StateColor[props.state + (300 - props.isChange)]};
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
    StateColor[props.state + (300 - props.isChange)]};
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
  transform: translate(0, 2px);
`;
const Desc = styled.h4`
  color: ${colors.gray900};
  margin-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
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
const Card = ({
  originalData,
  copyData,
  setCopyData,
  item,
}) => {
  const {
    state,
    id,
    name,
    department,
    teacher,
    time,
    place,
  } = item;
  const isWhite = state === 'delete';
  const originalItem = originalData.find((item) => {
    return item.id === id;
  });

  const isChange = () => {
    if (originalItem.state !== state) return 200;
    return 0;
  };

  const handleAction = (action) => {
    const findIndex = copyData.map((item) => {
      if (item.id === id) {
        const copy = {
          ...item,
          state: action,
        };
        return copy;
      }
      return item;
    });
    setCopyData(findIndex);
  };

  return (
    <Container>
      <Header
        isWhite={isWhite}
        state={state}
        isChange={isChange()}
      >
        <Text>{id}</Text>
        <Text>{name}</Text>
      </Header>
      <Content
        isWhite={isWhite}
        state={state}
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
          <Desc>
            {time} {place}
          </Desc>
        </TextBox>
        <TextBox style={{ gridColumn: '1/3' }}>
          <Title>通識領域:</Title>
          <Desc>無</Desc>
        </TextBox>
      </Content>
      {state !== 'done' && (
        <Footer state={state} isChange={isChange()}>
          {state === 'pause' && item.department === '通識' && (
            <IconButton
              handleEvent={() => handleAction('pause')}
              text={'變更領域'}
            >
              <MdLoop />
            </IconButton>
          )}
          {state !== 'active' && (
            <IconButton
              handleEvent={() => handleAction('active')}
              text={'搶'}
            >
              <MdOutlineThumbUpAlt />
            </IconButton>
          )}
          {state !== 'pause' && (
            <IconButton
              handleEvent={() => handleAction('pause')}
              text={'暫停'}
            >
              <MdOutlinePauseCircleOutline />
            </IconButton>
          )}
          {state !== 'delete' && (
            <IconButton
              isDanger={StateColor['delete']}
              handleEvent={() => handleAction('delete')}
              text={'刪除'}
            >
              <MdDeleteOutline />
            </IconButton>
          )}
        </Footer>
      )}
    </Container>
  );
};

export const CardBox = () => {
  const { dataText, changeText } = useOutletContext();
  const [hasChange, setHasChange] = changeText;
  const [data, setData] = dataText;
  const [copyData, setCopyData] = useState([]);
  const location = useLocation();
  const path = location.pathname.split('/')[2];

  const checkChange = () => {
    const changeList = copyData.filter((item, index) => {
      const state = data[index].state;
      if (item.state !== state) {
        return item;
      }
    });
    return !!changeList.length;
  };

  useEffect(() => {
    setCopyData([...data]);
  }, [data]);

  useEffect(() => {
    setHasChange(checkChange());
  }, [copyData]);

  const waitCards = copyData
    .filter((item) => item.state !== 'done')
    .map((item) => {
      return (
        <li key={`${item.id}`}>
          <Card
            originalData={data}
            copyData={copyData}
            setCopyData={setCopyData}
            item={item}
          />
        </li>
      );
    });
  const doneCards = copyData
    .filter((item) => item.state === 'done')
    .map((item) => (
      <li key={`${item.id}`}>
        <Card
          originalData={data}
          copyData={copyData}
          setCopyData={setCopyData}
          item={item}
        />
      </li>
    ));

  return (
    <>
      {path === 'wait' && !waitCards.length && (
        <Empty>{`這裡沒有任何課程噢 >uO`}</Empty>
      )}
      {path === 'done' && !doneCards.length && (
        <Empty>{`這裡沒有任何課程噢 >uO`}</Empty>
      )}
      <Cards>
        {path === 'wait' && waitCards}
        {path === 'done' && doneCards}
      </Cards>
    </>
  );
};
