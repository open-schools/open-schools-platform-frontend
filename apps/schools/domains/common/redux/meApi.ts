import { commonApi } from '../../../store/commonApi'
import { UserProfile } from '../interfaces/differentRolesProfiles'

const meApi = commonApi.injectEndpoints({
    endpoints: build => ({
        me: build.query<{ user: UserProfile }, {}>({
            query: (data) => ({
                url: '/user-management/auth/me',
                method: 'GET',
                data: data,
            }),
        }),
    }),
})

export const { useMeQuery } = meApi
