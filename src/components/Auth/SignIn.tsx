import { AppDispatch, RootState } from '@store/store'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import { FormInput } from './FormInput'
import {
    AlertStyled,
    AuthBtnStyled,
    AuthLink,
    FormHeader,
} from '@styles/form-input'
import { WithPrealoader } from '@components/Common/WithPreloader'
import { Alert } from 'react-bootstrap'
import { signIn } from '@store/features/auth/thunks'
import { setPassword, setSignIn, setUsername } from '@store/features/auth/slice'

const FormSchema = Yup.object({
    username: Yup.string().min(1).required(),
    password: Yup.string().min(1).required(),
})

interface IForm {
    username: string
    password: string
}

export const SignIn: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {
        username,
        password,
        signIn: signInThunk,
    } = useSelector((state: RootState) => state.auth)

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm<IForm>({
        resolver: yupResolver(FormSchema),
        defaultValues: { username, password },
    })

    const formOnSubmit = (data: IForm) => {
        dispatch(signIn(data))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(formOnSubmit)}>
                <div className="row d-flex flex-row justify-content-center">
                    <div className="col-6 d-flex flex-column align-items-center">
                        <FormHeader>Авторизация</FormHeader>

                        <FormInput
                            type="text"
                            register={register('username')}
                            value={username}
                            placeholder="Введите имя пользователя"
                            error={errors.username}
                            id="username"
                            action={setUsername}
                            labelText="Имя пользователя"
                            clearError={clearErrors}
                            extraClass="w-100"
                        />

                        <FormInput
                            type="password"
                            register={register('password')}
                            value={password}
                            placeholder="Введите пароль"
                            error={errors.password}
                            id="password"
                            extraClass="mt-2 w-100"
                            action={setPassword}
                            labelText="Пароль"
                            clearError={clearErrors}
                        />

                        <WithPrealoader status={signInThunk.status}>
                            <AuthBtnStyled
                                value="Войти"
                                className="mt-4 w-100"
                                type="submit"
                            />
                        </WithPrealoader>

                        <AuthLink to="/sign-up">Нет аккаунта?</AuthLink>

                        {signInThunk.error && (
                            <AlertStyled
                                variant="danger"
                                onClose={() => dispatch(setSignIn())}
                                dismissible
                                className="mt-3"
                                closeVariant="white"
                            >
                                <div>Ошибка при входе! {signInThunk.error}</div>
                            </AlertStyled>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}
