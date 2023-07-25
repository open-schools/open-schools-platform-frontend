import { message } from 'antd'
import Router from 'next/router'
import { PleaseReloadPageMsg } from '../../components/auth/constants/message'

export async function resetHandler (password: string, reset: any, onFinish: (userID: string) => void, onError: () => void) {
    const token = localStorage.getItem('token')
    let response = await reset({ token, password })
    if ('data' in response) {
        Router.push('../auth/signin')
        onFinish('userID')
    } else if (response.error?.status === 401 || response.error?.status === 404) {
        message.error(PleaseReloadPageMsg)
        onError()
    }
}
