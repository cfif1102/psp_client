import { AppDispatch, RootState } from '@store/store'
import {
    HeaderLink,
    HeaderLogo,
    HeaderStyled,
    SignInLinkStyled,
} from '@styles/header'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { WithPrealoader } from './Common/WithPreloader'
import { AuthBtnStyled } from '@styles/form-input'
import Cookies from 'js-cookie'
import { User } from './User/User'
import { signOut } from '@store/features/auth/thunks'

export const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { user, authMe: authMeThunk } = useSelector(
        (state: RootState) => state.auth
    )

    const onClickSignOut = () => {
        dispatch(signOut())
    }

    return (
        <HeaderStyled>
            <div className="container d-flex flex-row align-items-center justify-content-between h-100">
                <div className="d-flex flex-row align-items-center">
                    <HeaderLogo>Storage</HeaderLogo>

                    <div className="d-flex flex-row ms-4">
                        <div>
                            <HeaderLink to="/storages">Хранилища</HeaderLink>
                        </div>
                        {user && (
                            <div className="ms-2">
                                <HeaderLink to="/my-storages">
                                    Мои хранилища
                                </HeaderLink>
                            </div>
                        )}
                    </div>
                </div>

                {!user ? (
                    <WithPrealoader status={authMeThunk.status}>
                        <SignInLinkStyled to="/sign-in">Войти</SignInLinkStyled>
                    </WithPrealoader>
                ) : (
                    <WithPrealoader status={authMeThunk.status}>
                        <div className="d-flex flex-row">
                            <User {...user} avatarSize={36} color="white" />
                            <AuthBtnStyled
                                type="button"
                                value="Выйти"
                                onClick={onClickSignOut}
                                className="ms-3"
                            />
                        </div>
                    </WithPrealoader>
                )}
            </div>
        </HeaderStyled>
    )
}
