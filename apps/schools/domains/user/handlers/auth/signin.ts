import { FormInstance, message } from 'antd'
import { LoadingMsg, SuccessSignInMsg, WrongLoginOrPasswordMsg } from '@domains/user/components/auth/constants/message'
import { withLoadingMessage } from '@domains/common/utils/loading'
import Cookies from 'universal-cookie'

export async function loginHandler(phone: string, password: string, login: any, formComponent: FormInstance) {
    const cookies = new Cookies()
    cookies.remove('jwtToken')
    let response = await withLoadingMessage(LoadingMsg, login, {
        phone: phone,
        password: password,
    })
    if ('data' in response) {
        cookies.set('jwtToken', response.data.token, { path: '/' })
        message.success(SuccessSignInMsg)
        window.location.href = '/'
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
