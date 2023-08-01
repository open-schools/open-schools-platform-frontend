import Cookies from 'universal-cookie'
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { isRejected, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { message } from 'antd'


const errorCodes = {
    400: {
        ValidationError: 'Ошибка валидации данных',
        ParseError: 'Ошибка разбора запроса',
        InvalidArgument: 'Некорректный аргумент',
        QueryCorrupted: 'Объект поврежден',
        WrongStatusChange: 'Неверное изменение статуса',
        EmailServiceUnavailable: 'Сервис отправки электронной почты недоступен',
        AlreadyExists: 'Объект с такими параметрами уже существует',
        MapServiceUnavailable: 'Сервис карт недоступен',
    },
    401: 'Вы не аутентифицированы. Пожалуйста, выполните вход для доступа к запрашиваемому ресурсу',
    403: 'Недостаточно прав для выполнения операции. Обратитесь к администратору для получения необходимых разрешений',
    404: 'Объект не найден. Пожалуйста, убедитесь, что указанный ресурс существует и повторите запрос',
    429: 'Слишком много попыток. Пожалуйста, подождите некоторое время и повторите запрос позже',
}

interface ErrorType {
    data: {
        error: {
            code: string,
            message?: string,
            'violation_fields': any,
            violations: [string]
        }
    },
    status: number,
}

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

        typeof errorType === 'string' ? message.error(errorType)
            : errorData?.code && message.error(errorType?.[errorData.code])
    }
    return next(action)
}
