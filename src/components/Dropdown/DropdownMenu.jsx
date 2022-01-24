import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import { Transition } from 'react-transition-group';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const MenuContainer = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  min-height: fit-content;
  max-height: 200px;
  border-radius: 8px;
  background: ${colors.gray500};
  box-shadow: 0 0 8px ${colors.black}${colors.opacity}
  transform: none;
  transform-origin: top;
  transition: .3s;
  cursor: default;
`;

const MenuItems = styled.ul`
  padding: 8px;
`;

const MenuItem = styled.li`
  min-height: 40px;
  display: flex;
  align-items: center;
  padding: 8px 10px;
  color: ${colors.gray200};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: ${colors.gray400};
  }
`;

export const DropdownMenu = (props) => {
  const { isShow, closeModal, data } = props;
  const transitionStyles = {
    exited: {
      opacity: 0,
      transform: 'scaleY(0)',
    },
  };
  return (
    <>
      <Transition in={isShow} timeout={100}>
        {(state) => (
          <MenuContainer
            style={{ ...transitionStyles[state] }}
          >
            <SimpleBarReact style={{ maxHeight: 200 }}>
              <MenuItems>
                {data.map((item) => {
                  return (
                    <MenuItem key={item}>{item}</MenuItem>
                  );
                })}
              </MenuItems>
            </SimpleBarReact>
          </MenuContainer>
        )}
      </Transition>
    </>
  );
};
