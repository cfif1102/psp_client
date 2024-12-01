import { CreateStorage, Storage, UpdateStorage } from '@app-types/storage.types'
import { AxiosError } from 'axios'
import { Api } from './api'

export const StorageApi = {
    create: async (data: CreateStorage) => {
        try {
            const response = await Api.post<{ storage: Storage }>(
                '/storages',
                data
            )

            return response.data.storage
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data)
            }

            throw e
        }
    },

    update: async (data: UpdateStorage) => {
        try {
            const response = await Api.patch<{ storage: Storage }>(
                `/storages/${data.id}`,
                {
                    name: data.name,
                }
            )

            return response.data.storage
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data)
            }

            throw e
        }
    },

    delete: async (id: number) => {
        try {
            await Api.delete(`/storages/${id}`)
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data)
            }

            throw e
        }
    },

    findUserStorages: async () => {
        try {
            const response = await Api.get<{ storages: Storage[] }>(
                `/users/storages`
            )

            return response.data.storages
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data)
            }

            throw e
        }
    },

    findStorages: async () => {
        try {
            const response = await Api.get<{ storages: Storage[] }>(`/storages`)

            return response.data.storages
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                throw new Error(e.response.data)
            }

            throw e
        }
    },
}
