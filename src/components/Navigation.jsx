import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors, size } from 'styles';
import { ButtonOption } from 'components';
import {
  MdHome,
  MdManageSearch,
  MdPerson,
  MdViewModule,
  MdDoubleArrow,
  MdMenu,
  MdLogout,
} from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { logo, logoTiny } from 'assets';
import { useDataContext } from 'data';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

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
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: ${colors.background};
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.4);
  z-index: 2;
`;
const NavWrapperRWD = styled(NavWrapper)`
  max-width: ${(props) => (props.isFold ? '60px' : '240px')};
  padding: 20px 10px;
  transition: 0.3s;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
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
  position: relative;

  svg {
    width: 32px;
    height: 32px;
    color: ${colors.white};
  }
  ${(props) =>
    props.alert &&
    `
    &::before {
      content: '';
      display: block;
      position: absolute;
      right: 2px;
      bottom: 4px;
      width: 14px;
      height: 14px;
      background: ${colors.danger};
      border: 3px solid ${colors.gray500};
      border-radius: 50%;
    }
  `}
`;

const LogoBox = styled.div`
  height: 80px;
  // background: #202020;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;
const LogoBoxRWD = styled(LogoBox)`
  height: 40px;
`;

const LogoImg = styled.img`
  object-fit: contain;
`;

const OptionTitle = styled.div`
  color: ${colors.gray300};
  font-size: 14px;
  padding: 4px 10px;
  margin-top: 16px;
`;
const OptionTitleRWD = styled(OptionTitle)`
  width: 100%;
  padding: ${(props) => (props.isFold ? '4px 0' : '4px 10px')};
  text-align: ${(props) => (props.isFold ? 'center' : 'left')};
  white-space: nowrap;
`;

