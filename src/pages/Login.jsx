import React, { useState, useEffect } from 'react';
import balloon from '../assets/login-balloon.svg';
import cat_1 from '../assets/login-cat-1.svg';
import { colors, size, device } from 'styles';
import styled, { keyframes, css } from 'styled-components';
import { LoginApi } from 'api';
import { useMediaQuery } from 'react-responsive';
import { PuffLoader } from 'react-spinners';
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { GetList } from 'api';
import { useDataContext } from 'data';
import { timeout } from 'utils';

const generateShadow = (count, color) => {
  let i = 0;
  let value = '';
  for (i = 0; i < count; i++) {
    value += `-${i}px ${i}px 0px ${color}`;
    if (i !== count - 1) {
      value += ', ';
    }
  }
  return value;
};

const Container = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;
const LeftWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background: ${colors.gray400};
`;

const RightWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 40px;
  z-index: 1;
  box-shadow: -4px 0 4px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  @media ${device.phone} {
    padding: 20px;
  }
`;
const LoginBox = styled.div`
  width: 560px;
  height: fit-content;
  position: relative;
  background: #303030;
  border-radius: 8px;
  padding: 40px 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.3),
    ${generateShadow(420, 'rgba(40,40,40,0.2)')};
  // box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);

  @media ${device.phone} {
    width: 100%;
    max-width: 560px;
    padding: 32px 20px;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
  }
`;

const wave = keyframes`
  from {
    transform: translate(0, 20px);
  }
  to {
    transform: translate(0, -20px);
  }
`;

const ImgBox = styled.img`
  width: 80%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.4));
  animation: ${wave} 3s alternate ease-in-out infinite;
`;
const Title = styled.div`
  font-size: 36px;
  color: ${colors.title};
  text-align: center;
  margin-bottom: 10px;

  @media ${device.phone} {
    font-size: 24px;
  }
`;
const SubTitle = styled.div`
  font-size: 18px;
  color: ${colors.subtitle};
  text-align: center;
  margin-bottom: 24px;

  @media ${device.phone} {
    font-size: 16px;
  }
`;

const Button = styled.div`
  background: linear-gradient(45deg, #f6d365 0%, #fda085 100%);
  width: 60%;
  margin-top: 8px;
  height: fit-content;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
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
    width: 100%;
    padding: 8px 10px;
  }
`;
const ButtonText = styled.div`
  font-size: 24px;
  font-weight: 500;
  position: relative;
  top: 1px;
  color: #2d2d2d;

  @media ${device.phone} {
    font-size: 20px;
  }
`;
const InputBox = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;
const InputTitle = styled(SubTitle)`
  font-size: 16px;
  text-align: left;
  color: ${colors.gray100};
  margin-bottom: 8px;

  @media ${device.phone} {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;
const Input = styled.input`
  width: 100%;
  height: fit-content;
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
  &:hover {
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  }
  &:focus {
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid ${colors.primary500};
  }
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.gray100};
  margin-bottom: 24px;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    transform: translateY(-1px);
  }
`;

const ErrorMessage = styled.h5`
  font-size: 14px;
  color: ${colors.danger};
`;

const Cat1 = styled.img`
  width: 20%;
  height: fit-content;
  object-fit: contain;
  position: absolute;
  bottom: -50px;
  left: -50px;
  filter: drop-shadow(4px 0px 3px rgba(0, 0, 0, 0.6));
`;
const Hint = styled.h5`
  position: absolute;
  bottom: 12px;
  margin-top: 8px;
  color: ${colors.gray300};
  font-size: 12px;
  text-align: center;
`;
const Link = styled.span`
  color: ${colors.blue};
  &:hover {
    text-decoration: underline;
  }
`;

export const Login = () => {
  const { isLogin, setGrade, setIsLogin, setCourseData } =
    useDataContext();
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [loginMsg, setLoginMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [readCheck, setReadCheck] = useState(false);
  const isTableSmall = useMediaQuery({
    maxWidth: size.tableSmall,
  });
  const isPhone = useMediaQuery({ maxWidth: size.phone });
  const navigate = useNavigate();

  const toggleToast = () => {
    toast.dark('???? ??????????????? OuO (???????????????)', {
      position: 'top-center',
      autoClose: 1500,
    });
  };
  const handleSubmit = async () => {
    if (isLogin) return;

    if (loading) return;

    if (!studentId) {
      setErrorMsg('???????????????');
      return;
    }
    if (!password) {
      setErrorMsg('???????????????');
      return;
    }
    if (!readCheck) {
      setErrorMsg('????????????????????????????????????????????????');
      return;
    }

    const data = {
      studentId: studentId,
      password: password,
    };

    setLoading(true);
    const fetchLoginData = await LoginApi(data);
    const fetchMessage = fetchLoginData;
    setLoading(false);

    const isSuccess = fetchLoginData.message === 'Success.'; // ???????????????????????????

    // ????????????
    if (!isSuccess) {
      setErrorMsg(`???${fetchMessage}`);
      return;
    }

    // ????????????
    setGrade(fetchLoginData.data.year);
    toggleToast();
    setLoginMsg('?????????????????? :)');
    setErrorMsg('');
    const fetchCourseData = await GetList();
    setCourseData(fetchCourseData);
    await timeout(1);
    setIsLogin(true);
    navigate('/search');
  };
  const handleReadCheck = () => {
    setReadCheck(!readCheck);
  };

  useEffect(() => {
    setLoginMsg('??????');
  }, []);

  return (
    <>
      <Container>
        {!isTableSmall && (
          <LeftWrapper>
            <ImgBox src={balloon} />
          </LeftWrapper>
        )}
        <RightWrapper>
          <LoginBox>
            <Title>????????????????????????</Title>
            <SubTitle>?????????????????????????????????</SubTitle>
            <InputBox>
              <InputTitle>??????</InputTitle>
              <Input
                type='text'
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </InputBox>
            <InputBox style={{ marginBottom: '12px' }}>
              <InputTitle>??????</InputTitle>
              <Input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputBox>
            <CheckBox onClick={handleReadCheck}>
              {!readCheck && <MdOutlineCheckBoxOutlineBlank />}
              {readCheck && <MdOutlineCheckBox />}
              ?????????????????????
              <NavLink to='/disclaimer'>
                <Link>????????????</Link>
              </NavLink>
            </CheckBox>
            {!loading && (
              <ErrorMessage>{errorMsg}</ErrorMessage>
            )}
            <Button onClick={handleSubmit} isLoading={loading}>
              <PuffLoader
                color={colors.primaryText}
                size={24}
                loading={loading}
              />
              {!loading && <ButtonText>{loginMsg}</ButtonText>}
            </Button>
            {loading && (
              <Hint>
                {
                  '??????????????????????????????????????????... ?????????????????? >.O'
                }
              </Hint>
            )}
          </LoginBox>
          {!isPhone && <Cat1 src={cat_1} />}
        </RightWrapper>
      </Container>
    </>
  );
};
