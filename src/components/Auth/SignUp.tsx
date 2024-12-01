import { AppDispatch, RootState } from '@store/store'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import { FormInput } from './FormInput'
import { AlertStyled, AuthBtnStyled, FormHeader } from '@styles/form-input'
import { signUp } from '@store/features/auth/thunks'
import { setPassword, setSignUp, setUsername } from '@store/features/auth/slice'

const FormSchema = Yup.object({
    username: Yup.string().min(1).required(),
    password: Yup.string().min(1).required(),
})

interface IForm {
    username: string
    password: string
}

export const SignUp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {
        username,
        password,
        signUp: signUpThunk,
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
        dispatch(signUp(data))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(formOnSubmit)}>
                <div className="row d-flex flex-row justify-content-center">
                    <div className="col-6 d-flex flex-column align-items-center">
                        <FormHeader>Регистрация</FormHeader>

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
                            type="text"
                            register={register('password')}
                            value={password}
                            placeholder="Введите пароль"
                            error={errors.password}
                            id="password"
                            extraClass="mt-1 w-100"
                            action={setPassword}
                            labelText="Пароль"
                            clearError={clearErrors}
                        />

                        <AuthBtnStyled
                            type="submit"
                            value="Создать аккаунт"
                            className="w-100 mt-4"
                        />

                        {signUpThunk.error && (
                            <AlertStyled
                                variant="danger"
                                onClose={() => dispatch(setSignUp())}
                                dismissible
                                className="mt-3"
                                closeVariant="white"
                            >
                                <div>Ошибка при входе! {signUpThunk.error}</div>
                            </AlertStyled>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}
