import styled from 'styled-components'
import { colors } from './global'
import { SignInLinkStyled } from './header'
import { darken, lighten } from 'polished'
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

export const FormInputStyled = styled.input`
    padding: 0.5rem 0.75rem;
    background: none;
    outline: none;
    border: none;
    border-bottom: 0.2rem solid ${colors.text};

    &::placeholder {
        color: ${colors.text};
    }
`

export const FormInputLabelStyled = styled.label`
    color: ${colors.text};
`

export const FormHeader = styled.div`
    color: ${colors.text};
    font-size: 1.75rem;
`

export const AuthBtnStyled = styled.input`
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

export const AuthLink = styled(Link)`
    color: ${colors.text};
    margin-top: 0.3rem;
    transition: all 0.3s ease;

    &:hover {
        color: ${lighten(0.15, colors.text)};
    }
`

export const AlertStyled = styled(Alert)`
    background: #b52525;
    color: white;
`
