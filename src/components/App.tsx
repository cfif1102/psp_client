import React, { useEffect } from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import GlobalStyles from '@styles/global'
import { WithPrealoader } from './Common/WithPreloader'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@store/store'
import { authMe } from '@store/features/auth/thunks'

export const App: React.FC = () => {
    const { authMe: authMeThunk } = useSelector(
        (state: RootState) => state.auth
    )
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(authMe())
    }, [])

    return (
        <div className="d-flex flex-column">
            <Header />

            <main className="py-4">
                <div className="container">
                    <WithPrealoader status={authMeThunk.status}>
                        <Outlet />
                    </WithPrealoader>
                </div>
            </main>

            <GlobalStyles />
        </div>
    )
}
