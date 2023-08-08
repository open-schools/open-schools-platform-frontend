import { commonApi } from '@store/commonApi'
import {
    CreationTokenData,
    ResendData,
    PasswordReset,
    CreateRegistrationToken,
    TokenResponse,
    CreateUserData,
    VerifyData,
    GetRegistrationToken,
    CreateUserResponse,
} from './interfaces'

const userApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        users: build.mutation<CreateUserResponse, CreateUserData>({
            query: (data) => ({
                url: '/user-management/users',
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: build.mutation<{}, PasswordReset>({
            query: (data) => ({
                url: '/user-management/users/reset-password',
                method: 'POST',
                body: data,
            }),
        }),
        token: build.mutation<TokenResponse, CreateRegistrationToken>({
            query: (data) => ({
                url: '/user-management/users/token',
                method: 'POST',
                body: data,
            }),
        }),
        creationToken: build.query<{ token: GetRegistrationToken }, CreationTokenData>({
            query: (data) => ({
                url: `/user-management/users/token/${data.token_key}`,
                method: 'GET',
            }),
        }),
        resend: build.mutation<{}, ResendData>({
            query: (data) => ({
                url: `/user-management/users/token/${data.token_key}/resend`,
                method: 'POST',
                body: { recaptcha: data.recaptcha },
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

export const { useTokenMutation, useVerifyMutation, useUsersMutation, useResetPasswordMutation, useResendMutation } =
    userApi
