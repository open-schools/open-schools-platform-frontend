import { FormInstance, message } from 'antd'
import Router from 'next/router'
import { normalizePhone } from '../../../common/utils/phone'
import {
    LoadingMsg,
    SendNewSmsCodeMsg,
    PleaseReloadPageMsg,
    UserAlreadyExitsMsg,
    WrongPhoneFormatMsg,
    WrongSmsCodeMsg,
    SuccessRegistrationMsg,
} from '../../components/auth/constants/message'
import { withLoadingMessage } from '../../../common/utils/loading'

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
        Router.push(`/auth/${nextUrl}?token=${37128937218937}`)
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
    onFinish: (userID: string) => void,
    onError: () => void,
    formComponent: FormInstance,
) {
    let token = localStorage.getItem('token')
    let response = await withLoadingMessage(LoadingMsg, userRegistrationMutation, {
        token: token,
        name: phone,
        password: password,
    })
    if (!('error' in response)) {
        message.success(SuccessRegistrationMsg)
        onFinish('someUserID')
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
