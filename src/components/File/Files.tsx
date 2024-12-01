import React, { useRef, useState } from 'react'
import { File } from './File'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@store/store'
import { FileSelectedStyled } from '@styles/file'
import { formatFileSize } from '@helpers/file-size.helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { AuthBtnStyled } from '@styles/form-input'
import { WithPrealoader } from '@components/Common/WithPreloader'
import { createFile } from '@store/features/file/thunks'
import { Storage } from '@app-types/storage.types'

interface Props {
    storage: Storage
}

export const Files: React.FC<Props> = ({ storage }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.auth)
    const { createFile: createFileThunk } = useSelector(
        (state: RootState) => state.file
    )
    const isOwner = user && storage.user.id === user.id
    const inputRef = useRef<HTMLInputElement>(null)

    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            setSelectedFile(file)
        }
    }

    const onClickSelectFile = () => {
        if (!inputRef.current) {
            return
        }

        inputRef.current.click()
    }

    const onClickDownload = async () => {
        if (!selectedFile || !user) {
            return
        }

        
        dispatch(
            createFile({
                storageId: storage.id,
                file: selectedFile,
            })
        )
    }

    return (
        <div>
            {storage.files.length
                ? storage.files.map((file) => <File {...file} key={file.id} />)
                : null}

            {isOwner && (
                <WithPrealoader status={createFileThunk.status}>
                    <div>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            hidden
                            ref={inputRef}
                        />

                        <AuthBtnStyled
                            onClick={onClickSelectFile}
                            value="Выбрать файл"
                            type="button"
                            className="w-100 mt-2"
                        />

                        {selectedFile && (
                            <>
                                <FileSelectedStyled>
                                    <FontAwesomeIcon icon={faFile} />
                                    <div className="ms-2">
                                        {selectedFile.name}
                                    </div>
                                    <div className="ms-2">
                                        {formatFileSize(selectedFile.size)}
                                    </div>
                                </FileSelectedStyled>

                                <AuthBtnStyled
                                    onClick={onClickDownload}
                                    value="Загрузить файл"
                                    type="button"
                                    className="w-100 mt-2"
                                />
                            </>
                        )}
                    </div>
                </WithPrealoader>
            )}
        </div>
    )
}
