import axios from 'axios'

export const Api = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})
