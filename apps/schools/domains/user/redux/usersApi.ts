import { commonApi } from '../../../store/commonApi'
import { CreationData, VerifyResponse, TokenResponse, UserRegister, verifyData } from './interfaces'

const usersApi = commonApi.injectEndpoints({
    endpoints: build => ({
        token: build.mutation<TokenResponse, CreationData>({
            query: (data) => ({
                url: '/user-management/users/token',
                method: 'POST',
                body: data,
            }),
        }),
        verify: build.mutation<VerifyResponse, verifyData>({
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

export const { useTokenMutation, useVerifyMutation, useUsersMutation } = usersApi
