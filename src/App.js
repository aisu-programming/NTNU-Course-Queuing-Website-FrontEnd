import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import './App.css';
import { colors } from './styles';
import styled from 'styled-components';
// import Home from './pages/Home'
import { Login } from './pages';
import { LoginV2 } from './pages';
import { Home } from './pages';
import { Navigation } from './components';
import { Search, RushList, CardBox } from 'pages';

const BodyContainer = styled.div`
  width: 100%;
  min-width: 100vw;
  height: 100%;
  min-height: 100vh;
  background: ${colors.background};
  display: flex;
`;
const RightWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 240px;
`;

const App = () => {
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
      <BodyContainer>
        <Navigation></Navigation>
        <RightWrapper>{element}</RightWrapper>
      </BodyContainer>
    </>
  );
};

export default App;
