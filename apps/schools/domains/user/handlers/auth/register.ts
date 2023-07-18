import { message } from 'antd'
import Router from 'next/router'
import { normalizePhone } from '../../../common/utils/phone'

export async function tokenHandler (token: string, form: any, nextUrl: string, registration: any, onFinish: () => void) {
    if (token === '') return

    let { phone: inputPhone } = form.getFieldsValue(['phone'])
    inputPhone = '+' + inputPhone
    const phone = normalizePhone(inputPhone)

    if (!phone) {
        form.setFields([
            {
                name: 'phone',
                errors: ['Неверный формат телефона'],
            },
        ])
        return
    }
    let response = await registration({ phone: phone, recaptcha: token })
    if ('data' in response) {
        localStorage.setItem('token', response.data.token)
        Router.push(`/auth/${nextUrl}?token=${37128937218937}`)
        onFinish()
    } else {
        message.error('Error token')
    }
}

export async function otpHandler (code: string, verifyCode: any, onFinish: () => void) {
    let token = localStorage.getItem('token')
    let response = await verifyCode({ otp: code, token: token })
    if (!('error' in response)) {
        onFinish()
    } else {
        message.error('Error smsCode')
    }
}

export async function registrationHandler (phone: string, password: string, userRegistration: any, onFinish: (userID: string) => void) {
    let token = localStorage.getItem('token')
    let response = await userRegistration({ token: token, name: phone, password: password })
    if (!('error' in response)) {
        onFinish('someUserID')
    } else {
        message.error('Error registration')
    }
}

export async function resendOtpHandler (recaptcha: string, resendOtp: any, onReset: () => void) {
    let id = localStorage.getItem('token')
    let response = await resendOtp({ resend: { recaptcha: recaptcha }, id: id })
    if (response.error?.status === 400 || response.error?.status === 401) {
        onReset()
    }
}
