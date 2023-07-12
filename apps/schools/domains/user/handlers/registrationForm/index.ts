import { message } from 'antd'
import { CreationData, TokenResponse, UserRegister, verifyData, VerifyResponse } from '../../redux/interfaces'
import { CustomMutation } from '../../../common/interfaces/mutations'

export async function tokenHandler (phone: string, recaptcha: string, registration: CustomMutation<TokenResponse, CreationData>['Mutation']) {
    let response = await registration({ phone: phone, recaptcha: recaptcha })
    if ('data' in response) {
        localStorage.setItem('token', response.data.token)
    } else {
        message.error('Упс, что-то пошло не так')
    }
}

export async function otpHandler (code: string, verifyCode: CustomMutation<VerifyResponse, verifyData>['Mutation']) {
    let token = localStorage.getItem('token')
    if (token) {
        await verifyCode({ otp: code, token: token })
    } else {
        message.error('Упс, что-то пошло не так')
    }
}

export async function registrationHandler (phone: string, password: string, userRegistration: CustomMutation<{}, UserRegister>['Mutation']) {
    let token = localStorage.getItem('token')
    if (token) {
        await userRegistration({ token: token, name: phone, password: password })
    } else {
        message.error('Упс, что-то пошло не так')
    }
}
