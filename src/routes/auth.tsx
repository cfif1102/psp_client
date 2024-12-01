import { SignIn } from '@components/Auth/SignIn'
import { SignUp } from '@components/Auth/SignUp'
import { AuthRedirect } from '@components/Common/AuthRedirect'
import { RouteObject } from 'react-router-dom'

export const authRoutes: RouteObject[] = [
    {
        path: '/sign-in',
        element: (
            <AuthRedirect redirectTo="/">
                <SignIn />
            </AuthRedirect>
        ),
    },
    {
        path: '/sign-up',
        element: (
            <AuthRedirect redirectTo="/">
                <SignUp />
            </AuthRedirect>
        ),
    },
]
