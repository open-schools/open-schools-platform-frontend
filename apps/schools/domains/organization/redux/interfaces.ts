import {
    Analytics,
    CircleOrganization,
    QueryStatus,
    Student,
    StudentPhoto,
    StudentProfileAdditional,
    Teacher,
} from './entities'
import { Employee } from '../../employee/redux/entities'
import { EmployeeProfileQuery, QueryEmployeeBody } from '../../employee/redux/interfaces'

export interface AllOrganizationsData {
    id?: string,
    name?: string,
    inn?: string,
    ids?: string,
    'or_search'?: string,
    page?: number,
    'page_size'?: number,
}

export interface CreateOrganizationResponse {
    'creator_employee': Employee
}

export interface createOrganizationData {
    name?: string,
    inn?: string,
}

export interface UpdateInviteEmployeeResponse {
    query: EmployeeProfileQuery,
}

export interface UpdateInviteEmployeeData {
    query: string,
    body: QueryEmployeeBody,
}

export interface StudentJoinCircleData {
    'query_id'?: string,
    'query_status'?: string,
    'student_name'?: string,
    'student_student_profile_phone'?: string,
    organization?: string,
    circle?: string,
    limit?: number,
    offset?: number,
}

export interface StudentJoinCircleResponse {
    results: StudentProfileQuery
}

export interface StudentProfileQuery {
    id?: string,
    sender: StudentPhoto,
    recipient: QueryCircleRecipient,
    status: 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED',
    body: StudentName,
    additional: StudentProfileAdditional,
}

export interface StudentName {
    id?: string,
    name: string,
}

export interface QueryCircleRecipient {
    id?: string,
    name: string,
    organization: CircleOrganization,
    address?: string
}

export interface AllStudentsResponse {
    results: Student
}

export interface AllStudentsData {
    id?: string,
    name?: string,
    circle?: string,
    'student_profile'?: string,
    'student_profile_phone'?: string,
    'circle_name'?: string,
    'circle_organization'?: string,
    'or_search'?: string,
    'limit'?: number,
    'offset'?: number,
}

export interface StudentResponse {
    student: Student
}

export interface TeacherResponse {
    teacher: Teacher
}

export interface AnalyticsData {
    'date_from'?: string,
    'date_to'?: string,
    id: string,
}

export interface AnalyticsResponse {
    analytics: Analytics
}

export interface InviteEmployeeData {
    'employee_invite': OrganizationEmployeeInvite,
    id: string,
}

export interface OrganizationEmployeeInvite {
    email: string,
    phone: string,
    body: QueryEmployeeBody
}

export interface InviteEmployeeResponse {
    query: QueryStatus,
}

export interface AllQueriesResponse {
    results: EmployeeProfileQuery
}

export interface ExportStudentsResponse {
    file: File,
}

export interface AllTeachersData {
    circle?: string,
    'teacher_profile'?: string,
    id?: string,
    name?: string,
    'or_search'?: string,
    phone?: string,
    'circle_name'?: string,
    'circle_ids'?: string,
    page?: number,
    'page_size'?: number,
    'organization_id': string,
}

export interface AllQueriesOfOrganizationData {
    page?: number,
    'page_size'?: number,
    organization: string,
    'student_profile': string,
}
