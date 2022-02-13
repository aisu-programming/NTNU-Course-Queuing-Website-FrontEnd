import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../styles';
import { ButtonOption } from 'components';
import {
  MdManageSearch,
  MdPerson,
  MdViewModule,
  MdDoubleArrow,
  MdMenu,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { size } from 'styles';

const LayOut = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${(props) =>
    props.isPhone ? 'calc(100vh - 60px)' : '100vh'};
  overflow: hidden;
  background: ${colors.black}${colors.opacity50};
  backdrop-filter: blur(1px);
  z-index: 2;
  margin-top: ${(props) => props.isPhone && '60px'};
`;

const NavWrapper = styled.nav`
  position: fixed;
  max-width: 240px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: ${colors.background};
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.4);
  z-index: 2;
`;
const NavWrapperRWD = styled(NavWrapper)`
  max-width: ${(props) =>
    props.isFold ? '60px' : '240px'};
  padding: 20px 10px;
  transition: 0.3s;
`;

const NavBar = styled.nav`
  position: fixed;
  width: 100%;
  max-height: 60px;
  padding: 10px;
  background: ${colors.background};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
  z-index: 2;
  display: flex;
`;
const NavWrapperPhoneRWD = styled(NavWrapper)`
  max-width: ${(props) => (props.isFold ? '0px' : '240px')};
  height: calc(100% - 60px);
  top: 0;
  left: 0;
  margin-top: 60px;
`;

const HamburgerIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.gray500};
  border-radius: 4px;
  cursor: pointer;

  svg {
    width: 32px;
    height: 32px;
    color: ${colors.white};
  }
`;

const LogoBox = styled.div`
  height: 80px;
  background: #202020;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;
const LogoBoxRWD = styled(LogoBox)`
  height: 40px;
`;

const LogoTitle = styled.div`
  font-size: 24px;
  color: ${colors.white};
`;

const OptionTitle = styled.div`
  color: ${colors.gray300};
  font-size: 14px;
  padding: 4px 10px;
  margin-top: 16px;
  &:first-of-type {
    margin-top: 0;
  }
`;
const OptionTitleRWD = styled(OptionTitle)`
  width: 100%;
  padding: 4px 0;
  text-align: ${(props) =>
    props.isFold ? 'center' : 'left'};
`;

const FoldButtonRWD = styled.div`
  position: absolute;
  right: -18px;
  transform: translateY(-36px);
  width: 32px;
  height: 32px;
  background: ${colors.black}${colors.opacity60};
  box-shadow: 2px 0 4px ${colors.black}${colors.opacity40};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    color: white;
    transform: ${(props) =>
      props.isFold ? 'none' : 'rotate(-180deg)'};
    transition: 0.1s;
  }
