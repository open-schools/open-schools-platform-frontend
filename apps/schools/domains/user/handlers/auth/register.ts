import { message } from 'antd'
import Router from 'next/router'

export async function tokenHandler (phone: string, token: string, nextUrl: string, registration: any, onFinish: () => void){
    let response = await registration({ phone: phone, recaptcha: token })
    if ('data' in response) {
        localStorage.setItem('token', response.data.token)
        Router.push(`/auth/${nextUrl}?token=${37128937218937}`)
        onFinish()
    } else {
        message.error('Error token')
    }
}

export async function otpHandler (code: string, verifyCode: any) {
    let token = localStorage.getItem('token')
    if (token) {
        await verifyCode({ otp: code, token: token })
    } else {
        message.error('Error token')
    }
}

export async function registrationHandler (phone: string, password: string, userRegistration: any) {
    let token = localStorage.getItem('token')
    if (token) {
        await userRegistration({ token: token, name: phone, password: password })
    } else {
        message.error('Error token')
    }
}
