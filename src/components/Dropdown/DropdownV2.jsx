import React, { useState } from 'react';
import { colors } from 'styles';
import Select, { components } from 'react-select';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export const DropdownV2 = (props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const handleOpen = () => {
    if (!open) setOpen(!open);
  }
  const handleSelect = (selected) => {
    setSelected(selected);
    if (open) setOpen(!open);
  }
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
  const Menu = (props) => {
    return (
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
    control: (provided, state) => {
      return {
        ...provided,
        height: '40px',
        padding: '8px 16px',
        border: 0,
        borderRadius: '4px',
        boxShadow: 'none',
        background: `${colors.gray500}`,
        alignItems: 'center',
        cursor: 'text',
        border: state.isFocused ? `1px solid ${colors.primary500}` : '1px solid rgba(0,0,0,0)',
        boxShadow: `2px 2px 4px rgba(0, 0, 0, 0.1)`,
        '&:hover': {
          border: state.isFocused ? `1px solid ${colors.primary500}` : '1px solid rgba(0,0,0,0)',
        },
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
    menu: (props) => {
      return {
        ...props,
        background: 'none',
        border: 'none',
        borderRadius: '4px',
        marginTop: '4px',
        height: open ? "200px" : "0px",
        overflow: "hidden",
        transition: ".3s ease-in-out",
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
          value={selected}
          onChange={handleSelect}
          onBlur={() => setOpen(false)}
          styles={customStyles(open)}
          options={options}
          noOptionsMessage={() => '你是不是在亂打 O_Q'}
          placeholder={''}
          menuIsOpen
          maxMenuHeight={200}
          // For Scroll
          captureMenuScroll={false}
        />
      </div>
    </>
  );
};
