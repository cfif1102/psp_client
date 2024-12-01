import { FileApi } from '@api/file.api'
import { CreateFile, UpdateFile } from '@app-types/file.types'
import { createAppAsyncThunk } from '@app-types/store.types'
import {
    addStorageFile,
    removeStorageFile,
    updateStorageFile,
} from '../storage/slice'

export const createFile = createAppAsyncThunk(
    'file/create-thunk',
    async (data: CreateFile, { dispatch }) => {
        const file = await FileApi.create(data)

        dispatch(addStorageFile(file))

        return file
    }
)

export const deleteFile = createAppAsyncThunk(
    'file/delete-thunk',
    async (id: number, { dispatch }) => {
        await FileApi.delete(id)

        dispatch(removeStorageFile(id))

        return id
    }
)

export const updateFile = createAppAsyncThunk(
    'file/update-thunk',
    async (data: UpdateFile, { dispatch }) => {
        const file = await FileApi.update(data)

        dispatch(updateStorageFile(file))

        return file
    }
)
