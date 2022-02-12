import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import { DropdownV2 } from 'components/Dropdown';
import { Test } from 'components';
import { CustomModal } from 'components/Modal';
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from 'react-icons/md';
import { TimeSelector } from 'components/TimeSelector';
import { format } from 'date-fns';
import zh_tw from 'date-fns/locale/zh_tw';
import { department, place } from 'data';
import { search } from 'api';


const SearchContainer = styled.section`
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

const LeftWrapper = styled.div`
  min-width: 300px;
  // width: 100%;
  height: fit-content;
  padding: 20px;
  flex-shrink: 0;
  background: ${colors.gray400};
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
`;

const RightWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background: ${colors.gray400};
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  margin-left: 12px;
  display: flex;
  flex-direction: column;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SearchTitle = styled.h4`
  position: relative;
  left: 1px;
  letter-spacing: 2px;
  color: ${colors.gray100};
  margin-bottom: 4px;
`;
const InputBox = styled.div`
  width: 100%;
  max-height: 40px;
  padding: 10px 18px;
  font-size: 18px;
  font-weight: 500;
  color: ${(props) =>
    props.hasSchedule ? colors.gray500 : `#d0d0d3`};
  text-align: center;
  border-radius: 4px;
  background: ${(props) =>
    props.hasSchedule ? colors.primary : colors.gray500};
  border: none;
  outline: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0);
  cursor: pointer;
`;
const Input = styled.input`
  width: 100%;
  max-height: 40px;
  padding: 10px 18px;
  font-size: 18px;
  color: #d0d0d3;
  border-radius: 4px;
  background: ${colors.gray500};
  border: none;
  outline: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0);
  transition: 0.2s;
  &:focus {
    border: 1px solid ${colors.primary500};
  }
`;
const BoxTitle = styled.h3`
  // padding: 16px 16px 0px;
  color: ${colors.gray000};
  letter-spacing: 2px;
  font-size: 24px;
  margin-bottom: 12px;
`;
const Button = styled.div`
  background: linear-gradient(45deg, #f6d365 0%, #fda085 100%);
  width: 100%;
  height: fit-content;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 4px;
  text-align: center;
  transition: 0.3s;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    filter: brightness(0.9);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    filter: brightness(0.7);
  }
`;

const ModalDesc = styled.div``;
const ModalTitle = styled.h4`
  // font-size: 16px;
  color: ${colors.gray100};
  margin-bottom: 16px;
`;

const CheckButton = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  color: ${colors.white};
  cursor: pointer;
  margin-bottom: 16px;
`;
const Icon = styled.div`
  position: relative;
  bottom: 1px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;

  svg {
    width: 20px;
    height: 20px;
  }
`;
const CellWrapper = styled(CheckButton)`
  color: ${colors.gray100};
  font-size: 16px;
  margin-top: 16px;
  cursor: default;
`;
const CellBox = styled.div`
  width: 48px;
  height: 32px;
  background: ${(props) =>
    props.otherSchedule ? colors.primary : colors.gray500};
  margin-left: 12px;
  cursor: pointer;
  &:hover {
    background: ${(props) => {
      // if (props.otherSchedule) return colors.gray500;
      return colors.primary + colors.opacity40;
    }}
`;

export const Search = (props) => {
  const [filter, setFilter] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [otherSchedule, setOtherSchedule] = useState(false);
  const [isPrecise, setIsPrecise] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [classData, setClassData] = useState();

  // console.log(filter);
  // 判斷有無的布林區
  const hasSchedule = !!schedule.length || otherSchedule;

  // 整理系所/學程的選項
  const departmentOptions = department.map((item) => {
    return { value: item.id, label: item.text };
  });

  // 處理事件區
  const handleFilter = (e, ...props) => {
    const name = props;
    if (!!e.target) {
      setFilter((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [name]: e.value,
      }));
    }
  };
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const handlePrecise = () => {
    setIsPrecise(!isPrecise);
    handleFilter({ value: isPrecise }, 'precise');
  };
  const handleOtherSchedule = () => {
    setOtherSchedule(!otherSchedule);
  };

  useEffect(() => {
    const formatSchedule = schedule.map((item) => {
      return format(item, 'd H', { locale: zh_tw });
    });
    
    handleFilter({ value: formatSchedule }, 'time');
  },[schedule]);

  //處理資料傳輸
  // let classData = [];
  const Submit = async () => {
    const data = {
      filter,
      otherSchedule,
      isPrecise
    };
    await search(data).then((res) => setClassData(res));
  };

  return (
    <SearchContainer>
      <Title>查詢課程</Title>
      <ContentContainer>
        <LeftWrapper>
          <SearchBox>
            <SearchTitle>開課序號</SearchTitle>
            <Input name='id' type='text' onChange={handleFilter} />
          </SearchBox>
          <SearchBox>
            <SearchTitle>科目名稱</SearchTitle>
            <Input name='name' type='text' onChange={handleFilter} />
          </SearchBox>
          <SearchBox>
            <SearchTitle>課程系所 / 學程</SearchTitle>
            <DropdownV2
              name='department'
              options={departmentOptions}
              handleValue={handleFilter}
            />
          </SearchBox>
          <SearchBox>
            <SearchTitle>教師名稱</SearchTitle>
            <Input
              name='teacher'
              type='text'
              onChange={handleFilter}
            />
          </SearchBox>
          <SearchBox>
            <SearchTitle>課程時間</SearchTitle>
            <InputBox
              hasSchedule={hasSchedule}
              onClick={handleIsOpen}
            >
              {hasSchedule ? `已設定` : `未設定`}
            </InputBox>
            <CustomModal
              isOpen={isOpen}
              handleIsOpen={handleIsOpen}
              title='設定搜尋時間'
            >
              <ModalDesc>
                <CheckButton onClick={handlePrecise}>
                  精確搜尋
                  <Icon>
                    {isPrecise && <MdOutlineCheckBox />}
                    {!isPrecise && <MdOutlineCheckBoxOutlineBlank />}
                  </Icon>
                </CheckButton>
                <ModalTitle>設定搜尋時間</ModalTitle>
                <TimeSelector
                  schedule={schedule}
                  setSchedule={setSchedule}
                />
                <CellWrapper>
                  密集授課
                  <CellBox
                    otherSchedule={otherSchedule}
                    onClick={handleOtherSchedule}
                  ></CellBox>
                </CellWrapper>
              </ModalDesc>
            </CustomModal>
          </SearchBox>
          <SearchBox>
            <SearchTitle>課程地點</SearchTitle>
            <DropdownV2
              name='place'
              options={place}
              handleValue={handleFilter}
            />
          </SearchBox>
          <SearchBox>
            <Button onClick={Submit}>查詢</Button>
          </SearchBox>
        </LeftWrapper>
        <RightWrapper>
          <BoxTitle>課程列表</BoxTitle>
          <Test data={classData}></Test>
        </RightWrapper>
      </ContentContainer>
    </SearchContainer>
  );
};
