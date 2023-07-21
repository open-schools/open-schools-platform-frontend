import { GetEmployee } from '../../employee/redux/interfaces'
import { GetPhoto } from '../../common/redux/interfaces'

export interface GetOrganizationSender {
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
    'creator_employee': GetEmployee,
}

export interface createOrganizationData {
    name: string,
    inn?: string,
}

export interface UpdateInviteEmployeeResponse {
    query: GetOrganizationInviteEmployee,
}

interface GetOrganizationInviteEmployee {
    id?: string,
    sender: GetOrganizationSender,
    recipient: GetEmployeeProfileRecipient,
    status: 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED',
    body: GetEmployeeBody,
    additional?: string,
}

interface GetEmployeeProfileRecipient {
    id?: string,
    name: string,
    user: string,
}

interface GetEmployeeBody {
    name: string,
    position?: string,
}

export interface UpdateOrganizationInviteEmployee {
    query: string,
    body: GetEmployeeBody
}

export interface StudentJoinCircleResponse {
    results: GetStudentJoinCircle,
}

export interface GetStudentJoinCircle {
    id?: string,
    sender: GetStudentProfileSenderForOrganization,
    recipient: GetCircleRecipient,
    status: 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED',
    body: GetStudentBody,
    additional: GetStudentJoinCircleContext,
}

interface GetStudentProfileSenderForOrganization {
    id?: string,
    photo: GetPhoto,
}

interface GetCircleRecipient {
    id?: string,
    name: string,
    organization: CircleOrganization,
    address?: string,
}

interface CircleOrganization {
    id?: string,
    name: string,
}

interface GetStudentBody {
    id?: string,
    name: string,
}

interface GetStudentJoinCircleContext {
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
    results: GetStudent,
}

interface GetStudent {
    id?: string,
    name: string,
    circle?: string,
    'student_profile': GetStudentProfile,
}

interface GetStudentProfile {
    id?: string,
    name: string,
    age?: number,
    phone?: string,
    photo: GetPhoto,
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
    student: GetStudent,
}

export interface StudentData {
    'student_id': string
}

export interface TeacherResponse {
    teacher: GetTeacher
}

export interface GetTeacher {
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
    analytics: GetAnalytics
}

interface GetAnalytics {
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
    query: GetQueryStatus
}

interface GetQueryStatus {
    id?: string,
    status: 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED',
}

export interface CreateOrganizationInviteEmployee {
    email: string,
    phone: string,
    body: GetEmployeeBody,
    'organization_id': string,
}

export interface AllQueriesResponse {
    results: GetOrganizationInviteEmployee,
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
