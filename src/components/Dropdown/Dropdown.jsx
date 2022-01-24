import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import { DropdownMenu } from 'components/Dropdown';
import { MdKeyboardArrowUp } from 'react-icons/md';

const DropdownBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 40px;
  color: ${colors.white};
  background: ${colors.gray500};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
`;

const DropdownIcon = styled.div`
  min-width: 20px;
  min-height: 20px;
  display: flex;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
    transform: ${(props) =>
      props.isShow ? `rotate(180deg)` : ``};
    transition: 0.3s;
  }
`;

const Text = styled.h4`
  position: relative;
  top: 1px;
  font-size: 16px;
  letter-spacing: 2px;
`;

export const Dropdown = (props) => {
  const { data, active, children } = props;
  const [isShow, setIsShow] = useState(false);
  const a = useRef(0);
  const closeRef = useRef();
  useEffect(() => {
    a.current = a.current + 1;
    console.log(a);
  });
  const openModal = () => {
    console.log('click');
    if (isShow) return;
    setIsShow(!isShow);
  };
  const closeModal = () => {
    setIsShow(false);
  };
  const list = [
    'abc',
    'bcd',
    'abcd',
    'bbcd',
    'cbcd',
    'dbcd',
    'ebcd',
    'fbcd',
    'gbcd',
  ];
  const useOutsideClose = (ref) => {
    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (
          ref.current &&
          !ref.current.contains(event.target)
        ) {
          closeModal();
        }
      };

      document.addEventListener(
        'mousedown',
        handleOutsideClick
      );
      return () => {
        document.removeEventListener(
          'mousedown',
          handleOutsideClick
        );
      };
    }, [ref]);
  };
  useOutsideClose(closeRef);
  return (
    <DropdownBox onClick={openModal} ref={closeRef}>
      {children}
      資工系
      <DropdownIcon isShow={isShow}>
        <MdKeyboardArrowUp />
      </DropdownIcon>
      <DropdownMenu
        isShow={isShow}
        closeModal={closeModal}
        data={list}
      ></DropdownMenu>
    </DropdownBox>
  );
};
