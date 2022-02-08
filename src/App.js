import React from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import { colors } from "./styles";
import styled from "styled-components";
// import Home from './pages/Home'
import { Login } from "./pages";
import { LoginV2 } from "./pages";
import { Home } from "./pages";
import { Navigation } from "./components";
import { Search } from "pages";

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
      path: "/",
      element: <LoginV2 />,
      children: [{ path: ":id", element: <Login /> }],
    },
    {
      path: "/login",
      element: <LoginV2 />,
    },
    {
      path: "/search",
      element: <Search />,
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
