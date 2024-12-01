import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { RootState } from '@store/store'

interface ProtectedRouteProps {
    children: JSX.Element
    redirectTo: string
}

export const AuthRedirect: React.FC<ProtectedRouteProps> = ({
    children,
    redirectTo,
}) => {
    const { user } = useSelector((state: RootState) => state.auth)

    return !!user ? <Navigate to={redirectTo} /> : children
}
