import { commonApi, providesList } from '@store/commonApi'
import { ReturnedData } from '@domains/common/redux/interfaces'
import {
    DeleteTeacherByIdData,
    GetAllTeachersData,
    GetTeacher,
    GetTeacherByIdData,
    GetTeacherProfile,
    GetListTeacher,
    UpdateTeacherByIdData,
    UpdateTeacherProfile,
} from './interfaces'
import { GetOrganizationInviteTeacher } from '@domains/common/redux/serializers'

const teacherApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getAllTeachers: build.query<ReturnedData<GetListTeacher[]>, GetAllTeachersData>({
            query: (params) => ({
                url: '/organization-management/teachers',
                method: 'GET',
                params: params,
            }),
            providesTags: (result) => providesList(result?.results, 'Teacher'),
        }),
        getInvitations: build.query<{ results: GetOrganizationInviteTeacher[] }, {}>({
            query: () => ({
                url: '/organization-management/teachers/teacher-profile/get-invitations',
            }),
        }),
        updateTeacherById: build.mutation<{ teacher: GetTeacher }, UpdateTeacherByIdData>({
            query: (data) => ({
                url: `/organization-management/teachers/${data.teacher_id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Teacher', id: arg.teacher_id },
                { type: 'Teacher', id: 'LIST' },
            ],
        }),
        updateTeacherProfileById: build.mutation<{ teacher_profile: GetTeacherProfile }, UpdateTeacherProfile>({
            query: (data) => ({
                url: `/organization-management/teachers/teacher-profile/${data.teacher_profile_id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Teacher', 'User'],
        }),
        deleteTeacherById: build.mutation<{}, DeleteTeacherByIdData>({
            query: (data) => ({
                url: `/organization-management/teachers/${data.teacher_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Teacher', id: 'LIST' }],
        }),
        getTeacher: build.query<{ teacher: GetTeacher }, GetTeacherByIdData>({
            query: (data) => ({
                url: `/organization-management/teacherss/${data.teachers_id}`,
                method: 'GET',
            }),
            providesTags: (result, error, arg) => [{ type: 'Teacher', id: arg.teachers_id }],
        }),
    }),
})

export const {
    useDeleteTeacherByIdMutation,
    useGetAllTeachersQuery,
    useLazyGetAllTeachersQuery,
    useUpdateTeacherProfileByIdMutation,
    useGetInvitationsQuery,
    useGetTeacherQuery,
    useUpdateTeacherByIdMutation,
} = teachersApi
