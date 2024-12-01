import { createAsyncThunk } from '@reduxjs/toolkit'

import { RootState, AppDispatch } from '@store/store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: AppDispatch
}>()

export type ThunkStatus = 'idle' | 'pending' | 'succeeded' | 'rejected'

export interface ThunkType {
    status: ThunkStatus
    error: string | null
}

export const ThunkState = () => ({
    status: 'idle' as ThunkStatus,
    error: null,
})
