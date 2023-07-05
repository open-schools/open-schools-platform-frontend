import { commonApi } from '../../../store/commonApi'
import { UserProfiles } from '../interfaces/userProfile'

const meApi = commonApi.injectEndpoints({
    endpoints: build => ({
        me: build.query<UserProfiles, {}>({
            query: (data) => ({
                url: '/user-management/auth/me',
                method: 'GET',
                data: data,
            }),
        }),
    }),
})

export const { useMeQuery } = meApi
