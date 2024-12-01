import { FormInput } from '@components/Auth/FormInput'
import { WithPrealoader } from '@components/Common/WithPreloader'
import { yupResolver } from '@hookform/resolvers/yup'
import { restoreThunk, setName } from '@store/features/storage/slice'
import { createStorage } from '@store/features/storage/thunks'
import { AppDispatch, RootState } from '@store/store'
import { AuthBtnStyled, FormHeader } from '@styles/form-input'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const FormSchema = Yup.object({
    name: Yup.string().min(1).required(),
})

interface IForm {
    name: string
}

export const StorageCreate: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { name, createStorage: createStorageThunk } = useSelector(
        (state: RootState) => state.storage
    )
    const { user } = useSelector((state: RootState) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm<IForm>({
        resolver: yupResolver(FormSchema),
        defaultValues: { name },
    })

    const formOnSubmit = (data: IForm) => {
        if (!user) {
            return
        }

        dispatch(createStorage(data))
    }

    useEffect(() => {
        if (createStorageThunk.status === 'succeeded') {
            dispatch(restoreThunk('createStorage'))

            navigate('/my-storages')
        }
    }, [createStorageThunk.status])

    return (
        <div>
            <form onSubmit={handleSubmit(formOnSubmit)}>
                <div className="row d-flex flex-row justify-content-center">
                    <div className="d-flex flex-column align-items-center">
                        <FormHeader>Создание хранилища</FormHeader>

                        <FormInput
                            type="text"
                            register={register('name')}
                            value={name}
                            placeholder="Введите название хранилища"
                            error={errors.name}
                            id="name"
                            action={setName}
                            labelText="Название хранилища"
                            clearError={clearErrors}
                            extraClass="col-12"
                        />
                    </div>

                    <WithPrealoader status={createStorageThunk.status}>
                        <AuthBtnStyled
                            value="Создать"
                            className="mt-4"
                            type="submit"
                        />
                    </WithPrealoader>
                </div>
            </form>
        </div>
    )
}
