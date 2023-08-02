import { message } from 'antd'
import Router from 'next/router'
import { PleaseReloadPageMsg, SuccessResetPasswordMsg } from '../../components/auth/constants/message'

export async function resetHandler (password: string, reset: any, onFinish: (userID: string) => void, onError: () => void) {
    const token = localStorage.getItem('token')
    let response = await reset({ token, password })
    if ('data' in response) {
        message.success(SuccessResetPasswordMsg)
        Router.push('../auth/signin')
        onFinish('userID')
    } else if (response.error?.status === 401) {
        message.error(PleaseReloadPageMsg)
        onError()
    }
}
