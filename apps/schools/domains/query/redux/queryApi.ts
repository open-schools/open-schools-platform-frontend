import { commonApi } from '@store/commonApi'
import { ReturnedData } from '@domains/common/redux/interfaces'
import { GetQueryStatus } from '@domains/common/redux/serializers'
import { QueryStatusChanges } from '@domains/query/redux/serializers'

const queryApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        ChangeStatus: build.mutation<{ query: GetQueryStatus }, GetQueryStatus>({
            query: (data) => ({
                url: `/query-management/queries`,
                method: 'PATCH',
                body: data,
            }),
        }),
        GetQueryHistory: build.query<ReturnedData<QueryStatusChanges[]>, { query_id: string }>({
            query: (params) => ({
                url: `/query-management/queries/${params.query_id}/changes`,
                method: 'GET',
                params: params,
            }),
        }),
    }),
})

export const { useChangeStatusMutation, useGetQueryHistoryQuery } = queryApi
