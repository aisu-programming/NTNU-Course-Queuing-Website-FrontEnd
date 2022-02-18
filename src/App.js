import React, { useEffect } from 'react';
import {
  Navigate,
  Routes,
  Route,
  Outlet,
  useLocation,
} from 'react-router-dom';
import './App.css';
import { colors, size } from 'styles';
import styled from 'styled-components';
import {
  Home,
  Login,
  Search,
  RushList,
  CardBox,
  Disclaimer,
} from 'pages';
import { Navigation } from 'components';
import { useDataContext } from 'data';
import { useMediaQuery } from 'react-responsive';
import { useCookies } from 'react-cookie';
import { ToastContainer } from 'react-toastify';

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

const PrivateOutlet = ({ to = '/login', reverse = false }) => {
  const [cookies] = useCookies();

  if (reverse) {
    return !cookies.jwt ? <Outlet /> : <Navigate to={to} />;
  }
  return !!cookies.jwt ? <Outlet /> : <Navigate to={to} />;
};

const App = () => {
  const { courseList, setGrade, setCourseList, setIsLogin } =
    useDataContext();
  const isTable = useMediaQuery({ maxWidth: size.table });
  const isPhone = useMediaQuery({ maxWidth: size.phone });
  const [cookies] = useCookies();
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    setIsLogin(!!cookies.jwt);
    if (!!cookies.year) {
      setGrade(parseInt(cookies.year));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCourseList([...courseList]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return (
    <BodyContainer isRWD={isPhone}>
      <Navigation />
      <RightWrapper isTable={isTable} isPhone={isPhone}>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/login'
            element={<PrivateOutlet to={'/'} reverse={true} />}
          >
            <Route path='' element={<Login />} />
          </Route>
          <Route path='/search' element={<Search />} />
          <Route path='/disclaimer' element={<Disclaimer />} />
          <Route
            path='/rushlist'
            element={<PrivateOutlet to={'/'} />}
          >
            <Route path='' element={<RushList />}>
              <Route
                path=''
                element={<Navigate to='/rushlist/wait' />}
              />
              <Route path='wait' element={<CardBox />} />
              <Route path='done' element={<CardBox />} />
              <Route
                path='*'
                element={<Navigate to='/rushlist/wait' />}
              />
            </Route>
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </RightWrapper>
    </BodyContainer>
  );
};

export default App;
