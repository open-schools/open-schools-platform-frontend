import { BasePaginationData } from '../../common/redux/interfaces'
import { GetAnalytics } from '@domains/common/redux/serializers'

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
    circle?: string
    student_profile?: string
    student_profile__phone?: string
    circle__name?: string
    circle__organization?: string
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

export interface getAllStudentInvitationsData extends BasePaginationData {
    id?: string
    status?: string
    or_search?: string
    circle__id?: string
    circle__organization__id?: string
    circle__address?: string
    circle__name?: string
    family__id?: string
    family__name?: string
    student__id?: string
    student__name?: string
}


export interface AllStudentJoinCircleQueriesData extends BasePaginationData {
    id?: string
    status?: string
    or_search?: string
    circle__id?: string
    circle__organization__id?: string
    circle__address?: string
    circle__name?: string
    student_profile__id?: string
    student_profile__phone?: string
    student__id?: string
    student__name?: string
    student__student_profile__phone?: string
}

export interface GetOrganizationAnalyticsData {
    date_from?: string
    date_to?: string
    organization_id: string
}


export interface GetOrganizationCircleList {
    id?: string
    name: string
    address: string
    student_profile_queries: GetAnalytics
}

export interface GetOrganizationCircleListData extends BasePaginationData {
    id?: string
    organization?: string
    organization__id?: string
    organization_id?: string
    capacity?: number
    description?: string
    ids?: string
    or_search?: string
    address?: string
    organization_name?: string
    radius?: string
    user_location?: string
    student_profile?: string
    name?: string
    order?: string
}

export interface GetCurrentCircleData {
    circle_id: string
    organization_id: string
}
