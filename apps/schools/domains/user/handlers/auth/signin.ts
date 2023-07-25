import { FormInstance, message } from 'antd'
import { LoadingMsg, SuccessSignInMsg, WrongLoginOrPasswordMsg } from '../../components/auth/constants/message'

export async function loginHandler (phone: string, password: string, login: any, formComponent: FormInstance) {
    const hide = message.loading(LoadingMsg,0)
    let response = await login({ phone: phone, password: password })
    hide()
    if ('data' in response) {
        localStorage.setItem('jwtToken', response.data.token)
        message.success(SuccessSignInMsg)
        // router.push()
    } else if (response.error?.data.error.message.indexOf('non_field_errors') >= 0) {
        formComponent.setFields([
            {
                name: 'phone',
                errors: [WrongLoginOrPasswordMsg],
            },
            {
                name: 'password',
                errors: [WrongLoginOrPasswordMsg],
            },
        ])
    }
}
