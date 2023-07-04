import { commonApi } from '../../../store/commonApi'
import { AllCirclesParams, Circle, ReturnedData } from '../interfaces/apiInterfaces'

const circlesApi = commonApi.injectEndpoints({
    endpoints: build => ({
        circles: build.query<ReturnedData<Circle[]>, AllCirclesParams>({
            query: (params) => ({
                url: '/organization-management/circles',
                method: 'GET',
                params: params,
            }),
        }),
    }),
})

export const { useCirclesQuery } = circlesApi
