import React, { useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import './App.css';
import { colors, size } from 'styles';
import styled from 'styled-components';
// import Home from './pages/Home'
import { Login } from './pages';
import { LoginV2 } from './pages';
import { Home } from './pages';
import { Navigation } from './components';
import { Search, RushList, CardBox } from 'pages';
import { useMediaQuery } from 'react-responsive';

const BodyContainer = styled.div`
  width: 100%;
  min-width: 100vw;
  height: 100%;
  min-height: 100vh;
  background: ${colors.background};
  display: flex;
  flex-direction: ${props => props.isRWD ? 'column' : 'row'};
`;

const RightWrapper = styled.div`
  // width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  ${props => {
    if (props.isTable && !props.isPhone) return 'margin-left: 60px';
    if (props.isPhone) return 'margin-top: 60px';
    return 'margin-left: 240px';
  }};
`;

const App = () => {
  const isTable = useMediaQuery({ maxWidth: size.table });
  const isPhone = useMediaQuery({ maxWidth: size.phone });

  const element = useRoutes([
    {
      path: '/',
      element: <LoginV2 />,
      children: [{ path: ':id', element: <Login /> }],
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
        { path: '', element: <Navigate to='/rushlist/wait' /> },
        { path: 'wait', element: <CardBox /> },
        { path: 'done', element: <CardBox /> },
        { path: '*', element: <Navigate to='/rushlist/wait' /> },
      ],
    },
  ]);
  return (
    <>
      <BodyContainer isRWD={isPhone}>
        <Navigation />
        <RightWrapper isTable={isTable} isPhone={isPhone}>{element}</RightWrapper>
      </BodyContainer>
    </>
  );
};

export default App;
