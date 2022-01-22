import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../styles'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 40px;
  color: ${colors.title}
`
const SubTitle = styled.div`
  font-size: 30px;
  color: ${colors.subtitle}
`

export const Home = (props) => (
  <div>
    <h1>Home Page</h1>
    <Title>ABCDEFG</Title>
    <SubTitle>ABCDEFG</SubTitle>
    <Link to="login">Login</Link>
  </div>
);

