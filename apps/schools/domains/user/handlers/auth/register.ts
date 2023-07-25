import { FormInstance, message } from 'antd'
import Router from 'next/router'
import { normalizePhone } from '../../../common/utils/phone'

export async function tokenHandler (recaptchaToken: string, formComponent: FormInstance, nextUrl: string, registrationMutation: any, onFinish: () => void) {
    if (recaptchaToken === '') return

    let { phone: inputPhone } = formComponent.getFieldsValue(['phone'])
    inputPhone = '+' + inputPhone
    const phone = normalizePhone(inputPhone)

    if (!phone) {
        formComponent.setFields([
            {
                name: 'phone',
                errors: ['Неверный формат телефона'],
            },
        ])
        return
    }

    const hide = message.loading('Загрузка...',0)

    let response = await registrationMutation({ phone: phone, recaptcha: recaptchaToken })

    hide()
    if ('data' in response) {
        localStorage.setItem('token', response.data.token)
        Router.push(`/auth/${nextUrl}?token=${37128937218937}`)
        onFinish()
    } else {
        message.error('Произошла ошибка, пожалуйста, обновите страницу')
        console.log(response)
    }
}

export async function otpHandler (smsCode: string, verifyCodeMutation: any, onFinish: () => void, formComponent: FormInstance) {
    const hide = message.loading('Загрузка...', 0)
    let token = localStorage.getItem('token')
    let response = await verifyCodeMutation({ otp: smsCode, token_key: token })
    hide()
    if (!('error' in response)) {
        onFinish()
    } else if (response.error?.status === 401) {
        message.error('Произошла ошибка, пожалуйста, обновите страницу')
    } else {
        formComponent.setFields([
            {
                name: 'smsCode',
                errors: ['Неверный смс-код'],
            },
        ])
    }
}

export async function registrationHandler (phone: string, password: string, userRegistrationMutation: any, onFinish: (userID: string) => void, onError: () => void, formComponent: FormInstance) {
    const hide = message.loading('Загрузка...',0)
    let token = localStorage.getItem('token')
    let response = await userRegistrationMutation({ token: token, name: phone, password: password })
    hide()
    if (!('error' in response)) {
        onFinish('someUserID')
    } else if (response.error?.status === 401 || response.error?.status === 404) {
        message.error('Произошла ошибка, пожалуйста, обновите страницу')
        onError()
    } else if (response.error?.data.error.code === 'AlreadyExists') {
        formComponent.setFields([
            {
                name: 'phone',
                errors: ['Пользователь уже зарегистрирован'],
            },
        ])
    }
}

export async function resendOtpHandler (recaptchaToken: string, resendOtpMutation: any, onError: () => void) {
    let token = localStorage.getItem('token')
    let response = await resendOtpMutation({ recaptcha: recaptchaToken, token_key: token })
    if (response.error?.status === 401) {
        message.error('Произошла ошибка, пожалуйста, обновите страницу')
        onError()
    } else if ('error' in response) {
        message.error('Error resendOtpHandler')
    }
}
