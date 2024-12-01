import { ThunkState, ThunkType } from '@app-types/store.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createFile, deleteFile, updateFile } from './thunks'
import { File } from '@app-types/file.types'

interface State {
    createFile: ThunkType
    updateFile: ThunkType
    deleteFile: ThunkType
    file: File | null
    name: string
}

const state: State = {
    createFile: ThunkState(),
    updateFile: ThunkState(),
    deleteFile: ThunkState(),
    file: null,
    name: '',
}

export const fileSlice = createSlice({
    name: 'file',
    initialState: state,
    reducers: {
        setFile(state, action: PayloadAction<File | null>) {
            state.file = action.payload
        },
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        restoreThunk(
            state,
            action: PayloadAction<'createFile' | 'updateFile' | 'deleteFile'>
        ) {
            state[action.payload].status = 'idle'
            state[action.payload].error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFile.pending, (state, action) => {
                state.createFile.status = 'pending'
            })
            .addCase(createFile.fulfilled, (state, action) => {
                state.createFile.status = 'succeeded'
            })
            .addCase(createFile.rejected, (state, action) => {
                state.createFile.status = 'rejected'
                state.createFile.error = action.error.message ?? 'Unknown Error'
            })

            .addCase(deleteFile.pending, (state, action) => {
                state.deleteFile.status = 'pending'
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.deleteFile.status = 'succeeded'
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.deleteFile.status = 'rejected'
                state.deleteFile.error = action.error.message ?? 'Unknown Error'
            })

            .addCase(updateFile.pending, (state, action) => {
                state.updateFile.status = 'pending'
            })
            .addCase(updateFile.fulfilled, (state, action) => {
                state.updateFile.status = 'succeeded'
            })
            .addCase(updateFile.rejected, (state, action) => {
                state.updateFile.status = 'rejected'
                state.updateFile.error = action.error.message ?? 'Unknown Error'
            })
    },
})

export const { setFile, setName, restoreThunk } = fileSlice.actions
