import React, { useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import './App.css';
import { colors, size } from 'styles';
import styled from 'styled-components';
import {
  Home,
  LoginV2,
  Search,
  RushList,
  CardBox,
} from 'pages';
import { Navigation } from 'components';
import { DataProvider } from 'data';
import { useMediaQuery } from 'react-responsive';
import { useCookies } from 'react-cookie';

const BodyContainer = styled.div`
  width: 100%;
  min-width: 100vw;
  height: 100%;
  min-height: 100vh;
  background: ${colors.background};
  display: flex;
  flex-direction: ${(props) =>
    props.isRWD ? 'column' : 'row'};
`;

const RightWrapper = styled.div`
  // width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  ${(props) => {
    if (props.isTable && !props.isPhone)
      return 'margin-left: 60px';
    if (props.isPhone) return 'margin-top: 60px';
    return 'margin-left: 240px';
  }};
`;

const App = () => {
  const isTable = useMediaQuery({ maxWidth: size.table });
  const isPhone = useMediaQuery({ maxWidth: size.phone });
  const [cookies, setCookie, removeCookie] = useCookies([
    'jwt',
  ]);
  // console.log(cookies);
  const element = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <LoginV2 />,
    },
    {
      path: '/search',
      element: <Search />,
    },
    {
      path: '/rushlist',
      element: <RushList />,
      children: [
        {
          path: '',
          element: <Navigate to='/rushlist/wait' />,
        },
        {
          path: 'wait',
          element: <CardBox />,
        },
        { path: 'done', element: <CardBox /> },
        {
          path: '*',
          element: <Navigate to='/rushlist/wait' />,
        },
      ],
    },
  ]);
  return (
    <DataProvider>
      <BodyContainer isRWD={isPhone}>
        <Navigation />
        <RightWrapper isTable={isTable} isPhone={isPhone}>
          {element}
        </RightWrapper>
      </BodyContainer>
    </DataProvider>
  );
};

export default App;
