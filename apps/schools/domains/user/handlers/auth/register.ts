import { FormInstance, message } from 'antd'
import Router from 'next/router'
import { normalizePhone } from '@domains/common/utils/phone'
import {
    LoadingMsg,
    SendNewSmsCodeMsg,
    PleaseReloadPageMsg,
    UserAlreadyExitsMsg,
    WrongPhoneFormatMsg,
    WrongSmsCodeMsg,
    SuccessRegistrationMsg,
} from '@domains/user/components/auth/constants/message'
import { withLoadingMessage } from '@domains/common/utils/loading'
import Cookies from 'universal-cookie'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

export async function tokenHandler(
    recaptchaToken: string,
    formComponent: FormInstance,
    nextUrl: string,
    registrationMutation: any,
    onFinish: () => void,
) {
    if (recaptchaToken === '') return

    let { phone: inputPhone } = formComponent.getFieldsValue(['phone'])
    inputPhone = '+' + inputPhone
    const phone = normalizePhone(inputPhone)

    if (!phone) {
        formComponent.setFields([
            {
                name: 'phone',
                errors: [WrongPhoneFormatMsg],
            },
        ])
        return
    }

    let response = await withLoadingMessage(LoadingMsg, registrationMutation, {
        phone: phone,
        recaptcha: recaptchaToken,
    })
    if ('data' in response) {
        localStorage.setItem('token', response.data.token)
        Router.push(`${RoutePath[AppRoutes.AUTH]}/${nextUrl}?token=${37128937218937}`)
        onFinish()
    } else {
        message.error(PleaseReloadPageMsg)
    }
}

export async function otpHandler(
    smsCode: string,
    verifyCodeMutation: any,
    onFinish: () => void,
    formComponent: FormInstance,
    onError: () => void,
) {
    let token = localStorage.getItem('token')
    let response = await verifyCodeMutation({ otp: smsCode, token_key: token })
    if (!('error' in response)) {
        onFinish()
    } else if (response.error?.status === 401) {
        message.error(PleaseReloadPageMsg)
        onError()
    } else {
        formComponent.setFields([
            {
                name: 'smsCode',
                errors: [WrongSmsCodeMsg],
            },
        ])
    }
}

export async function registrationHandler(
    phone: string,
    password: string,
    userRegistrationMutation: any,
    onFinish: () => void,
    onError: () => void,
    formComponent: FormInstance
) {
    let token = localStorage.getItem('token')
    const cookies = new Cookies()
    cookies.remove('jwtToken')

    const { email } = formComponent.getFieldsValue(['email']);
    const { name } = formComponent.getFieldsValue(['name']);

    let response = await withLoadingMessage(LoadingMsg, userRegistrationMutation, {
        token: token,
        name: name,
        email: email,
        password: password,
    })
    if (!('error' in response)) {
        cookies.set('jwtToken', response.data.token, { path: '/' })
        message.success(SuccessRegistrationMsg)
        onFinish()
    } else if (response.error?.status === 401) {
        message.error(PleaseReloadPageMsg)
        onError()
    } else if (response.error?.data.error.code === 'AlreadyExists') {
        formComponent.setFields([
            {
                name: 'phone',
                errors: [UserAlreadyExitsMsg],
            },
        ])
    }
}

export async function resendOtpHandler(recaptchaToken: string, resendOtpMutation: any, onError: () => void) {
    let token = localStorage.getItem('token')
    let response = await resendOtpMutation({
        recaptcha: recaptchaToken,
        token_key: token,
    })
    if (!('error' in response)) {
        message.success(SendNewSmsCodeMsg)
    } else {
        message.error(PleaseReloadPageMsg)
        onError()
    }
}
