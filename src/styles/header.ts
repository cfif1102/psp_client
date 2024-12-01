import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import styled from 'styled-components'
import { colors } from './global'

export const HeaderStyled = styled.header`
    height: 3.5rem;
    border: 1px solid gray;
    background-color: ${colors.lightBg};
`

export const HeaderLogo = styled.div`
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
`

export const HeaderLink = styled(NavLink)`
    color: ${darken(0.2, 'white')};
    text-decoration: none;
    transition: all 0.15s ease;

    &:hover {
        color: white;
    }

    &.active {
        color: white;
        font-weight: bold;
    }
`

export const SignInLinkStyled = styled(NavLink)`
    padding: 0.5rem 1rem;
    border: 1px solid ${colors.primary};
    background-color: ${colors.primary};
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all 0.25s ease;
    text-align: center;

    &:hover {
        border: 1px solid ${darken(0.1, colors.primary)};
        background-color: ${darken(0.1, colors.primary)};
        color: ${darken(0.1, 'white')};
    }
`
