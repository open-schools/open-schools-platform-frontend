import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_URL

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders: headers => {
            headers.set('Authorization', 'Bearer token')
            headers.set('Content-Type', 'application/json;charset=UTF-8')
            return headers
        },
    }),
    endpoints: _ => ({}),
})
