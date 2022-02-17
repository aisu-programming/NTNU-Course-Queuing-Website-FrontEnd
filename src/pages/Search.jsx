import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { colors, device } from 'styles';
import { DropdownV2 } from 'components/Dropdown';
import { TableContainer } from 'components';
import { CustomModal } from 'components/Modal';
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from 'react-icons/md';
import { TimeSelector } from 'components/TimeSelector';
import { format } from 'date-fns';
import zh_tw from 'date-fns/locale/zh_tw';
import { department, place, domain } from 'data';
import { search, getSearchOption } from 'api';
import { PuffLoader } from 'react-spinners';

const SearchContainer = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: ${colors.gray500};
  padding: 40px;
  display: flex;
  flex-direction: column;

  @media ${device.phone} {
    padding: 20px 0 0;
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
  height: 100%;
  display: flex;

  @media ${device.phone} {
    flex-direction: column;
    gap: 8px;
  }
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

  @media ${device.phone} {
    border-radius: 4px;
  }
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

  @media ${device.phone} {
    border-radius: 4px;
    margin-left: 0;
  }
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  gap: 24px;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media ${device.phone} {
    flex-direction: row;
    gap: 12px;
    margin-bottom: 16px;
  }
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${(props) => (props.width ? props.width : '1')};
`;

const SearchTitle = styled.h4`
  position: relative;
  left: 1px;
  letter-spacing: 2px;
  color: ${colors.gray100};
  margin-bottom: 4px;

  @media ${device.phone} {
    font-size: 12px;
  }
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
  outline: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0);
  cursor: pointer;

  @media ${device.phone} {
    font-size: 14px;
    padding: 11px 12px;
  }
`;
const Input = styled.input`
  width: 100%;
  max-height: 40px;
  padding: 10px 18px;
  font-size: 18px;
  color: #d0d0d3;
  border-radius: 4px;
  background: ${colors.gray500};
  outline: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0);
  transition: 0.2s;
  &:focus {
    border: 1px solid ${colors.primary500};
  }
  @media ${device.phone} {
    font-size: 14px;
    padding: 10px 12px;
  }
`;
const BoxTitle = styled.h3`
  // padding: 16px 16px 0px;
  color: ${colors.gray000};
  letter-spacing: 2px;
  font-size: 24px;
  margin-bottom: 12px;
  @media ${device.phone} {
    font-size: 20px;
  }
`;
const Button = styled.div`
  background: linear-gradient(45deg, #f6d365 0%, #fda085 100%);
  width: 100%;
  height: fit-content;
  margin-top: 8px;
  padding: 10px 20px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
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

  ${(props) =>
    props.isLoading &&
    css`
      cursor: default;
      filter: brightness(0.6) contrast(0.8);
      &:hover {
        filter: brightness(0.6) contrast(0.8);
      }
    `}

  @media ${device.phone} {
    margin-top: auto;
    transform: translateY(-1px);
  }
`;

const ModalDesc = styled.div``;
const ModalTitle = styled.h4`
  color: ${colors.gray100};
  margin-bottom: 16px;

  @media ${device.phone} {
    margin-bottom: 8px;
  }
`;

const CheckButton = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  color: ${colors.white};
  cursor: pointer;
  margin-bottom: 16px;

  @media ${device.phone} {
    margin-bottom: 8px;
  }
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
  margin-bottom: 0;

  @media ${device.phone} {
    font-size: 14px;
    margin-top: 8px;
  }
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
    }};
  }
  @media ${device.phone} {
    width: 30px;
    height: 20px;
    &:hover {
      background: ${(props) =>
        props.otherSchedule ? colors.primary : colors.gray500};
    }
  }
`;

export const Search = () => {
  const [filter, setFilter] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [otherSchedule, setOtherSchedule] = useState(false);
  const [isPrecise, setIsPrecise] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOption] = useState([]);
  const [classData, setClassData] = useState([]);

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
  }, [schedule]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSearchOption();
      const departmentOptions = data.map((item) => {
        const departmentName = department.find((i) => {
          return i.id === item;
        });
        const list = {
          value: item,
          label: departmentName.text,
        };
        return list;
      });
      setOption(departmentOptions);
    };
    fetchData();
  }, []);

  //處理資料傳輸
  const handleSubmit = async () => {
    if (loading) return;
    const data = {
      filter,
      otherSchedule,
      isPrecise,
    };
    setClassData([]);
    setLoading(true);
    const fetchData = await search(data);
    setClassData(fetchData);
    setLoading(false);
  };

  return (
    <SearchContainer>
      <Title>查詢課程</Title>
      <ContentContainer>
        <LeftWrapper>
          <RowBox>
            <SearchBox width={1}>
              <SearchTitle>開課序號</SearchTitle>
              <Input
                name='id'
                type='text'
                onChange={handleFilter}
              />
            </SearchBox>
            <SearchBox width={2}>
              <SearchTitle>課程名稱</SearchTitle>
              <Input
                name='name'
                type='text'
                onChange={handleFilter}
              />
            </SearchBox>
          </RowBox>
          <RowBox>
            <SearchBox>
              <SearchTitle>課程系所 / 學程</SearchTitle>
              <DropdownV2
                name='department'
                options={
                  !!options.length ? options : departmentOptions
                }
                handleValue={handleFilter}
              />
            </SearchBox>
          </RowBox>
          {filter.department === 1 && (
            <RowBox>
              <SearchBox>
                <SearchTitle>通識領域</SearchTitle>
                <DropdownV2
                  name='domains'
                  options={domain}
                  handleValue={handleFilter}
                />
              </SearchBox>
            </RowBox>
          )}
          <RowBox>
            <SearchBox width={3}>
              <SearchTitle>教師名稱</SearchTitle>
              <Input
                name='teacher'
                type='text'
                onChange={handleFilter}
              />
            </SearchBox>
            <SearchBox width={2}>
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
                      {!isPrecise && (
                        <MdOutlineCheckBoxOutlineBlank />
                      )}
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
                    />
                  </CellWrapper>
                </ModalDesc>
              </CustomModal>
            </SearchBox>
          </RowBox>
          <RowBox>
            <SearchBox width={1}>
              <SearchTitle>課程地點</SearchTitle>
              <DropdownV2
                name='place'
                options={place}
                handleValue={handleFilter}
              />
            </SearchBox>
            <SearchBox width={1}>
              <Button
                isLoading={loading}
                onClick={handleSubmit}
              >
                <PuffLoader
                  color={colors.primaryText}
                  size={16}
                  loading={loading}
                />
                {!loading && '查詢'}
              </Button>
            </SearchBox>
          </RowBox>
        </LeftWrapper>
        <RightWrapper>
          <BoxTitle>課程列表</BoxTitle>
          <TableContainer loading={loading} data={classData} />
        </RightWrapper>
      </ContentContainer>
    </SearchContainer>
  );
};
