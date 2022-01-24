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
      element: <Home />,
      children: [{ path: ":id", element: <Login /> }],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/loginV2",
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
    // <Router>
    //   <Route path='/' component={Home}/>
    // </Router>
    // <div className="App">
    //   {/* <Route path="/" component = {Home}/> */}
    //   {/* <Route path="/login" component = {Login}/> */}
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <Link to='/login'>Login</Link>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
};

export default App;
