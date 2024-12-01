import { CreateFile, File, UpdateFile } from '@app-types/file.types'
import { Api } from './api'
import axios, { AxiosError } from 'axios'

export const FileApi = {
    create: async (data: CreateFile) => {
        try {
            const formData = new FormData()

            formData.append('file', data.file)

            const response = await axios.post<{ file: File }>(
                `${process.env.REACT_APP_API_HOST}/storages/${data.storageId}/files`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            )

            return response.data.file
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data)
            }

            throw e
        }
    },

    update: async (data: UpdateFile) => {
        try {
            const response = await Api.patch<{ file: File }>(
                `/files/${data.id}`,
                {
                    name: data.name,
                }
            )

            return response.data.file
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data)
            }

            throw e
        }
    },

    delete: async (id: number) => {
        try {
            await Api.delete(`/files/${id}`)
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data)
            }

            throw e
        }
    },
}
