import { Avatar } from '@mui/material'
import React from 'react'
import { User as UserType } from '@app-types/auth.types'
import { stringAvatar } from '@helpers/color-avatar.helper'
import { UserText } from '@styles/user'
import { colors } from '@styles/global'

interface Props extends UserType {
    avatarSize?: number | undefined
    color?: string
}

export const User = (props: Props) => {
    const avatarSize = props.avatarSize ? props.avatarSize : 56
    const username =
        props.username.length === 1
            ? `${props.username} ${props.username}`
            : `${props.username[0]} ${props.username[1]}`
    const color = props.color || colors.text

    return (
        <div className="d-flex flex-row align-items-center">
            <Avatar {...stringAvatar(username, avatarSize, avatarSize)} />

            <UserText className="ms-2 fs-5" color={color}>
                {props.username}
            </UserText>
        </div>
    )
}
