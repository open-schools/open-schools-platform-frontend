import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { BASE_API_URL } from '../index'

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders: headers => {
            headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iis3OTk5OTk5OTk5OSIsImlhdCI6MTY4ODA1MTE1MiwiZXhwIjoxNjg4NjU1OTUyLCJqdGkiOiJlNjQwZGIyMy1hODMyLTQ0NGItYjliYS1jMDZkYzEzMDFlMWIiLCJ1c2VyX2lkIjoiZGM3M2RkNzQtYmY0Zi00NDgyLTg5ZjAtMzYzMWEyZDQ0MzIwIn0.lXKbN-Tx-0_FvC2MZqR3wM0x__vB30Nr3-JslHUKOYU')
            headers.set('Content-Type', 'application/json;charset=UTF-8')
            return headers
        },
    }),
    endpoints: _ => ({}),
})
