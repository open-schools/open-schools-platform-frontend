import { commonApi } from '../../../store/commonApi'
import {
    CreationTokenData,
    CreationTokenResponse, ResendData,
    ResetPasswordData,
    TokenData,
    TokenResponse,
    UserData,
    VerifyData,
} from './interfaces'

const userApi = commonApi.injectEndpoints({
    endpoints: build => ({
        users: build.mutation<{}, UserData>({
            query: (data) => ({
                url: '/user-management/users',
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: build.mutation<{}, ResetPasswordData>({
            query: (data) => ({
                url: '/user-management/users/reset-password',
                method: 'POST',
                body: data,
            }),
        }),
        token: build.mutation<TokenResponse, TokenData>({
            query: (data) => ({
                url: '/user-management/users/token',
                method: 'POST',
                body: data,
            }),
        }),
        creationToken: build.query<CreationTokenResponse, CreationTokenData>({
            query: (data) => ({
                url: `/user-management/users/token/${data.token_key}`,
                method: 'GET',
            }),
        }),
        resend: build.mutation<{}, ResendData>({
            query: (data) => ({
                url: `/user-management/users/token/${data.token_key}/resend`,
                method: 'POST',
                body: { resend: data.recaptcha },
            }),
        }),
        verify: build.mutation<{}, VerifyData>({
            query: (data) => ({
                url: `/user-management/users/token/${data.token_key}/verify`,
                method: 'PATCH',
                body: { otp: data.otp },
            }),
        }),
    }),
})

export const {
    useTokenMutation,
    useVerifyMutation,
    useUsersMutation,
    useResetPasswordMutation,
    useResendMutation,
} = userApi
