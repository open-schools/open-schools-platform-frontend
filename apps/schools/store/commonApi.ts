import Cookies from 'universal-cookie'
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { ErrorType } from './types'

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_URL
const cookies = new Cookies()

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        credentials: 'include',
        prepareHeaders: headers => {
            const csrfToken = cookies.get('csrftoken')
            if (csrfToken) {
                headers.set('X-CSRFToken', csrfToken)
            }
            const jwtToken = localStorage.getItem('jwtToken')
            if (jwtToken) {
                headers.set('Authorization', `Bearer ${jwtToken}`)
            }
            headers.set('Content-Type', 'application/json;charset=UTF-8')
            return headers
        },
    }) as BaseQueryFn<string | FetchArgs, unknown, ErrorType, {}>,
    endpoints: _ => ({}),
})
