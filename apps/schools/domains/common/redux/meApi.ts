import { commonApi } from '../../../store/commonApi'
import { UserProfile } from '../../user/redux/entities'

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
