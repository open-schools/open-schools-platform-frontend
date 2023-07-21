import { Employee } from '../../employee/redux/interfaces'
import { Photo } from '../../common/redux/interfaces'

export interface AllOrganizationsResponse {
    id?: string,
    name?: string,
    inn?: string,
}

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
    'creator_employee': Employee,
}

export interface Organization {
    id?: string,
    name?: string,
    inn?: string,
}

export interface createOrganizationData {
    name: string,
    inn?: string,
}

export interface UpdateInviteEmployeeResponse {
    query: EmployeeProfileQuery,
}

interface EmployeeProfileQuery {
    id?: string,
    sender: Organization,
    recipient: EmployeeProfile,
    status: 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED',
    body: QueryEmployeeBody,
    additional?: string,
}

interface EmployeeProfile {
    id?: string,
    name: string,
    user: string,
}

interface QueryEmployeeBody {
    name: string,
    position?: string,
}

export interface UpdateInviteEmployeeData {
    query: string,
    body: QueryEmployeeBody
}

export interface StudentJoinCircleResponse {
    results: StudentProfileQuery,
}

interface StudentProfileQuery {
    id?: string,
    sender: StudentProfileQuerySender,
    recipient: StudentProfileQueryRecipient,
    status: 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED',
    body: StudentProfileQueryBody,
    additional: StudentProfileQueryAdditional,
}

interface StudentProfileQuerySender {
    id?: string,
    photo: Photo,
}

interface StudentProfileQueryRecipient {
    id?: string,
    name: string,
    organization: CircleOrganization,
    address?: string,
}

interface CircleOrganization {
    id?: string,
    name: string,
}

interface StudentProfileQueryBody {
    id?: string,
    name: string,
}

interface StudentProfileQueryAdditional {
    'parent_phone'?: string,
    'parent_name'?: string,
    'student_phone'?: string,
    text?: string
}

export interface StudentJoinCircleData {
    'query_id'?: string,
    'query_status'?: string,
    'student_name'?: string,
    'student__student_profile__phone'?: string,
    organization?: string,
    circle?: string,
    limit?: number,
    offset?: number
}

export interface AllStudentsResponse {
    results: Student,
}

interface Student {
    id?: string,
    name: string,
    circle?: string,
    'student_profile': StudentProfile,
}

interface StudentProfile {
    id?: string,
    name: string,
    age?: number,
    phone?: string,
    photo: Photo,
}

export interface AllStudentsData {
    id?: string,
    name?: string,
    circle: string,
    'student_profile'?: string,
    'student_profile_phone'?: string,
    'circle_name'?: string,
    'circle_organization'?: string,
    'or_search'?: string,
    limit: number,
    offset: number,
}

export interface StudentResponse {
    student: Student,
}

export interface StudentData {
    'student_id': string
}

export interface TeacherResponse {
    teacher: Teacher
}

interface Teacher {
    id?: string,
    name: string,
    circle?: string,
    'teacher_profile'?: string,
}

export interface TeacherData {
    'teacher_id': string
}

export interface DeleteOrganizationData {
    'organization_id': string,
}

export interface AnalyticsResponse {
    analytics: Analytics
}

interface Analytics {
    'IN_PROGRESS': number,
    'SENT': number,
    'ACCEPTED': number,
    'DECLINED': number,
    'CANCELED': number,
}

export interface AnalyticsData {
    'date_from'?: string,
    'date_to'?: string,
    'organization_id': string,
}

export interface InviteEmployeeResponse {
    query: QueryStatus
}

interface QueryStatus {
    id?: string,
    status: 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED',
}

export interface InviteEmployeeData {
    email: string,
    phone: string,
    body: QueryEmployeeBody,
    'organization_id': string,
}

export interface AllQueriesResponse {
    results: EmployeeProfileQuery,
}

export interface AllQueriesData {
    'organization_id': string,
}

export interface ExportStudentsResponse {
    file: File,
}

export interface ExportStudentsData {
    'organization_id': string,
}

export interface AllTeachersResponse {
    id?: string,
    name: string,
    circle?: string,
    'teacher_profile'?: string,
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

export interface AllQueriesOfOrganizationResponse {
    id?: string,
    sender: StudentProfileQuerySender,
    recipient: StudentProfileQueryRecipient,
    status: 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED',
    body: StudentProfileQueryBody,
    additional: StudentProfileQueryAdditional,
}

export interface AllQueriesOfOrganizationData {
    page?: number,
    'page_size'?: number,
    organization: string,
    'student_profile': string,
}
