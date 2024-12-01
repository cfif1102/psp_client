import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './features/auth/slice'
import { storageSlice } from './features/storage/slice'
import { fileSlice } from './features/file/slice'

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        storage: storageSlice.reducer,
        file: fileSlice.reducer,
    },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store
