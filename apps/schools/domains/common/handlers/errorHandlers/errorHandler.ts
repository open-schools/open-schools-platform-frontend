import { message } from 'antd'

export const errorHandler = (error: any, data: any) => {
    if (data !== undefined) {
        if (error) {
            message.error(error?.data?.error.message)
            return
        }
        message.success('Упс, что-то пошло не так...')
    }
}
