import styled from 'styled-components'
import { colors } from './global'
import { NavLink } from 'react-router-dom'
import { lighten } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const StorageNavLinkIcon = styled(FontAwesomeIcon)`
    margin-right: 0.5rem;
`

export const StorageItemHeader = styled.div`
    height: 4rem;
`

export const StorageNavLink = styled(NavLink)`
    color: ${colors.lightBg};
    text-decoration: none;
    transition: all 0.15s ease;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.25rem;

    &:hover {
        color: ${colors.text};
    }

    &.active {
        color: ${colors.text};
    }

    &:not(:first-child) {
        margin-left: 2rem;
    }
`

export const StorageItemStyled = styled.div`
    background-color: ${colors.secondary};
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;

    &:not(:first-child) {
        margin-top: 0.5rem;
    }
`

export const StorageText = styled.div`
    color: ${colors.text};
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const StorageName = styled.div`
    width: 13.5rem;
    color: ${colors.text};
    font-weight: bold;
    display: flex;
`

export const StorageInfo = styled.div`
    margin-top: 0.65rem;
    display: flex;
    flex-direction: row;
`

export const StorageHeader = styled.div`
    font-size: 1.24rem;
    font-weight: bold;
    color: ${colors.text};
    text-align: center;
`
