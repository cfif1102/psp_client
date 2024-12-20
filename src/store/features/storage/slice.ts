import { Storage } from '@app-types/storage.types'
import { ThunkState, ThunkType } from '@app-types/store.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    createStorage,
    deleteStorage,
    findStorages,
    findUserStorages,
    updateStorage,
} from './thunks'
import { File } from '@app-types/file.types'

interface State {
    storages: Storage[]
    userStorages: Storage[]
    createStorage: ThunkType
    deleteStorage: ThunkType
    updateStorage: ThunkType
    findStorages: ThunkType
    findUserStorages: ThunkType
    storage: Storage | null
    name: string
}

const state: State = {
    storages: [],
    userStorages: [],
    createStorage: ThunkState(),
    deleteStorage: ThunkState(),
    updateStorage: ThunkState(),
    findStorages: ThunkState(),
    findUserStorages: ThunkState(),
    name: '',
    storage: null,
}

export const storageSlice = createSlice({
    name: 'storage',
    initialState: state,
    reducers: {
        addStorageFile(state, action: PayloadAction<File>) {
            if (!state.storage) {
                return
            }

            state.storage.files.push(action.payload)

            state.storages = state.storages.map((st) =>
                st.id === state.storage?.id
                    ? { ...st, files: [...st.files, action.payload] }
                    : st
            )

            state.userStorages = state.userStorages.map((st) =>
                st.id === state.storage?.id
                    ? { ...st, files: [...st.files, action.payload] }
                    : st
            )
        },
        removeStorageFile(state, action: PayloadAction<number>) {
            if (!state.storage) {
                return
            }

            state.storage.files = state.storage.files.filter(
                (file) => file.id !== action.payload
            )

            state.storages = state.storages.map((st) =>
                st.id === state.storage?.id
                    ? {
                          ...st,
                          files: st.files.filter(
                              (file) => file.id !== action.payload
                          ),
                      }
                    : st
            )

            state.userStorages = state.userStorages.map((st) =>
                st.id === state.storage?.id
                    ? {
                          ...st,
                          files: st.files.filter(
                              (file) => file.id !== action.payload
                          ),
                      }
                    : st
            )
        },
        updateStorageFile(state, action: PayloadAction<File>) {
            if (!state.storage) {
                return
            }

            state.storage.files = state.storage.files.map((file) =>
                file.id === action.payload.id ? action.payload : file
            )

            state.storages = state.storages.map((st) =>
                st.id === state.storage?.id
                    ? {
                          ...st,
                          files: st.files.map((file) =>
                              file.id === action.payload.id
                                  ? action.payload
                                  : file
                          ),
                      }
                    : st
            )

            state.userStorages = state.userStorages.map((st) =>
                st.id === state.storage?.id
                    ? {
                          ...st,
                          files: st.files.map((file) =>
                              file.id === action.payload.id
                                  ? action.payload
                                  : file
                          ),
                      }
                    : st
            )
        },
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        setStorage(state, action: PayloadAction<Storage | null>) {
            state.storage = action.payload
        },
        restoreThunk(
            state,
            action: PayloadAction<
                'createStorage' | 'deleteStorage' | 'updateStorage'
            >
        ) {
            state[action.payload].error = null
            state[action.payload].status = 'idle'
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createStorage.pending, (state, action) => {
                state.createStorage.status = 'pending'
            })
            .addCase(createStorage.fulfilled, (state, action) => {
                state.createStorage.status = 'succeeded'

                state.storages.push(action.payload)
                state.userStorages.push(action.payload)
            })
            .addCase(createStorage.rejected, (state, action) => {
                state.createStorage.status = 'rejected'
                state.createStorage.error =
                    action.error.message ?? 'Unknown Error'
            })

            .addCase(updateStorage.pending, (state, action) => {
                state.updateStorage.status = 'pending'
            })
            .addCase(updateStorage.fulfilled, (state, action) => {
                state.updateStorage.status = 'succeeded'

                const storage = action.payload

                state.storage = storage

                state.storages = state.storages.map((st) =>
                    st.id === storage.id ? storage : st
                )

                state.userStorages = state.userStorages.map((st) =>
                    st.id === storage.id ? storage : st
                )
            })
            .addCase(updateStorage.rejected, (state, action) => {
                state.updateStorage.status = 'rejected'
                state.updateStorage.error =
                    action.error.message ?? 'Unknown Error'
            })

            .addCase(deleteStorage.pending, (state, action) => {
                state.deleteStorage.status = 'pending'
            })
            .addCase(deleteStorage.fulfilled, (state, action) => {
                state.deleteStorage.status = 'succeeded'
            })
            .addCase(deleteStorage.rejected, (state, action) => {
                state.deleteStorage.status = 'rejected'
                state.deleteStorage.error =
                    action.error.message ?? 'Unknown Error'
            })

            .addCase(findUserStorages.pending, (state, action) => {
                state.findUserStorages.status = 'pending'
            })
            .addCase(findUserStorages.fulfilled, (state, action) => {
                state.findUserStorages.status = 'succeeded'

                state.userStorages = action.payload
            })
            .addCase(findUserStorages.rejected, (state, action) => {
                state.findUserStorages.status = 'rejected'
                state.findUserStorages.error =
                    action.error.message ?? 'Unknown Error'
            })

            .addCase(findStorages.pending, (state, action) => {
                state.findStorages.status = 'pending'
            })
            .addCase(findStorages.fulfilled, (state, action) => {
                state.findStorages.status = 'succeeded'

                state.storages = action.payload
            })
            .addCase(findStorages.rejected, (state, action) => {
                state.findStorages.status = 'rejected'
                state.findStorages.error =
                    action.error.message ?? 'Unknown Error'
            })
    },
})

export const {
    setName,
    setStorage,
    restoreThunk,
    addStorageFile,
    updateStorageFile,
    removeStorageFile,
} = storageSlice.actions
