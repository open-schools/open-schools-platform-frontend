import { commonApi, providesList } from '@store/commonApi'
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
            providesTags: (result) => providesList(result?.results, 'Circle'),
        }),
        createCircle: build.mutation<{ circle: GetCircle }, CreateCircleData>({
            query: (data) => ({
                url: '/organization-management/circles',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Circle', id: 'LIST' }],
        }),
        changeCircle: build.mutation<{ circle: GetCircle }, ChangeCircleData>({
            query: (data) => ({
                url: `/organization-management/circles/${data.circle_id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Circle', id: arg.circle_id }],
        }),
        getCircle: build.query<{ circle: GetCircle }, CircleData>({
            query: (params) => ({
                url: `/organization-management/circles/${params.circle_id}`,
                method: 'GET',
            }),
            providesTags: (result, error, arg) => [{ type: 'Circle', id: arg.circle_id }],
        }),
        getCircleStudents: build.query<ReturnedData<GetStudent[]>, CircleStudentsData>({
            query: (params) => ({
                url: `/organization-management/circles/${params.circle_id}/students`,
                method: 'GET',
                params: params,
            }),
            providesTags: (result, error, arg) => [{ type: 'Circle', id: arg.circle_id }],
        }),
        deleteCircle: build.mutation<{ circle: GetCircle }, CircleData>({
            query: (params) => ({
                url: `/organization-management/circles/${params.circle_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Circle', id: 'LIST' }],
        }),
        inviteStudent: build.mutation<{ query: GetQueryStatus }, CreateCircleInviteStudentData>({
            query: (body) => ({
                url: `/organization-management/circles/${body.circle_id}/invite-student`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Circle', id: arg.circle_id },
                { type: 'Student', id: 'LIST' },
            ],
        }),
    }),
})

export const {
    useGetCircleStudentsQuery,
    useCreateCircleMutation,
    useGetCircleQuery,
    useDeleteCircleMutation,
    useInviteStudentMutation,
    useChangeCircleMutation,
} = circleApi
