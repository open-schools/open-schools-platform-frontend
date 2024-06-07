import { commonApi } from '@store/commonApi'
import { DeleteStudentData, UpdateStudentData } from './interfaces'
import { GetStudent } from '@domains/common/redux/serializers'

const organizationApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        deleteStudent: build.mutation<{}, DeleteStudentData>({
            query: (data) => ({
                url: `/students-management/students/${data.student_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Student', id: 'LIST' }],
        }),
        updateStudentById: build.mutation<{ student: GetStudent }, UpdateStudentData>({
            query: (data) => ({
                url: `/students-management/students/${data.student_id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Student', id: arg.student_id }],
        }),
    }),
})

export const { useDeleteStudentMutation, useUpdateStudentByIdMutation } = organizationApi
