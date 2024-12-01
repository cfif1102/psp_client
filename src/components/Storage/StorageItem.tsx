import { User } from '@components/User/User'
import {
    StorageInfo,
    StorageItemStyled,
    StorageName,
    StorageText,
} from '@styles/storage'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { AuthBtnStyled } from '@styles/form-input'
import { SignInLinkStyled } from '@styles/header'
import { Storage } from '@app-types/storage.types'

interface Props extends Storage {}

export const StorageItem: React.FC<Props> = ({ id, name, user, files }) => {
    return (
        <StorageItemStyled className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
                <User {...user} avatarSize={36} />
                <StorageName className="ms-3">{name}</StorageName>
            </div>

            <div className="d-flex flex-row">
                <StorageText className="ms-2">
                    <FontAwesomeIcon icon={faFile} className="me-1" />
                    <div>{files.length}</div>
                </StorageText>
            </div>

            <SignInLinkStyled to={`/storages/${id}`}>
                Просмотреть
            </SignInLinkStyled>
        </StorageItemStyled>
    )
}
