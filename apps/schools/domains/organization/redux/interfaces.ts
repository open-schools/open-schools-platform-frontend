import { BasePaginationData, GetPhoto } from '../../common/redux/interfaces'

export interface GetOrganizationSender {
    id?: string
    name?: string
    inn?: string
}

export interface AllOrganizationsData extends BasePaginationData {
    id?: string
    name?: string
    inn?: string
    ids?: string
    or_search?: string
}

export interface createOrganizationData {
    name: string
    inn?: string
}

export interface GetOrganizationInviteEmployee {
    id?: string
    sender: GetOrganizationSender
    recipient: GetEmployeeProfileRecipient
    status: 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED'
    body: GetEmployeeBody
    additional?: string
}

interface GetEmployeeProfileRecipient {
    id?: string
    name: string
    user: string
}

interface GetEmployeeBody {
    name: string
    position?: string
}

export interface UpdateOrganizationInviteEmployee {
    query: string
    body: GetEmployeeBody
}

export interface GetStudentJoinCircle {
    id?: string
    sender: GetStudentProfileSenderForOrganization
    recipient: GetCircleRecipient
    status: 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED'
    body: GetStudentBody
    additional: GetStudentJoinCircleContext
}

interface GetStudentProfileSenderForOrganization {
    id?: string
    photo: GetPhoto
}

interface GetCircleRecipient {
    id?: string
    name: string
    organization: CircleOrganization
    address?: string
}

interface CircleOrganization {
    id?: string
    name: string
}

interface GetStudentBody {
    id?: string
    name: string
}

interface GetStudentJoinCircleContext {
    parent_phone?: string
    parent_name?: string
    student_phone?: string
    text?: string
}

export interface StudentJoinCircleData {
    query_id?: string
    query_status?: string
    student_name?: string
    student__student_profile__phone?: string
    organization?: string
    circle?: string
    limit?: number
    offset?: number
}

export interface GetStudent {
    id?: string
    name: string
    circle?: string
    student_profile: GetStudentProfile
}

interface GetStudentProfile {
    id?: string
    name: string
    age?: number
    phone?: string
    photo: GetPhoto
}

export interface AllStudentsData {
    id?: string
    name?: string
    circle: string
    student_profile?: string
    student_profile_phone?: string
    circle_name?: string
    circle_organization?: string
    or_search?: string
    limit: number
    offset: number
}

export interface StudentData {
    student_id: string
}

export interface GetTeacher {
    id?: string
    name: string
    circle?: string
    teacher_profile?: string
}

export interface TeacherData {
    teacher_id: string
}

export interface DeleteOrganizationData {
    organization_id: string
}

export interface GetAnalytics {
    IN_PROGRESS: number
    SENT: number
    ACCEPTED: number
    DECLINED: number
    CANCELED: number
}

export interface AnalyticsData {
    date_from?: string
    date_to?: string
    organization_id: string
}

export interface GetQueryStatus {
    id?: string
    status: 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED'
}

export interface CreateOrganizationInviteEmployee {
    email: string
    phone: string
    body: GetEmployeeBody
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
