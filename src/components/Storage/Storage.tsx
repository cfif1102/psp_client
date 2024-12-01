import { User } from '@components/User/User'
import { AppDispatch, RootState } from '@store/store'
import { HeaderLink, SignInLinkStyled } from '@styles/header'
import {
    StorageItemHeader,
    StorageItemStyled,
    StorageName,
    StorageNavLink,
    StorageNavLinkIcon,
} from '@styles/storage'
import React, { useEffect, useState } from 'react'
import { faFile, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AuthBtnStyled } from '@styles/form-input'
import { WithPrealoader } from '@components/Common/WithPreloader'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FormInput } from '@components/Auth/FormInput'
import { restoreThunk, setName } from '@store/features/storage/slice'
import {
    createStorage,
    deleteStorage,
    updateStorage,
} from '@store/features/storage/thunks'
import { Files } from '@components/File/Files'
import { Storage as StorageType } from '@app-types/storage.types'

interface Props {
    id: number
    storage: StorageType
}

const FormSchema = Yup.object({
    name: Yup.string().min(1).required(),
})

interface IForm {
    name: string
}

export const Storage: React.FC<Props> = ({ id, storage }) => {
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const navigate = useNavigate()
    const { user } = useSelector((state: RootState) => state.auth)
    const {
        deleteStorage: deleteStorageThunk,
        name,
        updateStorage: updateStorageThunk,
    } = useSelector((state: RootState) => state.storage)
    const isOwner = user && user.id === storage.user.id
    const dispatch = useDispatch<AppDispatch>()

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm<IForm>({
        resolver: yupResolver(FormSchema),
        defaultValues: { name },
    })

    const onClickEdit = () => {
        if (!isOwner) {
            return
        }

        setValue('name', storage.name)
        dispatch(setName(storage.name))
        setShowEdit(!showEdit)
    }

    const onClickDelete = () => {
        const confirmed = window.confirm(
            'Вы действительно хотите удалить хранилище?'
        )

        if (!confirmed) {
            return
        }

        dispatch(deleteStorage(id))
    }

    useEffect(() => {
        if (deleteStorageThunk.status === 'succeeded') {
            dispatch(restoreThunk('deleteStorage'))

            navigate('/my-storages')
        }
    }, [deleteStorageThunk.status])

    useEffect(() => {
        if (updateStorageThunk.status === 'succeeded') {
            dispatch(restoreThunk('updateStorage'))

            setShowEdit(false)
        }
    }, [updateStorageThunk.status])

    const formOnSubmit = (data: IForm) => {
        if (!user) {
            return
        }

        dispatch(
            updateStorage({
                id,
                name: data.name,
            })
        )
    }

    return (
        <div>
            <StorageItemStyled className="d-flex flex-row align-items-center justify-content-between ">
                <StorageItemHeader className="d-flex flex-row align-items-center">
                    <User {...storage.user} avatarSize={36} />

                    {isOwner && showEdit ? (
                        <form
                            onSubmit={handleSubmit(formOnSubmit)}
                            className="d-flex flex-row align-items-center ms-3"
                        >
                            <FormInput
                                type="text"
                                register={register('name')}
                                value={name}
                                placeholder="Название хранилища"
                                error={errors.name}
                                id="name"
                                action={setName}
                                labelText="Название хранилища"
                                showLabel={false}
                                clearError={clearErrors}
                                extraClass="mt-2 me-2"
                            />

                            <WithPrealoader status={updateStorageThunk.status}>
                                <AuthBtnStyled
                                    value="Сохранить"
                                    className="mt-4"
                                    type="submit"
                                />
                            </WithPrealoader>
                        </form>
                    ) : (
                        <StorageName className="ms-3">
                            {storage.name}
                        </StorageName>
                    )}
                </StorageItemHeader>

                <div className="d-flex flex-row">
                    {isOwner && (
                        <div className="ms-4">
                            <WithPrealoader status={deleteStorageThunk.status}>
                                <>
                                    <AuthBtnStyled
                                        value="Редактировать"
                                        type="button"
                                        className="me-2"
                                        onClick={onClickEdit}
                                    />
                                    <AuthBtnStyled
                                        value="Удалить"
                                        type="button"
                                        className="me-2"
                                        onClick={onClickDelete}
                                    />
                                </>
                            </WithPrealoader>
                        </div>
                    )}

                    <SignInLinkStyled to={`/storages`}>Назад</SignInLinkStyled>
                </div>
            </StorageItemStyled>

            <StorageItemStyled>
                <Files storage={storage} />
            </StorageItemStyled>
        </div>
    )
}
