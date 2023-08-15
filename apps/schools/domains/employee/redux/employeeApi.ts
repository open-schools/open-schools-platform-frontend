import { commonApi } from '@store/commonApi'
import { ReturnedData } from '@domains/common/redux/interfaces'
import {
    DeleteEmployeeByIdData,
    GetAllEmployeesData,
    GetEmployee,
    GetListEmployee,
    UpdateEmployeeByIdData,
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
    useGetInvitationsQuery,
    useUpdateEmployeeByIdMutation,
} = employeeApi
