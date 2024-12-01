import { AppDispatch, RootState } from '@store/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Storage } from './Storage'
import { findStorages } from '@store/features/storage/thunks'
import { setStorage } from '@store/features/storage/slice'

export const StorageParams = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {
        findStorages: findStoragesThunk,
        storages,
        storage,
    } = useSelector((state: RootState) => state.storage)
    const params = useParams<{ storageId: string }>()
    const storageId = params.storageId ? parseInt(params.storageId) : null

    useEffect(() => {
        if (!storageId) {
            return
        }

        if (findStoragesThunk.status === 'idle') {
            dispatch(findStorages())

            return
        }

        if (
            findStoragesThunk.status === 'succeeded' &&
            (!storage || storage.id !== storageId)
        ) {
            const storage = storages.find((st) => st.id === storageId)

            if (!storage) {
                return
            }

            dispatch(setStorage(storage))

            return
        }
    }, [findStoragesThunk.status, storages])

    if (!storageId) {
        return <div className="text-white">Неправильный параметр маршрута</div>
    }

    if (!storage) {
        return <div className="text-white">Хранилище не найдено...</div>
    }

    return <Storage id={storageId} storage={storage} />
}
