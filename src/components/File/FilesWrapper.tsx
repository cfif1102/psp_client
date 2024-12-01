import { WithPrealoader } from '@components/Common/WithPreloader'
import { RootState } from '@store/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Files } from './Files'

export const FilesWrapper = () => {
    const { storage, findStorages: findStoragesThunk } = useSelector(
        (state: RootState) => state.storage
    )

    if (!storage && findStoragesThunk.status === 'succeeded') {
        return <div className="text-white">Хранилище не найдено...</div>
    }

    if (!storage) {
        return null
    }

    return (
        <WithPrealoader status={findStoragesThunk.status}>
            <Files storage={storage} />
        </WithPrealoader>
    )
}
