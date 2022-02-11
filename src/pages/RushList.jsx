import React from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import { NavLink, Outlet } from 'react-router-dom';

const Container = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: ${colors.gray500};
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  color: ${colors.title};
  font-size: 32px;
  letter-spacing: 4px;
  margin-bottom: 40px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 20px;
  flex-shrink: 0;
  background: ${colors.gray400};
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
`;

const ChildWrapper = styled(Wrapper)`
  background: ${colors.gray600};
  min-height: 680px;
`;

const NavOptions = styled.div`
  display: flex;
  gap: 10px;
  transform: translate(30px, 0);
  margin-bottom: 4px;
`;

const Button = styled.div`
  width: 200px;
  height: fit-content;
  color: ${colors.white};
  line-height: 24px;
  letter-spacing: 2px;
  text-align: center;
  border-radius: 4px;
  padding: ${(props) =>
    !props.isActive ? '10px 20px' : '14px 20px 6px'};
  background: ${colors.gray600};
  opacity: ${(props) => !props.isActive && '0.6'};
  cursor: pointer;
  position: relative;
  transition: 0.3s;
  &:hover {
    opacity: ${(props) => !props.isActive && '0.8'};
  }
  &::after {
    content: '';
    display: ${(props) => (props.isActive ? 'block' : 'none')};
    width: 100%;
    height: 6px;
    background: ${colors.gray600};
    position: absolute;
    bottom: -4px;
    left: 0;
  }
`;

export const RushList = (props) => {
  return (
    <Container>
      <Title>搶課清單</Title>
      <ContentContainer>
        <Wrapper>
          <NavOptions>
            <NavLink to='/rushlist/wait'>
              {({ isActive }) => (
                <Button isActive={isActive}>我的清單</Button>
              )}
            </NavLink>
            <NavLink to='/rushlist/done'>
              {({ isActive }) => (
                <Button isActive={isActive}>已完成</Button>
              )}
            </NavLink>
          </NavOptions>
          <ChildWrapper>
            <Outlet />
          </ChildWrapper>
        </Wrapper>
      </ContentContainer>
    </Container>
  );
};
