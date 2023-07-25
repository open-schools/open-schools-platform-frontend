import { message } from 'antd'

export async function loginHandler (phone: string, password: string, login: any) {
    const hide = message.loading('Загрузка...',0)
    let response = await login({ phone: phone, password: password })
    hide()
    if ('data' in response) {
        localStorage.setItem('jwtToken', response.data.token)
        message.success('Вы успешно вошли в аккаунт')
    } else if (response.error?.data.error.message.indexOf('non_field_errors') >= 0) {
        message.error('Неправильный логин или пароль')
    }
}
