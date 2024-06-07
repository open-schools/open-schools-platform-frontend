import { message } from 'antd'
import Router from 'next/router'
import { PleaseReloadPageMsg, SuccessResetPasswordMsg } from '@domains/user/components/auth/constants/message'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

export async function resetHandler(
    password: string,
    reset: any,
    onFinish: (userID: string) => void,
    onError: () => void,
) {
    const token = localStorage.getItem('token')
    let response = await reset({ token, password })
    if ('data' in response) {
        message.success(SuccessResetPasswordMsg)
        Router.push(RoutePath[AppRoutes.AUTH_SIGN_IN])
        onFinish('userID')
    } else if (response.error?.status === 401) {
        message.error(PleaseReloadPageMsg)
        onError()
    }
}
