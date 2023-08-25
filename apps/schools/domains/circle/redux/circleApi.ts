import { commonApi } from '@store/commonApi'
import { ReturnedData } from '../../common/redux/interfaces'
import { AllCirclesData, CircleData, CreateCircleData, CreateCircleInviteStudentData } from './interfaces'
import { GetCircle, GetQueryStatus } from '@domains/common/redux/serializers'

const circleApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCircles: build.query<ReturnedData<GetCircle[]>, AllCirclesData>({
            query: (params) => ({
                url: '/organization-management/circles',
                method: 'GET',
                params: params,
            }),
        }),
        createCircle: build.mutation<{ circle: GetCircle }, CreateCircleData>({
            query: (data) => ({
                url: '/organization-management/circles',
                method: 'POST',
                body: data,
            }),
        }),
        getCircle: build.query<{ circle: GetCircle }, CircleData>({
            query: (params) => ({
                url: `/organization-management/circles/${params.circle_id}`,
                method: 'GET',
            }),
        }),
        deleteCircle: build.query<{ circle: GetCircle }, CircleData>({
            query: (params) => ({
                url: `/organization-management/circles/${params.circle_id}`,
                method: 'DELETE',
            }),
        }),
        inviteStudent: build.mutation<{ query: GetQueryStatus }, CreateCircleInviteStudentData>({
            query: (body) => ({
                url: `/organization-management/circles/${body.circle_id}/invite-student`,
                method: 'POST',
                body: body,
            }),
        }),
    }),
})

export const {
    useGetAllCirclesQuery,
    useCreateCircleMutation,
    useGetCircleQuery,
    useDeleteCircleQuery,
    useInviteStudentMutation,
} = circleApi
