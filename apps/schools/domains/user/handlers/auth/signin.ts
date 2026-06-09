import { FormInstance, message } from 'antd'
import { LoadingMsg, SuccessSignInMsg, WrongLoginOrPasswordMsg } from '@domains/user/components/auth/constants/message'
import { withLoadingMessage } from '@domains/common/utils/loading'
import Cookies from 'universal-cookie'
import { oneYearExpiresDate } from '@domains/common/constants/Cookies'
import { normalizePhone } from '@domains/common/utils/phone'

export async function loginHandler(phone: string, password: string, login: any, formComponent: FormInstance) {
    const cookies = new Cookies()
    cookies.remove('jwtToken')
    
    const normalizedPhone = normalizePhone(phone)
    
    let response = await withLoadingMessage(LoadingMsg, login, {
        phone: normalizedPhone,
        password: password,
    })
    if ('data' in response) {
        cookies.set('jwtToken', response.data.token, { path: '/', expires: oneYearExpiresDate })
        message.success(SuccessSignInMsg)
        window.location.href = '/'
    } else if (response.error) {
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
