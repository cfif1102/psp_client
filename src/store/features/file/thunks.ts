import { FileApi } from '@api/file.api'
import { CreateFile, UpdateFile } from '@app-types/file.types'
import { createAppAsyncThunk } from '@app-types/store.types'

export const createFile = createAppAsyncThunk(
    'file/create-thunk',
    async (data: CreateFile, { getState }) => {
        const file = await FileApi.create(data)
        const state = getState()

        const storage = state.storage.storage

        if (!storage) {
            return
        }

        storage.files.push(file)

        const index1 = state.storage.storages.findIndex(
            (st) => st.id === storage.id
        )

        if (index1 !== -1) {
            state.storage.storages[index1].files.push(file)
        }

        const index2 = state.storage.userStorages.findIndex(
            (st) => st.id === storage.id
        )

        if (index2 !== -1) {
            state.storage.userStorages[index1].files.push(file)
        }

        return file
    }
)

export const deleteFile = createAppAsyncThunk(
    'file/delete-thunk',
    async (id: number, { getState }) => {
        await FileApi.delete(id)

        const state = getState()

        const storage = state.storage.storage

        if (!storage) {
            return
        }

        storage.files = storage.files.filter((f) => f.id !== id)

        const index1 = state.storage.storages.findIndex(
            (st) => st.id === storage.id
        )

        if (index1 !== -1) {
            state.storage.storages[index1].files = state.storage.storages[
                index1
            ].files.filter((f) => f.id !== id)
        }

        const index2 = state.storage.userStorages.findIndex(
            (st) => st.id === storage.id
        )

        if (index2 !== -1) {
            state.storage.userStorages[index1].files =
                state.storage.userStorages[index1].files.filter(
                    (f) => f.id !== id
                )
        }
    }
)

export const updateFile = createAppAsyncThunk(
    'file/update-thunk',
    async (data: UpdateFile, { getState }) => {
        const file = await FileApi.update(data)

        const state = getState()

        const storage = state.storage.storage

        if (!storage) {
            return
        }

        storage.files.forEach((f, index) => {
            if (f.id === data.id) {
                storage.files[index] = file
            }
        })

        const index1 = state.storage.storages.findIndex(
            (st) => st.id === storage.id
        )

        if (index1 !== -1) {
            state.storage.storages[index1].files.forEach((f, index) => {
                if (f.id === data.id) {
                    state.storage.storages[index1].files[index] = file
                }
            })
        }

        const index2 = state.storage.userStorages.findIndex(
            (st) => st.id === storage.id
        )

        if (index2 !== -1) {
            state.storage.userStorages[index1].files.forEach((f, index) => {
                if (f.id === data.id) {
                    state.storage.userStorages[index1].files[index] = file
                }
            })
        }
    }
)