`;

const NavOption = styled.li`
  margin-bottom: 4px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Navigation = () => {
  const isTable = useMediaQuery({ maxWidth: size.table });
  const isPhone = useMediaQuery({ maxWidth: size.phone });
  const [fold, setFold] = useState(true);

  const handleFold = () => {
    setFold(!fold);
  };
  const autoHandleFold = () => {
    if (!fold) setFold(!fold);
  };

  const bodyScroll = document.body.style.overflow;
  if (!fold && bodyScroll !== 'hidden') {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'scroll';
  }
  return (
    <>
      {!isTable && (
        <NavWrapper>
          <LogoBox>
            <LogoTitle>師大選課系統</LogoTitle>
          </LogoBox>
          <OptionTitle>功能</OptionTitle>
          <ul>
            <NavOption>
              <NavLink to='/search'>
                {({ isActive }) => (
                  <ButtonOption
                    option={'查詢課程'}
                    active={isActive}
                  >
                    <MdManageSearch />
                  </ButtonOption>
                )}
              </NavLink>
            </NavOption>
            <NavOption>
              <NavLink to='/login'>
                {({ isActive }) => (
                  <ButtonOption
                    option={'登入'}
                    active={isActive}
                  >
                    <MdPerson />
                  </ButtonOption>
                )}
              </NavLink>
            </NavOption>
          </ul>
          <OptionTitle>學生</OptionTitle>
          <ul>
            <NavOption>
              <NavLink to='/rushlist'>
                {({ isActive }) => (
                  <ButtonOption
                    option={'搶課清單'}
                    active={isActive}
                  >
                    <MdViewModule />
                  </ButtonOption>
                )}
              </NavLink>
            </NavOption>
          </ul>
        </NavWrapper>
      )}
      {isTable && !isPhone && (
        <>
          {!fold && <LayOut onClick={handleFold}></LayOut>}
          <NavWrapperRWD isFold={fold}>
            <LogoBoxRWD></LogoBoxRWD>
            <FoldButtonRWD
              onClick={handleFold}
              isFold={fold}
            >
              <MdDoubleArrow />
            </FoldButtonRWD>
            <OptionTitleRWD isFold={fold}>
              功能
            </OptionTitleRWD>
            <ul>
              <NavOption onClick={autoHandleFold}>
                <NavLink to='/search'>
                  {({ isActive }) => (
                    <ButtonOption
                      isRWD={fold}
                      option={'查詢課程'}
                      active={isActive}
                    >
                      <MdManageSearch />
                    </ButtonOption>
                  )}
                </NavLink>
              </NavOption>
              <NavOption onClick={autoHandleFold}>
                <NavLink to='/login'>
                  {({ isActive }) => (
                    <ButtonOption
                      isRWD={fold}
                      option={'登入'}
                      active={isActive}
                    >
                      <MdPerson />
                    </ButtonOption>
                  )}
                </NavLink>
              </NavOption>
            </ul>
            <OptionTitleRWD isFold={fold}>
              學生
            </OptionTitleRWD>
            <ul>
              <NavOption onClick={autoHandleFold}>
                <NavLink to='/rushlist'>
                  {({ isActive }) => (
                    <ButtonOption
                      isRWD={fold}
                      option={'搶課清單'}
                      active={isActive}
                    >
                      <MdViewModule />
                    </ButtonOption>
                  )}
                </NavLink>
              </NavOption>
            </ul>
          </NavWrapperRWD>
        </>
      )}
      {isPhone && (
        <NavBar>
          <HamburgerIcon onClick={handleFold}>
            <MdMenu />
          </HamburgerIcon>
          <LogoBoxRWD></LogoBoxRWD>
          {!fold && (
            <>
              <LayOut
                isPhone={isPhone}
                onClick={handleFold}
              />
              <NavWrapperPhoneRWD>
                <OptionTitleRWD isFold={fold}>
                  功能
                </OptionTitleRWD>
                <ul>
                  <NavOption onClick={autoHandleFold}>
                    <NavLink to='/search'>
                      {({ isActive }) => (
                        <ButtonOption
                          isRWD={fold}
                          option={'查詢課程'}
                          active={isActive}
                        >
                          <MdManageSearch />
                        </ButtonOption>
                      )}
                    </NavLink>
                  </NavOption>
                  <NavOption onClick={autoHandleFold}>
                    <NavLink to='/login'>
                      {({ isActive }) => (
                        <ButtonOption
                          isRWD={fold}
                          option={'登入'}
                          active={isActive}
                        >
                          <MdPerson />
                        </ButtonOption>
                      )}
                    </NavLink>
                  </NavOption>
                </ul>
                <OptionTitleRWD isFold={fold}>
                  學生
                </OptionTitleRWD>
                <ul>
                  <NavOption onClick={autoHandleFold}>
                    <NavLink to='/rushlist'>
                      {({ isActive }) => (
                        <ButtonOption
                          isRWD={fold}
                          option={'搶課清單'}
                          active={isActive}
                        >
                          <MdViewModule />
                        </ButtonOption>
                      )}
                    </NavLink>
                  </NavOption>
                </ul>
              </NavWrapperPhoneRWD>
            </>
          )}
        </NavBar>
      )}
    </>
  );
};
