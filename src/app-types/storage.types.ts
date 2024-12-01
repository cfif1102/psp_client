import { User } from './auth.types'
import { File } from './file.types'

export interface Storage {
    id: number
    name: string
    user: User
    files: File[]
}

export interface CreateStorage {
    name: string
}

export interface UpdateStorage {
    id: number
    name: string
}
