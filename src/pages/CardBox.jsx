import React, { useEffect } from 'react';
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
} from 'react-icons/md';
import { IconButton } from 'components';

const StateColor = {
  active400: `${colors.active400}`,
  active300: `${colors.active300}`,
  pause400: `${colors.pause400}`,
  pause300: `${colors.pause300}`,
  unSave400: `${colors.gray400}`,
  unSave300: `${colors.gray300}${colors.opacity40}`,
  done400: `${colors.success400}`,
  done300: `${colors.success300}`,
  delete: '#EC250C',
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
  background: ${(props) => StateColor[props.state + 400]};
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 16px 12px;
  background: ${(props) => StateColor[props.state + 300]};
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
  background: ${(props) => StateColor[props.state + 300]};
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
const Card = ({ data, setData, item }) => {
  const {
    state,
    id,
    name,
    department,
    teacher,
    time,
    place,
  } = item;
  const isWhite = state === 'unSave';
  const handleAction = (action) => {
    const findIndex = data
      .map((item) => {
        if (item.id === id) {
          item.state = action;
        }
        return item;
      })
      .filter((item) => {
        return item.state !== 'delete';
      });
    console.log(findIndex);
    setData(findIndex);
  };
  return (
    <Container>
      <Header isWhite={isWhite} state={state}>
        <Text>{id}</Text>
        <Text>{name}</Text>
      </Header>
      <Content isWhite={isWhite} state={state}>
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
      </Content>
      {state !== 'done' && (
        <Footer state={state}>
          {state === 'pause' && item.department === '通識' && (
            <IconButton
              handleEvent={() => handleAction('pause')}
              text={'變更領域'}
            >
              <MdOutlinePauseCircleOutline />
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
          <IconButton
            isDanger={StateColor['delete']}
            handleEvent={() => handleAction('delete')}
            text={'刪除'}
          >
            <MdDeleteOutline />
          </IconButton>
        </Footer>
      )}
    </Container>
  );
};
export const CardBox = () => {
  const [data, setData] = useOutletContext();
  const location = useLocation();
  const path = location.pathname.split('/')[2];

  const data0 = {
    state: 'active',
    id: '1487',
    name: '離散數學',
    department: '資工系',
    teacher: '王弘倫',
    time: '一 3 4',
    place: '分部',
  };
  const data1 = {
    state: 'pause',
    id: '1488',
    name: '離散數學',
    department: '資工系',
    teacher: '王弘倫',
    time: '一 3 4',
    place: '分部',
  };
  const data2 = {
    state: 'unSave',
    id: '1489',
    name: '離散數學',
    department: '資工系',
    teacher: '王弘倫',
    time: '一 3 4',
    place: '分部',
  };
  const data3 = {
    state: 'done',
    id: '1490',
    name: '離散數學',
    department: '資工系',
    teacher: '王弘倫',
    time: '一 3 4',
    place: '分部',
  };
  const data4 = {
    state: 'active',
    id: '1491',
    name: '離散數學',
    department: '通識',
    teacher: '王弘倫',
    time: '一 3 4',
    place: '分部',
  };
  const datas = [
    data0,
    data1,
    data2,
    data3,
    data4,
    // data2,
    // data1,
    // data3,
    // data3,
  ];

  useEffect(() => {
    setData(datas);
  }, []);

  const waitCards = data
    .filter((item) => item.state !== 'done')
    .map((item) => {
      return (
        <li key={`${item.id}`}>
          <Card data={data} setData={setData} item={item} />
        </li>
      );
    });
  const doneCards = data
    .filter((item) => item.state === 'done')
    .map((item) => (
      <li key={`${item.id}`}>
        <Card data={data} setData={setData} item={item} />
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
