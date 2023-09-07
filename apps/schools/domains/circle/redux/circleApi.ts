import { commonApi } from '@store/commonApi'
import { ReturnedData } from '../../common/redux/interfaces'
import {
    AllCirclesData,
    CircleData,
    CircleStudentsData,
    CreateCircleData,
    CreateCircleInviteStudentData,
    ChangeCircleData,
} from './interfaces'
import { GetCircle, GetQueryStatus, GetStudent } from '@domains/common/redux/serializers'

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
        changeCircle: build.mutation<{ circle: GetCircle }, ChangeCircleData>({
            query: (data) => ({
                url: `/organization-management/circles/${data.circle_id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
        getCircle: build.query<{ circle: GetCircle }, CircleData>({
            query: (params) => ({
                url: `/organization-management/circles/${params.circle_id}`,
                method: 'GET',
            }),
        }),
        getCircleStudents: build.query<ReturnedData<GetStudent[]>, CircleStudentsData>({
            query: (params) => ({
                url: `/organization-management/circles/${params.circle_id}/students`,
                method: 'GET',
                params: params,
            }),
        }),
        deleteCircle: build.mutation<{ circle: GetCircle }, CircleData>({
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
    useGetCircleStudentsQuery,
    useCreateCircleMutation,
    useGetCircleQuery,
    useDeleteCircleMutation,
    useInviteStudentMutation,
    useChangeCircleMutation,
} = circleApi
