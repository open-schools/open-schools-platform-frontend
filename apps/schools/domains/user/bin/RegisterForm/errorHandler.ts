import { message } from 'antd'

export const errorHandler = (error: any) => {
    if (error && 'message' in error) {
        
        message.error(error.data.error.message)
        return
    }
    message.success('Вы успешно подтянули кружки')
}
