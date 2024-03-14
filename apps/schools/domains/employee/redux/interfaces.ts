import { BasePaginationData } from '../../common/redux/interfaces'
import { GetOrganizationSender } from '@domains/common/redux/serializers'

export interface GetEmployee {
    id?: string
    name?: string
    email?: string
    organization?: GetOrganizationSender
    position?: string
    phone?: string
}

export interface GetListEmployee {
    id: string
    name?: string
    phone?: string
    organization?: string
    organization__name?: string
    employee_profile?: string
    position?: string
}

export interface GetEmployeeProfileWithUser {
    id?: string
    name?: string
    user: GetEmployeeProfileUser
}

export interface GetEmployeeProfileUser {
    id?: string
    phone?: string
    name?: string
}

export interface GetAllEmployeesData extends BasePaginationData {
    organization?: string
    employee_profile?: string
    id?: string
    or_search?: string
    name?: string
    position?: string
    phone?: string
    organization_name?: string
}

export interface UpdateEmployeeByIdData {
    name: string
    position: string
    employee_id: string
}

export interface DeleteEmployeeByIdData {
    employee_id: string
}

export interface GetEmployeeByIdData {
    employee_id: string
}

export interface UpdateEmployeeProfile {
    employee_profile_id: string
    name: string
    email: string
}

export interface GetEmployeeProfile {
    id: string
    name: string
    email: string
    user: string
}
