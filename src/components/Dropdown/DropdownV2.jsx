import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import { Transition } from 'react-transition-group';
import { MdKeyboardArrowUp } from 'react-icons/md';
import Select, { components, createFilter } from 'react-select';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

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
    transform: ${(props) => (props.isShow ? `rotate(180deg)` : ``)};
    transition: 0.3s;
  }
`;

const Text = styled.h4`
  position: relative;
  top: 1px;
  font-size: 16px;
  letter-spacing: 2px;
`;

export const DropdownV2 = (props) => {
  const { data, active, children } = props;
  const [isShow, setIsShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const handleOpen = () => {
    if (!open) setOpen(!open);
  }
  const handleSelect = (selected) => {
    setSelected(selected);
    if (open) setOpen(!open);
  }
  const openModal = () => {
    if (isShow) return;
    setIsShow(!isShow);
  };
  const closeModal = () => {
    setIsShow(false);
  };
  const options = [
    { value: 'ruby', label: 'Ruby' },
    {
      value: 'yoshiko',
      label: 'Yohane',
    },
    {
      value: 'hanamaru',
      label: 'Hanamaru',
    },
    { value: 'chika', label: 'Chika' },
    { value: 'you', label: 'You' },
    { value: 'riko', label: 'Riko' },
    { value: 'dia', label: 'Dia' },
    { value: 'kanan', label: 'Kanan' },
    { value: 'mari', label: 'Mari' },
  ];
  const DropdownIndicator = ({children, ...props}) => {
    return (
      <components.DropdownIndicator {...props}>
        <MdKeyboardArrowUp />
        {children}
      </components.DropdownIndicator>
    );
  };
  const transitionStyles = {
    exited: {
      opacity: 0,
      transform: 'scaleY(0)',
    },
  };
  const Menu = (props) => {
    return (
      // <Transition in={props.selectProps.menuIsOpen} timeout={100}>
      //   {(state) => (
      //     <div
      //       style={{ ...transitionStyles[state] }}
      //     >
      //     </div>
      //   )}
      // </Transition>
            <components.Menu {...props}>
              <SimpleBarReact>{props.children}</SimpleBarReact>
            </components.Menu>
    );
  };
  const CustomOption = ({ children, ...props }) => {
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = { ...props, innerProps: rest };
    return (
      <components.Option {...newProps}>
        {children}
      </components.Option>
    );
  };
  const customStyles = (open) => ({
    control: (provided) => {
      return {
        ...provided,
        height: '40px',
        padding: '8px 16px',
        border: 0,
        borderRadius: '8px',
        boxShadow: 'none',
        background: `${colors.gray500}`,
        alignItems: 'center',
        cursor: 'text',
      };
    },
    valueContainer: (provided) => {
      return {
        ...provided,
        height: '100%',
        padding: '0px',
        top: '1px',
      };
    },
    input: (provided) => {
      return {
        ...provided,
        margin: `0`,
        padding: `0`,
        color: `${colors.white}`,
      };
    },
    placeholder: (provided) => {
      return {
        ...provided,
      };
    },
    singleValue: (provided) => {
      return {
        ...provided,
        color: `${colors.gray100}`,
      };
    },
    dropdownIndicator: (provided) => {
      return {
        ...provided,
        color: `${colors.gray100}`,
        padding: '0',
        maxWidth: '16px',
        maxHeight: '16px',
        cursor: 'pointer',
        transform: open ? 'rotate(0deg)' : 'rotate(-180deg)',
        transition: "all .3s ease-in-out",
        svg: {
          width: '100%',
          height: '100%',
        },
        '&:hover': {
          color: `${colors.white}`,
        },
      };
    },
    indicatorContainer: (provided) => {
      return {
        ...provided,
        padding: '0px',
      };
    },
    indicatorSeparator: () => {
      return {
        display: 'none',
      };
    },
    menu: (props, state) => {
      return {
        ...props,
        background: 'none',
        border: 'none',
        borderRadius: '10px',
        marginTop: '4px',
        // height: open ? "200px" : "0px",
        overflow: "hidden",
        transition: ".3s ease-in-out",
        // opacity: open ? 1 : 0,
        transform: open ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        visibility: open ? "visible" : "hidden"
      }
    },
    menuList: (props) => {
      return {
        ...props,
        padding: '8px',
        background: `${colors.gray500}`,
        border: 'none',
        borderRadius: '8px',
        '::-webkit-scrollbar': {
          width: '6px',
        },
        '::-webkit-scrollbar-track': {
          background: 'none',
        },
        '::-webkit-scrollbar-thumb': {
          background: `${colors.gray300}${colors.opacity50}`,
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: `${colors.gray300}${colors.opacity80}`,
        },
      };
    },
    option: (props, { data, isFocused, isSelected}) => {
      const getBackground = () => {
        if (isFocused) return `${colors.gray400}${colors.opacity60}`;
        if (isSelected) return `${colors.gray400}`;
        return `${colors.gray500}`;
      }
      return {
        ...props,
        minHeight: '40px',
        display: 'flex',
        alignItems: 'center',
        padding: '8px 10px',
        borderRadius: '8px',
        color: `${colors.gray200}`,
        background: `${getBackground()}`,
        cursor: 'pointer',
        '&:hover': {
          background: `${colors.gray400}`,
        },
      }
    }
  });

  return (
    <>
      <div onClick={handleOpen}>
        <Select
          // value={selected}
          onChange={handleSelect}
          onBlur={() => setOpen(false)}
          components={{
            // DropdownIndicator,
            // CustomOption,
            // Menu
          }}
          styles={customStyles(open)}
          options={options}
          noOptionsMessage={() => '你是不是在亂打 O_Q'}
          placeholder={''}
          menuIsOpen
          maxMenuHeight={200}
          // For Scroll
          captureMenuScroll={false}
          // filterOption={createFilter({ ignoreAccents: false })}
        />
      </div>
    </>
  );
};
