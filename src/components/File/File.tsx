import { FormInput } from '@components/Auth/FormInput'
import { WithPrealoader } from '@components/Common/WithPreloader'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatFileSize } from '@helpers/file-size.helper'
import { yupResolver } from '@hookform/resolvers/yup'
import { AppDispatch, RootState } from '@store/store'
import { FileStyled, FileText } from '@styles/file'
import { AuthBtnStyled } from '@styles/form-input'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { File as FileType } from '@app-types/file.types'
import { restoreThunk, setName } from '@store/features/file/slice'
import { deleteFile, updateFile } from '@store/features/file/thunks'

interface Props extends FileType {}

const FormSchema = Yup.object({
    name: Yup.string().min(1).required(),
})

interface IForm {
    name: string
}

export const File: React.FC<Props> = ({ id, name, size }) => {
    const dispatch = useDispatch<AppDispatch>()
    const {
        file,
        name: fileName,
        deleteFile: deleteFileThunk,
        updateFile: updateFileThunk,
    } = useSelector((state: RootState) => state.file)
    const { storage } = useSelector((state: RootState) => state.storage)
    const { user } = useSelector((state: RootState) => state.auth)
    const [edit, setEdit] = useState<boolean>(false)

    const linkRef = useRef<HTMLAnchorElement>(null)
    const isOwner = user && user.id === storage?.user.id

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm<IForm>({
        resolver: yupResolver(FormSchema),
        defaultValues: { name: fileName },
    })

    const onClickEdit = () => {
        if (!isOwner) {
            return
        }

        setValue('name', name)
        dispatch(setName(name))
        setEdit(!edit)
    }

    const onClickDeleteFile = () => {
        if (!isOwner && !user) {
            return
        }

        const confirmed = window.confirm(
            'Вы действительно хотите удалить файл?'
        )

        if (!confirmed) {
            return
        }

        dispatch(deleteFile(id))
    }

    const formOnSubmit = (data: IForm) => {
        if (!user || !storage) {
            return
        }

        dispatch(
            updateFile({
                id,
                name: data.name,
            })
        )
    }

    const onClickDownload = () => {
        const a = document.createElement('a')

        a.href = `${process.env.REACT_APP_API_HOST}/files/${id}`

        a.click()
    }

    useEffect(() => {
        if (updateFileThunk.status === 'succeeded') {
            setEdit(false)
            dispatch(restoreThunk('updateFile'))
        }
    }, [updateFileThunk.status])

    return (
        <FileStyled>
            <div className="d-flex flex-row align-items-center">
                <FontAwesomeIcon icon={faFileAlt} />

                {isOwner && edit ? (
                    <form
                        onSubmit={handleSubmit(formOnSubmit)}
                        className="d-flex flex-row align-items-center ms-3"
                    >
                        <FormInput
                            type="text"
                            register={register('name')}
                            value={fileName}
                            placeholder="Название файла"
                            error={errors.name}
                            id="name"
                            action={setName}
                            labelText="Название файла"
                            showLabel={false}
                            clearError={clearErrors}
                            extraClass="mt-2 me-2"
                        />

                        <WithPrealoader status={updateFileThunk.status}>
                            <AuthBtnStyled
                                value="Сохранить"
                                className="mt-4"
                                type="submit"
                            />
                        </WithPrealoader>
                    </form>
                ) : (
                    <>
                        <FileText className="ms-2">{name}</FileText>
                        <FileText className="ms-2">
                            {formatFileSize(size)}
                        </FileText>
                    </>
                )}
            </div>

            <div>
                <AuthBtnStyled
                    type="button"
                    value="Скачать"
                    onClick={onClickDownload}
                />
                {isOwner && (
                    <WithPrealoader status={deleteFileThunk.status}>
                        <WithPrealoader status={updateFileThunk.status}>
                            <>
                                <AuthBtnStyled
                                    type="button"
                                    value="Редактировать"
                                    onClick={onClickEdit}
                                    className="ms-2"
                                />

                                <AuthBtnStyled
                                    type="button"
                                    value="Удалить"
                                    onClick={onClickDeleteFile}
                                    className="ms-2"
                                />
                            </>
                        </WithPrealoader>
                    </WithPrealoader>
                )}
            </div>

            <a hidden ref={linkRef} href="/" />
        </FileStyled>
    )
}
