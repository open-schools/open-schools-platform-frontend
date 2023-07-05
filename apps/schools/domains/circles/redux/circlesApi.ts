import { commonApi } from '../../../store/commonApi'
import { AllCirclesParams, Circle, ReturnedData } from '../interfaces/apiInterfaces'

const circlesApi = commonApi.injectEndpoints({
    endpoints: build => ({
        circles: build.query<ReturnedData<Circle[]>, AllCirclesParams>({
            query: (data) => ({
                url: '/organization-management/circles',
                method: 'GET',
                data: data,
            }),
        }),
    }),
})

export const { useCirclesQuery } = circlesApi
