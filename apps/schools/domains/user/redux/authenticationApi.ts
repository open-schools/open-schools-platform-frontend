import { commonApi } from '@store/commonApi'
import { GetUser, GetUserProfiles, LoginData, LoginResponse, UpdatePasswordData, UpdateUserData } from './interfaces'

const authenticationApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, LoginData>({
            query: (data) => ({
                url: '/user-management/auth/jwt/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        logout: build.mutation<{}, {}>({
            query: (data) => ({
                url: '/user-management/auth/jwt/logout',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        getUser: build.query<{ user: GetUserProfiles }, {}>({
            query: (data) => ({
                url: '/user-management/auth/me',
                method: 'GET',
                data: data,
            }),
            providesTags: ['User'],
        }),
        updateUser: build.mutation<{ user: GetUser }, UpdateUserData>({
            query: (data) => ({
                url: '/user-management/auth/me',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        updatePassword: build.mutation<{}, UpdatePasswordData>({
            query: (data) => ({
                url: '/user-management/auth/me/update-password',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useGetUserQuery,
    useLazyGetUserQuery,
    useUpdateUserMutation,
    useUpdatePasswordMutation,
} = authenticationApi
