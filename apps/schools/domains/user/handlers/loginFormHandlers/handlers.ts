import { CustomMutation } from '../../../common/interfaces/mutations'
import { jwtTokenResponse, LoginData } from '../../interfaces/tokenInterfaces'
import { message } from 'antd'

export async function loginHandler (phone: string, password: string, login: CustomMutation<jwtTokenResponse, LoginData>['Mutation']) {
    let response = await login({ phone: phone, password: password })
    if ('data' in response) {
        localStorage.setItem('jwtToken', response.data.token)
    } else {
        message.error('Error jwtToken')
    }
}
