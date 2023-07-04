import { commonApi } from '../../../store/commonApi'
import { CreationToken, VerifyResponse, TokenResponse, UserRegister } from '../interfaces/tokenInterfaces'

const registrationApi = commonApi.injectEndpoints({
    endpoints: build => ({
        token: build.mutation<TokenResponse, CreationToken>({
            query: (data) => ({
                url: '/user-management/users/token',
                method: 'POST',
                body: data,
            }),
        }),
        verify: build.mutation<VerifyResponse, { otp: string, token: string }>({
            query: (data) => ({
                url: `/user-management/users/token/${data.token}/verify`,
                method: 'PATCH',
                body: { otp: data.otp },
            }),
        }),
        users: build.mutation<{}, UserRegister>({
            query: (data) => ({
                url: '/user-management/users',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const { useTokenMutation, useVerifyMutation, useUsersMutation } = registrationApi
