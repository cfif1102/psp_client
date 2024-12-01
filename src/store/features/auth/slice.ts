import { User } from '@app-types/auth.types'
import { ThunkState, ThunkType } from '@app-types/store.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signIn, signUp, signOut, authMe } from './thunks'

interface State {
    username: string
    password: string
    user: User | null
    isAuthorized: boolean
    signIn: ThunkType
    signUp: ThunkType
    authMe: ThunkType
    signOut: ThunkType
}

const state: State = {
    username: '',
    password: '',
    user: null,
    isAuthorized: false,
    signIn: ThunkState(),
    signUp: ThunkState(),
    authMe: ThunkState(),
    signOut: ThunkState(),
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload
        },
        setSignIn(state) {
            state.signIn.error = null
        },
        setSignUp(state) {
            state.signUp.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state, action) => {
                state.signIn.status = 'pending'
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.signIn.status = 'succeeded'

                const result = action.payload

                state.user = result
                state.isAuthorized = true
            })
            .addCase(signIn.rejected, (state, action) => {
                state.signIn.status = 'rejected'
                state.signIn.error = action.error.message ?? 'Unknown Error'
            })

            .addCase(signUp.pending, (state, action) => {
                state.signUp.status = 'pending'
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.signUp.status = 'succeeded'

                const result = action.payload

                state.user = result
                state.isAuthorized = true
            })
            .addCase(signUp.rejected, (state, action) => {
                state.signUp.status = 'rejected'
                state.signUp.error = action.error.message ?? 'Unknown Error'
            })

            .addCase(signOut.pending, (state, action) => {
                state.signOut.status = 'pending'
            })
            .addCase(signOut.fulfilled, (state, action) => {
                state.signOut.status = 'succeeded'

                state.user = null
                state.isAuthorized = false
            })
            .addCase(signOut.rejected, (state, action) => {
                state.signOut.status = 'rejected'
                state.signOut.error = action.error.message ?? 'Unknown Error'
            })

            .addCase(authMe.pending, (state, action) => {
                state.authMe.status = 'pending'
            })
            .addCase(authMe.fulfilled, (state, action) => {
                state.authMe.status = 'succeeded'

                const user = action.payload

                state.user = user
                state.isAuthorized = true
            })
            .addCase(authMe.rejected, (state, action) => {
                state.authMe.status = 'rejected'
                state.authMe.error = action.error.message ?? 'Unknown Error'
            })
    },
})

export const { setPassword, setUsername, setSignIn, setSignUp } =
    authSlice.actions
