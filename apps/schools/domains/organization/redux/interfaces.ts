import { BasePaginationData } from '../../common/redux/interfaces'



export interface AllOrganizationsData extends BasePaginationData {
    id?: string
    name?: string
    inn?: string
    ids?: string
    or_search?: string
}

export interface CreateOrganizationData {
    name: string
    inn?: string
}

export interface StudentJoinCircleData extends BasePaginationData {
    query_id?: string
    query_status?: string
    student_name?: string
    student__student_profile__phone?: string
    organization?: string
    circle?: string
}

export interface AllStudentsData extends BasePaginationData {
    id?: string
    name?: string
    circle: string
    student_profile?: string
    student_profile_phone?: string
    circle_name?: string
    circle_organization?: string
    or_search?: string
}

export interface StudentData {
    student_id: string
}

export interface TeacherData {
    teacher_id: string
}

export interface DeleteOrganizationData {
    organization_id: string
}

export interface AnalyticsData {
    date_from?: string
    date_to?: string
    organization_id: string
}

export interface AllQueriesData {
    organization_id: string
}

export interface ExportStudentsData {
    organization_id: string
}

export interface AllTeachersData extends BasePaginationData {
    circle?: string
    teacher_profile?: string
    id?: string
    name?: string
    or_search?: string
    phone?: string
    circle_name?: string
    circle_ids?: string
    organization_id: string
}

export interface AllQueriesOfOrganizationData extends BasePaginationData {
    organization: string
    student_profile: string
}
