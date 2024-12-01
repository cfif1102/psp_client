import styled from 'styled-components'

export const UserText = styled.div<{ color: string }>`
    color: ${({ color }) => color};
`
