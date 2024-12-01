import { WithPrealoader } from '@components/Common/WithPreloader'
import { AppDispatch, RootState } from '@store/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StorageItem } from './StorageItem'
import { SignInLinkStyled } from '@styles/header'
import { StorageHeader } from '@styles/storage'
import { findUserStorages } from '@store/features/storage/thunks'

export const StoragesMy: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.auth)
    const { userStorages, findUserStorages: findUserStoragesThunk } =
        useSelector((state: RootState) => state.storage)

    useEffect(() => {
        dispatch(findUserStorages())
    }, [])

    return (
        <WithPrealoader status={findUserStoragesThunk.status}>
            <div className="d-flex flex-column">
                {userStorages.length ? (
                    userStorages.map((storage) => (
                        <StorageItem {...storage} key={storage.id} />
                    ))
                ) : (
                    <StorageHeader>
                        У вас нет хранилищ, вы можете создать свое...
                    </StorageHeader>
                )}

                <SignInLinkStyled to="/storages/create" className="mt-3">
                    Создать хранилище
                </SignInLinkStyled>
            </div>
        </WithPrealoader>
    )
}
