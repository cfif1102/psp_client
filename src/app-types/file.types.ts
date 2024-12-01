import { User } from './auth.types'

export interface File {
    id: number
    name: string
    size: number
    owner: User
}

export interface UpdateFile {
    id: number
    name: string
}

export interface CreateFile {
    file: Blob
    storageId: number
}
