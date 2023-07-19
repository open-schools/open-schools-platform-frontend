import { commonApi } from '../../../store/commonApi'
import { CreationData, VerifyResponse, TokenResponse, UserData, VerifyData, ResetPasswordData } from './interfaces'

const usersApi = commonApi.injectEndpoints({
    endpoints: build => ({
        token: build.mutation<TokenResponse, CreationData>({
            query: (data) => ({
                url: '/user-management/users/token',
                method: 'POST',
                body: data,
            }),
        }),
        verify: build.mutation<VerifyResponse, VerifyData>({
            query: (data) => ({
                url: `/user-management/users/token/${data.token}/verify`,
                method: 'PATCH',
                body: { otp: data.otp },
            }),
        }),
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
    }),
})

export const { useTokenMutation, useVerifyMutation, useUsersMutation, useResetPasswordMutation } = usersApi
