import { commonApi } from '../../../store/commonApi'
import {
    TokenData,
    VerifyResponse,
    TokenResponse,
    UserData,
    VerifyData,
    ResetPasswordData,
    CreationTokenResponse,
    ResendResponse,
    ResendData,
} from './interfaces'
import { Id } from '../../common/redux/interfaces'

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
        creationToken: build.query<CreationTokenResponse, Id>({
            query: (data) => ({
                url: `/user-management/users/token/${data.id}`,
                method: 'GET',
            }),
        }),
        resend: build.mutation<ResendResponse, ResendData>({
            query: (data) => ({
                url: `/user-management/users/token/${data.id}/resend`,
                method: 'POST',
                body: data.resend,
            }),
        }),
        verify: build.mutation<VerifyResponse, VerifyData>({
            query: (data) => ({
                url: `/user-management/users/token/${data.token}/verify`,
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
