import { message } from 'antd'

export async function loginHandler (phone: string, password: string, login: any) {
    let response = await login({ phone: phone, password: password })
    if ('data' in response) {
        localStorage.setItem('jwtToken', response.data.token)
    } else {
        message.error('Неправильный логин или пароль')
    }
}
