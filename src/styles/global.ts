import { createGlobalStyle } from 'styled-components'

export const colors = {
    lightBg: '#008585',
    bg: '#b8cdab',
    primary: '#c7522a',
    text: '#004343',
    secondary: '#fbf2c4',
}

export default createGlobalStyle`
  body, html {
    background-color: ${colors.bg};
  }
`
