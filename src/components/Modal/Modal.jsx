import React from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import Modal from 'react-modal';
import { MdClose } from "react-icons/md";

const customStyles = {
  overlay: {
    position: 'absolute',
    backdropFilter: 'blur(1px)',
    backgroundColor: `${colors.black}${colors.opacity40}`,
  },
  content: {
    // width: '200px',
    width: 'fit-content',
    height: 'fit-content',
    overflow: 'hidden',
    top: '50%',
    left: 'calc(50% + 120px)',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
    backgroundColor: `${colors.gray400}`,
  },
};

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
`;
const Content = styled.div`
  width: 100%;
  height: fit-content;
  padding: 16px 12px;
  color: ${colors.gray100};
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
`;
const Footer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: flex-end;
  background: ${colors.gray500}${colors.opacity40};
  padding: 10px 12px;
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
`;

export const CustomModal = ({ isOpen, handleIsOpen, title, children }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleIsOpen}
        style={customStyles}
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
