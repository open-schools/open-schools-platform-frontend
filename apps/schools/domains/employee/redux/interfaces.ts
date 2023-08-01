import { GetOrganizationSender } from '../../organization/redux/interfaces'
import { BasePaginationData } from '../../common/redux/interfaces'

export interface GetEmployee {
    id?: string
    name?: string
    organization?: GetOrganizationSender
    position?: string
}

export interface GetListEmployee {
    id?: string,
    name?: string,
    'employee_profile': GetEmployeeProfileWithUser,
    organization?: string,
    position?: string,
}

export interface GetEmployeeProfileWithUser {
    id?: string,
    name?: string,
    user: GetEmployeeProfileUser,
}

export interface GetEmployeeProfileUser {
    id?: string,
    phone?: string,
    name?: string,
}

export interface GetAllEmployeesData extends BasePaginationData {
    organization: string,
    'employee_profile'?: string,
    id?: string,
    'or_search'?: string,
    name?: string,
    position?: string,
    phone?: string,
    'organization_name'?: string,
}

export interface UpdateEmployeeByIdData {
    name: string,
    'employee_id': string,
}

export interface DeleteEmployeeByIdData {
    'employee_id': string,
}