const FoldButtonRWD = styled.div`
  position: absolute;
  right: -18px;
  transform: translateY(44px);
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

const changeCourseCount = (originData, alterData) => {
  const newData = alterData.filter((item) =>
    item.hasOwnProperty('isOrdered')
  );
  const oldData = alterData.filter(
    (item) => !item.hasOwnProperty('isOrdered')
  );
  const changeData = oldData.filter((item) => {
    const findData = originData.find((i) => {
      return i.courseNo === item.courseNo;
    });
    if (findData.status !== item.status) return true;
    if (findData.domain !== item.domain) return true;
    return false;
  });
  const changes = [...newData, ...changeData];
  return changes.length;
};

export const Navigation = () => {
  const {
    isLogin,
    hasAlert,
    courseList,
    courseData,
    courseTotal,
    setIsLogin,
    setHasAlert,
  } = useDataContext();
  const isTable = useMediaQuery({ maxWidth: size.table });
  const isPhone = useMediaQuery({ maxWidth: size.phone });
  const [fold, setFold] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const handleFold = () => {
    setFold(!fold);
  };
  const autoHandleFold = () => {
    if (!fold) setFold(!fold);
  };
  const toggleToast = () => {
    toast.dark('☕ 登出成功！ 謝謝您的使用 OuO!', {
      position: 'top-center',
      autoClose: 1500,
    });
  };
  const handleLogout = () => {
    const fetchData = async () => {
      setIsLogin(false);
      toggleToast();
      removeCookie('jwt', {path:'/'});
      removeCookie('year', {path:'/'});
      navigate('/');
    }
    fetchData();
  };

  const bodyScroll = document.body.style.overflow;
  if (!fold && bodyScroll !== 'hidden') {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'scroll';
  }

  useEffect(() => {
    const changes = changeCourseCount(courseData, [
      ...courseList,
      ...courseData,
    ]);
    setHasAlert(changes);
  }, [courseList, courseTotal]);

  useEffect(() => {
    const changes = changeCourseCount(courseData, courseTotal);
    setHasAlert(changes);
  }, [courseTotal]);

  return (
    <>
      {!isTable && (
        <NavWrapper>
          <LogoBox>
            <LogoImg src={logo} />
          </LogoBox>
          <ul>
            <NavOption>
              <NavLink to='/'>
                {({ isActive }) => (
                  <ButtonOption
                    option={'首頁'}
                    active={isActive}
                  >
                    <MdHome />
                  </ButtonOption>
                )}
              </NavLink>
            </NavOption>
          </ul>
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
            {!isLogin && (
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
            )}
          </ul>
          <OptionTitle>學生</OptionTitle>
          {isLogin && (
            <ul>
              <NavOption>
                <NavLink to='/rushlist'>
                  {({ isActive }) => (
                    <ButtonOption
                      alert
                      option={'搶課清單'}
                      active={isActive}
                    >
                      <MdViewModule />
                    </ButtonOption>
                  )}
                </NavLink>
              </NavOption>
            </ul>
          )}
          {isLogin && (
            <ul style={{marginTop: 'auto'}}>
              <NavOption>
                <ButtonOption
                  isDanger
                  onClick={handleLogout}
                  option={'登出'}
                >
                  <MdLogout />
                </ButtonOption>
              </NavOption>
            </ul>
          )}
        </NavWrapper>
      )}
      {isTable && !isPhone && (
        <>
          {!fold && <LayOut onClick={handleFold}></LayOut>}
          <NavWrapperRWD isFold={fold}>
            <LogoBoxRWD>
              {fold && <LogoImg src={logoTiny} />}
              {!fold && <LogoImg src={logo} />}
            </LogoBoxRWD>
            <FoldButtonRWD onClick={handleFold} isFold={fold}>
              <MdDoubleArrow />
            </FoldButtonRWD>
            <ul>
              <NavOption>
                <NavLink to='/'>
                  {({ isActive }) => (
                    <ButtonOption
                      isRWD={fold}
                      option={'首頁'}
                      active={isActive}
                    >
                      <MdHome />
                    </ButtonOption>
                  )}
                </NavLink>
              </NavOption>
            </ul>
            <OptionTitleRWD isFold={fold}>功能</OptionTitleRWD>
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
              {!isLogin && (
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
              )}
            </ul>
            <OptionTitleRWD isFold={fold}>學生</OptionTitleRWD>
            {isLogin && (
              <ul>
                <NavOption onClick={autoHandleFold}>
                  <NavLink to='/rushlist'>
                    {({ isActive }) => (
                      <ButtonOption
                        isRWD={fold}
                        alert
                        option={'搶課清單'}
                        active={isActive}
                      >
                        <MdViewModule />
                      </ButtonOption>
                    )}
                  </NavLink>
                </NavOption>
              </ul>
            )}
            {isLogin && (
              <ul style={{marginTop: 'auto'}}>
                <NavOption onClick={autoHandleFold}>
                  <ButtonOption
                    isRWD={fold}
                    onClick={handleLogout}
                    isDanger
                    option={'登出'}
                  >
                    <MdLogout />
                  </ButtonOption>
                </NavOption>
              </ul>
            )}
          </NavWrapperRWD>
        </>
      )}
      {isPhone && (
        <NavBar>
          <HamburgerIcon alert={hasAlert} onClick={handleFold}>
            <MdMenu />
          </HamburgerIcon>
          {/* <LogoBoxRWD>
            <LogoImg src={logo} />
          </LogoBoxRWD> */}
          {!fold && (
            <>
              <LayOut isPhone={isPhone} onClick={handleFold} />
              <NavWrapperPhoneRWD>
                <ul>
                  <NavOption onClick={autoHandleFold}>
                    <NavLink to='/'>
                      {({ isActive }) => (
                        <ButtonOption
                          isRWD={fold}
                          option={'首頁'}
                          active={isActive}
                        >
                          <MdHome />
                        </ButtonOption>
                      )}
                    </NavLink>
                  </NavOption>
                </ul>
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
                  {!isLogin && (
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
                  )}
                </ul>
                <OptionTitleRWD isFold={fold}>
                  學生
                </OptionTitleRWD>
                {isLogin && (
                  <ul>
                    <NavOption onClick={autoHandleFold}>
                      <NavLink to='/rushlist'>
                        {({ isActive }) => (
                          <ButtonOption
                            alert
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
                )}
                {isLogin && (
                  <ul style={{marginTop: 'auto'}}>
                    <NavOption onClick={autoHandleFold}>
                      <ButtonOption
                        isRWD={fold}
                        isDanger
                        onClick={handleLogout}
                        option={'登出'}
                      >
                        <MdLogout />
                      </ButtonOption>
                    </NavOption>
                  </ul>
                )}
              </NavWrapperPhoneRWD>
            </>
          )}
        </NavBar>
      )}
    </>
  );
};
