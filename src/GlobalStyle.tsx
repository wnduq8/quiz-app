import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }
  
  html {
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
  body {
    margin: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  button, input {
    font-family: inherit;
  }
  
  button {
    padding: 0;
    background: none;
    border: none;
    outline: none;
  }
  
  ul {
    padding: 0;
  }
  
  li {
    list-style: none;
  }
`

export default GlobalStyle
