import { ThunkStatus, ThunkType } from '@app-types/store.types'
import React from 'react'
import { Spinner } from 'react-bootstrap'

interface Props {
    children: JSX.Element
    status: ThunkStatus
}

export const WithPrealoader = (props: Props) => {
    return props.status === 'pending' ? (
        <Spinner animation="border" variant="info" className="ms-3" />
    ) : (
        props.children
    )
}
