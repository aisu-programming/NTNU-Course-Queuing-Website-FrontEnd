import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { colors, device } from 'styles';
import { NavLink, Outlet } from 'react-router-dom';
import { useDataContext } from 'data';

const Container = styled.section`
  flex: 1;
  min-height: 100vh;
  background: ${colors.gray500};
  padding: 40px;
  display: flex;
  flex-direction: column;

  @media ${device.phone} {
    padding: 20px 0px 0px;
  }
`;

const Title = styled.h1`
  color: ${colors.title};
  font-size: 32px;
  letter-spacing: 4px;
  margin-bottom: 40px;

  @media ${device.phone} {
    text-align: center;
    margin-bottom: 16px;
    font-size: 24px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  flex-shrink: 0;
  background: ${colors.gray400};
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  @media ${device.phone} {
    padding: 20px;
    border-radius: 2px;
  }
`;

const ChildWrapper = styled(Wrapper)`
  background: ${colors.gray600};
  flex: 1;
  // min-height: 100vh;

  @media ${device.phone} {
    border-radius: 2px;
    padding: 20px 10px;
  }
`;

const NavOptions = styled.div`
  display: flex;
  gap: 10px;
  transform: translate(30px, 0);
  margin-bottom: 4px;
  @media ${device.phone} {
    transform: translate(0px, 0);
  }
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
    display: ${(props) =>
      props.isActive ? 'block' : 'none'};
    width: 100%;
    height: 8px;
    background: ${colors.gray600};
    position: absolute;
    bottom: -6px;
    left: 0;
  }
  @media ${device.phone} {
    padding: ${(props) =>
      !props.isActive ? '6px 12px' : '8px 12px 4px'};
    width: 100px;
  }
`;
const Footer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;
const SaveButton = styled.div`
  background: ${colors.success400};
  width: fit-content;
  height: fit-content;
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  transition: 0.3s;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    background: ${colors.success400}${colors.opacity80};
  }

  ${(props) =>
    !props.isChange &&
    css`
      cursor: default;
      filter: brightness(0.6) contrast(0.8);
      &:hover {
        filter: brightness(0.6) contrast(0.8);
      }
      &:active {
        background: ${colors.success400};
      }
    `}
`;

export const RushList = () => {
  const { courseData, courseList } = useDataContext();
  const [hasChange, setHasChange] = useState(false);

  const handleSave = () => {
    console.log(courseData);
    console.log(courseList);
  }

  return (
    <Container>
      <Title>搶課清單</Title>
      <ContentContainer>
        <Wrapper>
          <NavOptions>
            <NavLink to='/rushlist/wait'>
              {({ isActive }) => (
                <Button isActive={isActive}>
                  我的清單
                </Button>
              )}
            </NavLink>
            <NavLink to='/rushlist/done'>
              {({ isActive }) => (
                <Button isActive={isActive}>已完成</Button>
              )}
            </NavLink>
          </NavOptions>
          <ChildWrapper>
            <Outlet
              context={{
                Change: [hasChange, setHasChange],
              }}
            />
          </ChildWrapper>
          <Footer>
            <SaveButton onClick={handleSave} isChange={hasChange}>
              儲存
            </SaveButton>
          </Footer>
        </Wrapper>
      </ContentContainer>
    </Container>
  );
};
