import React from "react";
import styled from "styled-components";
import { colors } from "../styles";
import { ButtonOption } from "components";
import { MdManageSearch, MdPerson } from "react-icons/md";
import { NavLink } from "react-router-dom";

const NavWrapper = styled.nav`
  position: fixed;
  max-width: 240px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: ${colors.background};
  box-shadow: 4px 0px 4px rgba(0,0,0,0.4);
  z-index: 1;
`;

const LogoBox = styled.div`
  height: 80px;
  background: #202020;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const LogoTitle = styled.div`
  font-size: 24px;
  color: ${colors.white};
`;

const OptionTitle = styled.div`
  color: ${colors.gray300};
  font-size: 14px;
  padding: 4px 10px;
`;

const NavOption = styled.li`
  margin-bottom: 4px;
  &:last-of-type {
    margin-bottom: 0;
  }
`

export const Navigation = () => {

  return (
    <>
      <NavWrapper>
        <LogoBox>
          <LogoTitle>師大選課系統</LogoTitle>
        </LogoBox>
        <OptionTitle>
          功能
        </OptionTitle>
        <ul>
          <NavOption>
            <NavLink to="/search">
              {({ isActive }) => (
                <ButtonOption option={"查詢課程"} active={isActive}>
                  <MdManageSearch />
                </ButtonOption>
              )}
            </NavLink>
          </NavOption>
          <NavOption>
            <NavLink to="/login">
              {({ isActive }) => (
                <ButtonOption option={"登入"} active={isActive}>
                  <MdPerson />
                </ButtonOption>
              )}
            </NavLink>
          </NavOption>
        </ul>
      </NavWrapper>
    </>
  )
};
