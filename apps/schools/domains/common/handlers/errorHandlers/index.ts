import { message } from 'antd'

export const index = (error: any, data: any) => {
    if (data !== undefined) {
        if (error) {
            message.error(error?.data?.error.message)
            return
        }
    }
}
