import { App } from '@components/App'
import { RouteObject } from 'react-router-dom'
import { authRoutes } from './auth'
import { storageRoutes } from './storage'

export const mainRoutes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [...authRoutes, ...storageRoutes],
    },
]
