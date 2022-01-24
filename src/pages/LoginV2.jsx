import React from 'react';
import balloon from '../assets/login-balloon.svg'
import cat_1 from '../assets/login-cat-1.svg'
import cat_2 from '../assets/login-cat-2.svg'
import moon from '../assets/login-moon.svg'
import { Link } from 'react-router-dom';
import { colors } from '../styles'
import styled, { keyframes } from 'styled-components'

const generateShadow = (count, color) => {
  let i = 0;
  let value = '';
  for(i = 0 ; i < count ; i++) {
    value += `-${i}px ${i}px 0px ${color}`
    if(i != count - 1) {
      value += ', '
    }
  }
  return value;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
const LeftWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background: ${colors.gray400};
`

const RightWrapper = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 40px;
  z-index: 1;
  box-shadow: -4px 0 4px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`
const LoginBox = styled.div`
  width: 560px;
  height: fit-content;
  background: #303030;
  border-radius: 8px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 3px 0px 4px rgba(0,0,0,0.3), ${generateShadow(420, 'rgba(40,40,40,0.2)')};
  // box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
`

const wave = keyframes`
  from {
    transform: translate(0, 20px);
  }
  to {
    transform: translate(0, -20px);
  }
`

const ImgBox = styled.img`
  width: 80%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, .4));
  animation: ${wave} 3s alternate ease-in-out infinite;
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
  background: ${colors.gray500};
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

const Cat_1 = styled.img`
  width: 20%;
  height: fit-content;
  object-fit: contain;
  position: absolute;
  bottom: -50px;
  left: -50px;
  filter: drop-shadow(4px 0px 3px rgba(0,0,0,0.6))
`

const PaperCut = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${colors.gray400};
  border-radius: 100%;
  box-shadow: inset 0px 0px 30px rgba(0,0,0,1);
`

const Moon = styled.img`
  width: 20%;
  height: fit-content;
  object-fit: contain;
  position: absolute;
  top: 20px;
  right: 20px;
  filter: drop-shadow(4px 0px 3px rgba(0,0,0,0.6))
`

export const LoginV2 = (props) => (
  <>
    <Container>
      <LeftWrapper>
        {/* <PaperCut></PaperCut> */}
        <ImgBox src={balloon}/>
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
        <Cat_1 src={cat_1} />
      </RightWrapper>
    </Container>
    {/* <div>
      <h1>Home Page</h1>
      <Link to="/login">Login</Link>
    </div> */}
  </>
);
