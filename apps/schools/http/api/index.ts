import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_URL

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders: headers => {
            headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iis3OTk5OTk5OTk5OSIsImlhdCI6MTY4ODEyNDcwMywiZXhwIjoxNjg4NzI5NTAzLCJqdGkiOiJlMWU0Mzg1MC1lNDI3LTQ0NzUtOTM3MS1hYzdhNmEzZmE1MGMiLCJ1c2VyX2lkIjoiZGM3M2RkNzQtYmY0Zi00NDgyLTg5ZjAtMzYzMWEyZDQ0MzIwIn0.HcMoJQNa6aYUkwm-5gDdrQGq8YAcZuiYOi_U5B-F5BE')
            headers.set('Content-Type', 'application/json;charset=UTF-8')
            return headers
        },
    }),
    endpoints: _ => ({}),
})
