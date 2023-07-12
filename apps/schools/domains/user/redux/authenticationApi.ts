import { commonApi } from '../../../store/commonApi'
import { jwtTokenResponse, LoginData } from './interfaces'

const authentication = commonApi.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<jwtTokenResponse, LoginData>({
            query: (data) => ({
                url: '/user-management/auth/jwt/login',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const { useLoginMutation } = authentication
