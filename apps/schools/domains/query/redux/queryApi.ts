import { commonApi } from '@store/commonApi'
import { GetQueryStatus } from '@domains/common/redux/serializers'

const queryApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        ChangeStatus: build.mutation<{ query: GetQueryStatus }, GetQueryStatus>({
            query: (data) => ({
                url: `/query-management/queries`,
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
})

export const { useChangeStatusMutation } = queryApi
