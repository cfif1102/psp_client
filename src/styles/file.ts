import styled from 'styled-components'
import { colors } from './global'

export const FileStyled = styled.div`
    background-color: ${colors.secondary};
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: row;
    margin-top: 0.5rem;
    font-weight: bold;
    align-items: center;
    justify-content: space-between;
`

export const FileText = styled.div`
    color: ${colors.text};
`

export const FileSelectedStyled = styled.div`
    background-color: ${colors.secondary};
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${colors.text};
    font-weight: bold;
    margin-top: 0.5rem;
`
