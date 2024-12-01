import { StorageApi } from '@api/storage.api'
import { CreateStorage, UpdateStorage } from '@app-types/storage.types'
import { createAppAsyncThunk } from '@app-types/store.types'

export const createStorage = createAppAsyncThunk(
    'storage/create-thunk',
    async (data: CreateStorage, { getState }) => {
        const storage = await StorageApi.create(data)

        return storage
    }
)

export const updateStorage = createAppAsyncThunk(
    'storage/update-thunk',
    async (data: UpdateStorage, { getState }) => {
        const storage = await StorageApi.update(data)

        return storage
    }
)

export const deleteStorage = createAppAsyncThunk(
    'storage/delete-thunk',
    async (id: number, { getState }) => {
        await StorageApi.delete(id)

        return id
    }
)

export const findStorages = createAppAsyncThunk(
    'storage/find-storages-thunk',
    async () => {
        const storages = await StorageApi.findStorages()

        return storages
    }
)

export const findUserStorages = createAppAsyncThunk(
    'storage/find-user-storages-thunk',
    async () => {
        const storages = await StorageApi.findUserStorages()

        return storages
    }
)
