import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { RootState } from '@store/store'
import { WithPrealoader } from './WithPreloader'

interface ProtectedRouteProps {
    children: JSX.Element
    redirectTo: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    redirectTo,
}) => {
    const { user, authMe } = useSelector((state: RootState) => state.auth)

    return (
        <WithPrealoader status={authMe.status}>
            {user ? children : <Navigate to={redirectTo} />}
        </WithPrealoader>
    )
}
