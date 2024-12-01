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
        const state = getState()

        const index1 = state.storage.storages.findIndex(
            (item) => item.id === storage.id
        )
        const index2 = state.storage.userStorages.findIndex(
            (item) => item.id === storage.id
        )

        if (index1 !== -1) {
            state.storage.storages[index1] = storage
        }

        if (index2 !== -1) {
            state.storage.userStorages[index2] = storage
        }

        return storage
    }
)

export const deleteStorage = createAppAsyncThunk(
    'storage/delete-thunk',
    async (id: number, { getState }) => {
        await StorageApi.delete(id)

        const state = getState()

        state.storage.storages = state.storage.storages.filter(
            (st) => st.id !== id
        )
        state.storage.userStorages = state.storage.userStorages.filter(
            (st) => st.id !== id
        )
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
