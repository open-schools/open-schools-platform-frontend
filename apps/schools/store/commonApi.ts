import Cookies from 'universal-cookie'
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export interface ErrorType {
    data: {
        error: {
            code: string
            message?: string
            violation_fields: any
            violations: [string]
        }
    }
    status: number
}

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_URL
const cookies = new Cookies()

export function providesList<R extends { id: string | undefined }[], T extends string>(
    resultsWithIds: R | undefined,
    tagType: T,
) {
    return resultsWithIds
        ? [{ type: tagType, id: 'LIST' }, ...resultsWithIds.map(({ id }) => ({ type: tagType, id }))]
        : [{ type: tagType, id: 'LIST' }]
}

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const csrfToken = cookies.get('csrftoken')
            if (csrfToken) {
                headers.set('X-CSRFToken', csrfToken)
            }
            const jwtToken = cookies.get('jwtToken')
            if (jwtToken) {
                headers.set('Authorization', `Bearer ${jwtToken}`)
            }
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }) as BaseQueryFn<string | FetchArgs, unknown, ErrorType, {}>,
    tagTypes: ['Circle', 'Student'],
    endpoints: (_) => ({}),
})
