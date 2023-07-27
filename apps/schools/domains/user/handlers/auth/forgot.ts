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
    } else if ([401, 400, 404].includes(response.error?.status)) {
        message.error(PleaseReloadPageMsg)
        onError()
    }
}
