import { QueriesTypes } from '@domains/common/redux/interfaces'

export interface GetListCircle {
    id?: string
    name?: string
    address?: string
    latitude?: string
    longitude?: string
}

export interface GetShallowOrganization {
    id: string
    name: string
}

export interface GetTeacher {
    id?: string
    name: string
    circle?: string
    teacher_profile?: string
}

export interface GetCircle {
    id?: string
    name?: string
    organization?: GetShallowOrganization
    teachers?: [GetTeacher]
    address?: string
    capacity?: number
    description?: string
    latitude?: string
    longitude?: string
}

export interface GetPhoto {
    id?: string
    image?: string
}

export interface GetStudentProfileSenderForOrganization {
    id?: string
    photo: GetPhoto
}

export interface GetCircleRecipient {
    id?: string
    name: string
    organization: GetShallowOrganization
    address: string
}

export interface GetCircleSender {
    id?: string
    name: string
    organization: GetShallowOrganization
    address: string
}

export interface GetStudentBody {
    id?: string
    name: string
}

export interface GetStudentJoinCircle {
    id?: string
    sender: GetStudentProfileSenderForOrganization
    recipient: GetCircleRecipient
    status: QueriesTypes
    body: GetStudentBody
    additional: GetStudentJoinCircleContext
    created_at?: string
}

export interface GetStudent {
    id?: string
    name: string
    circle: GetShallowCircle
    student_profile: GetStudentProfile
}

interface GetStudentJoinCircleContext {
    parent_phone?: string
    parent_name?: string
    student_phone?: string
    text?: string
}

export interface GetOrganizationSender {
    id?: string
    name?: string
    inn?: string
}

export interface GetOrganizationInviteEmployee {
    id?: string
    sender: GetOrganizationSender
    recipient: GetEmployeeProfileRecipient
    status: QueriesTypes
    body: GetEmployeeBody
    additional?: string
}

interface GetEmployeeProfileRecipient {
    id?: string
    name?: string
    user?: string
}

interface GetEmployeeBody {
    name: string
    position?: string
}

export interface UpdateOrganizationInviteEmployee {
    query: string
    body: GetEmployeeBody
}

interface CircleOrganization {
    id?: string
    name?: string
}

interface GetStudentProfile {
    id?: string
    name: string
    age?: number
    phone?: string
    photo: GetPhoto
    parent_names?: string
    parent_phones?: string
}

export interface GetAnalytics {
    IN_PROGRESS: number
    SENT: number
    ACCEPTED: number
    DECLINED: number
    CANCELED: number
}

export interface GetQueryStatus {
    id?: string
    status: QueriesTypes
}

export interface CreateOrganizationInviteEmployee {
    email?: string
    phone?: string
    body: GetEmployeeBody
    organization_id?: string
}

export interface GetEmployeeProfileUser {
    id: string
    phone: string
    name: string
}

export interface GetEmployeeProfileWithUser {
    id: string
    name: string
    user: GetEmployeeProfileUser
}

export interface GetListEmployee {
    id?: string
    name: string
    employee_profile: GetEmployeeProfileWithUser
    organization: string
    position: string
}

export interface GetEmployee {
    id?: string
    name: string
    organization?: GetOrganization
    position?: string
}

export interface GetOrganization {
    id?: string
    name?: string
    inn: string
}

export interface GetFamily {
    id?: string
    name: string
}

export interface GetFamilyRecipient {
    id?: string
    name: string
    parent_phones: string
}

export interface GetFamilySender {
    id?: string
    name: string
}

export interface ParentProfileRecipient {
    id: string
}

export interface GetFamilyInviteParent {
    id: string
    sender: GetFamilySender
    recipient: ParentProfileRecipient
    status: QueriesTypes
    body: string
    additional: string
}

export interface GetParentProfile {
    id?: string
    name: string
    user: string
}

export interface GetRegistrationToken {
    key?: string
    phone?: string
    is_verified?: string
}

export interface GetCircleInviteStudent {
    id: string
    status: string
    sender: GetCircleSender
    recipient: GetFamilyRecipient
    body: GetStudentBody
    additional: GetCircleInviteStudentContext
}

export interface GetCircleInviteStudentContext {
    id: string
    name: string
    phone: string
}

export interface GetShallowCircle {
    id?: string
    name: string
    address?: string
    capacity?: number
    description?: string
    latitude?: string
    longitude?: string
}
