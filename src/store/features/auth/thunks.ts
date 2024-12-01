import { AuthApi } from '@api/auth.api'
import { SignIn, SignUp } from '@app-types/auth.types'
import { createAppAsyncThunk } from '@app-types/store.types'

export const signIn = createAppAsyncThunk(
    'auth/sign-in-thunk',
    async (data: SignIn) => {
        const user = await AuthApi.signIn(data)

        return user
    }
)

export const signUp = createAppAsyncThunk(
    'auth/sign-up-thunk',
    async (data: SignUp) => {
        const user = await AuthApi.signUp(data)

        return user
    }
)

export const signOut = createAppAsyncThunk('auth/sign-out-thunk', async () => {
    await AuthApi.signOut()
})

export const authMe = createAppAsyncThunk('auth/auth-me-thunk', async () => {
    const user = await AuthApi.authMe()

    return user
})
