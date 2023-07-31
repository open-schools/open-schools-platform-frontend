import Cookies from 'universal-cookie'
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { isRejected, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { message } from 'antd'
import { errorCodes, ErrorType } from './utils'


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

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => next => action => {
    if (isRejected()(action)) {
        const { status, data } = action.payload
        const errorData = data && data.error
        const errorType = errorCodes[status]
        console.log(errorData)
        console.log(data)
        console.log(action)

        if (typeof errorType === 'string') {
            message.error(errorType);
        } else if (errorData.code) {
            message.error(errorType[errorData.code])
        }
    }
    return next(action)
}
