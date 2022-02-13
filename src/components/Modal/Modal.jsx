import React from 'react';
import styled from 'styled-components';
import { colors, size, device } from 'styles';
import Modal from 'react-modal';
import { MdClose } from "react-icons/md";
import { useMediaQuery } from 'react-responsive';

const customStyles = (width) => {
  return {
    overlay: {
      position: 'fixed',
      backdropFilter: 'blur(1px)',
      backgroundColor: `${colors.black}${colors.opacity40}`,
      zIndex: 10,
    },
    content: {
      // width: '200px',
      width: 'fit-content',
      height: 'fit-content',
      overflow: 'hidden',
      top: '50%',
      left: `calc(50% + ${width}px)`,
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      border: 'none',
      backgroundColor: `${colors.gray400}`,
      zIndex: 11,
    }
  }
}

const Header = styled.div`
  width: 100%;
  height: fit-content;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.gray600};
  font-size: 16px;
  font-weight: 500;
  background: ${colors.primary};

  @media ${device.phone} {
    font-size: 14px;
    padding: 4px 12px;
  }
`;
const Content = styled.div`
  width: 100%;
  height: fit-content;
  padding: 16px 12px;
  color: ${colors.gray100};
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);

  @media ${device.phone} {
    font-size: 14px;
    padding: 8px 12px;
  }
`;
const Footer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: flex-end;
  background: ${colors.gray500}${colors.opacity40};
  padding: 10px 12px;

  @media ${device.phone} {
    font-size: 14px;
    padding: 8px 12px;
  }
`;
const CloseButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const Button = styled.div`
  background: ${colors.primary};
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
    background: ${colors.primary}${colors.opacity80};
  }
  @media ${device.phone} {
    font-size: 14px;
    padding: 8px 12px;
  }
`;

export const CustomModal = ({ isOpen, handleIsOpen, title, children }) => {
  const isTable = useMediaQuery({ maxWidth: size.table });
  const isPhone = useMediaQuery({ maxWidth: size.phone });
  const isStyleRWD = () => {
    if (isPhone) return customStyles(0);
    if (isTable) return customStyles(60);
    return customStyles(120);
  }
  const bodyScroll = document.body.style.overflow;
  if (isOpen && bodyScroll !== 'hidden') {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'scroll';
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleIsOpen}
        style={isStyleRWD()}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <Header>
          {title}
          <CloseButton onClick={handleIsOpen}>
            <MdClose />
          </CloseButton>
        </Header>
        <Content>{children}</Content>
        <Footer>
          <Button onClick={handleIsOpen}>確定</Button>
        </Footer>
      </Modal>
    </>
  );
};
