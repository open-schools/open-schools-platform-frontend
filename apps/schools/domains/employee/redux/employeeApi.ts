import { commonApi } from '@store/commonApi'
import { ReturnedData } from '@domains/common/redux/interfaces'
import {
    DeleteEmployeeByIdData,
    GetAllEmployeesData,
    GetEmployee,
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
        }),
        updateEmployeeProfileById: build.mutation<{ employee_profile: GetEmployeeProfile }, UpdateEmployeeProfile>({
            query: (data) => ({
                url: `/organization-management/employees/employee-profile/${data.employee_profile_id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
        deleteEmployeeById: build.mutation<{}, DeleteEmployeeByIdData>({
            query: (data) => ({
                url: `/organization-management/employees/${data.employee_id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useDeleteEmployeeByIdMutation,
    useGetAllEmployeesQuery,
    useLazyGetAllEmployeesQuery,
    useUpdateEmployeeProfileByIdMutation,
    useGetInvitationsQuery,
    useUpdateEmployeeByIdMutation,
} = employeeApi
