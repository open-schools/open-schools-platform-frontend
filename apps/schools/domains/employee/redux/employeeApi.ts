import { commonApi, providesList } from '@store/commonApi'
import { ReturnedData } from '@domains/common/redux/interfaces'
import {
    DeleteEmployeeByIdData,
    GetAllEmployeesData,
    GetEmployee,
    GetEmployeeByIdData,
    GetEmployeeProfile,
    GetListEmployee,
    UpdateEmployeeByIdData,
    UpdateEmployeeProfile,
} from './interfaces'
import { GetOrganizationInviteEmployee } from '@domains/common/redux/serializers'

const employeeApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        getAllEmployees: build.query<ReturnedData<GetListEmployee[]>, GetAllEmployeesData>({
            query: (params) => ({
                url: '/organization-management/employees',
                method: 'GET',
                params: params,
            }),
            providesTags: (result) => providesList(result?.results, 'Employee'),
        }),
        getInvitations: build.query<{ results: GetOrganizationInviteEmployee[] }, {}>({
            query: () => ({
                url: '/organization-management/employees/employee-profile/get-invitations',
            }),
        }),
        updateEmployeeById: build.mutation<{ employee: GetEmployee }, UpdateEmployeeByIdData>({
            query: (data) => ({
                url: `/organization-management/employees/${data.employee_id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Employee', id: arg.employee_id },
                { type: 'Employee', id: 'LIST' },
            ],
        }),
        updateEmployeeProfileById: build.mutation<{ employee_profile: GetEmployeeProfile }, UpdateEmployeeProfile>({
            query: (data) => ({
                url: `/organization-management/employees/employee-profile/${data.employee_profile_id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Employee', 'User'],
        }),
        deleteEmployeeById: build.mutation<{}, DeleteEmployeeByIdData>({
            query: (data) => ({
                url: `/organization-management/employees/${data.employee_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Employee', id: 'LIST' }],
        }),
        getEmployee: build.query<{ employee: GetEmployee }, GetEmployeeByIdData>({
            query: (data) => ({
                url: `/organization-management/employees/${data.employee_id}`,
                method: 'GET',
            }),
            providesTags: (result, error, arg) => [{ type: 'Employee', id: arg.employee_id }],
        }),
    }),
})

export const {
    useDeleteEmployeeByIdMutation,
    useGetAllEmployeesQuery,
    useLazyGetAllEmployeesQuery,
    useUpdateEmployeeProfileByIdMutation,
    useGetInvitationsQuery,
    useGetEmployeeQuery,
    useUpdateEmployeeByIdMutation,
} = employeeApi
