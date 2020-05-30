import React from 'react'

import styled, { createGlobalStyle } from "styled-components";
import { Logos } from './assets';
import { Home } from './views/home';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300&display=swap');
  

  html, body {
    margin: 0;
    padding: 0;
  }
  html, body, #app {
    height: 100%;
    width: 100%;
  }
  
  body {
    font-family: Roboto;
    font-weight: 300;
  }
`;

const Logo = styled.img`
  width: 50px;
`;

export const Main = () => {
    return (
        <>
              <GlobalStyle />
              <Logo src={Logos.bg_black}/>
              <Home></Home>
        </>
    )
}