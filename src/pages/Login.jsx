import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../styles'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`
const LeftWrapper = styled.div`
  width: 40%;
  display: flex;
  overflow: hidden;
  position: relative;
`
const RightWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 40px;
`
const LoginBox = styled.div`
  width: 560px;
  height: fit-content;
  background: #303030;
  border-radius: 12px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ImgBox = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.4);
`
const Title = styled.div`
  font-size: 36px;
  color: ${colors.title};
  text-align: center;
  margin-bottom: 10px;
`
const SubTitle = styled.div`
  font-size: 18px;
  color: ${colors.subtitle};
  text-align: center;
  margin-bottom: 24px;
`
const LeftTitle = styled(Title)`
  font-size: 80px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const Button = styled.div`
  background: linear-gradient(45deg, #F6D365 0%, #FDA085 100%);
  width: 60%;
  margin-top: 20px;
  height: fit-content;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .3s;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    filter: brightness(0.9);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    filter: brightness(0.7);
  }
`
const ButtonText = styled.div`
  font-size: 24px;
  font-weight: 500;
  position: relative;
  top: 1px;
  color: #2D2D2D;
`
const InputBox = styled.div`
  width: 100%;
  margin-bottom: 24px;
`
const InputTitle = styled(SubTitle)`
  font-size: 16px;
  text-align: left;
  color: #D0D0D3;
  margin-bottom: 8px;
`
const Input = styled.input`
  width: 100%;
  height: fit-content;
  padding: 10px 18px;
  font-size: 18px;
  color: #D0D0D3;
  border-radius: 4px;
  background: #1D1D1D;
  border: none;
  outline: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0);
  transition: .2s;
  &:hover {
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  }
  &:focus {
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid ${colors.primary500};
  }
`

export const Login = (props) => (
  <>
    <Container>
      <LeftWrapper>
        <ImgBox src='https://picsum.photos/1440'/>
        <LeftTitle>看三小</LeftTitle>
      </LeftWrapper>
      <RightWrapper>
        <LoginBox>
          <Title>所以你要登入了嗎</Title>
          <SubTitle>所以我說你為什麼不登入</SubTitle>
          <InputBox>
            <InputTitle>帳號</InputTitle>
            <Input type="text"/>
          </InputBox>
          <InputBox>
            <InputTitle>密碼</InputTitle>
            <Input type="password"/>
          </InputBox>
          <Button>
            <ButtonText>登入</ButtonText>
          </Button>
        </LoginBox>
      </RightWrapper>
    </Container>
    {/* <div>
      <h1>Home Page</h1>
      <Link to="/login">Login</Link>
    </div> */}
  </>
);
