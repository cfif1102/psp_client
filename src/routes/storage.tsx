import { ProtectedRoute } from '@components/Common/ProtectedRoute'
import { FilesWrapper } from '@components/File/FilesWrapper'
import { StorageCreate } from '@components/Storage/StorageCreate'
import { StorageParams } from '@components/Storage/StorageParams'
import { Storages } from '@components/Storage/Storages'
import { StoragesMy } from '@components/Storage/StoragesMy'
import { RouteObject } from 'react-router-dom'

export const storageRoutes: RouteObject[] = [
    {
        path: '/storages/create',
        element: (
            <ProtectedRoute redirectTo="/sign-in">
                <StorageCreate />
            </ProtectedRoute>
        ),
    },
    {
        path: '/storages',
        element: <Storages />,
    },
    {
        path: '/storages/:storageId',
        element: <StorageParams />,
    },
    {
        path: '/my-storages',
        element: (
            <ProtectedRoute redirectTo="/sign-in">
                <StoragesMy />
            </ProtectedRoute>
        ),
    },
]
