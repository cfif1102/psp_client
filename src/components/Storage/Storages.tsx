import { WithPrealoader } from '@components/Common/WithPreloader'
import { AppDispatch, RootState } from '@store/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StorageItem } from './StorageItem'
import { findStorages } from '@store/features/storage/thunks'
import { findSourceMap } from 'module'

export const Storages: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { storages, findStorages: findStoragesThunk } = useSelector(
        (state: RootState) => state.storage
    )

    useEffect(() => {
        dispatch(findStorages())
    }, [])

    return (
        <WithPrealoader status={findStoragesThunk.status}>
            <div className="d-flex flex-column">
                {storages.map((storage) => (
                    <StorageItem {...storage} key={storage.id} />
                ))}
            </div>
        </WithPrealoader>
    )
}
