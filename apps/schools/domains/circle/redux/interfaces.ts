import { BasePaginationData } from '../../common/redux/interfaces'

export interface AllCirclesData extends BasePaginationData {
    id?: string
    organization?: string
    organization__id?: string
    capacity?: string
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

export interface CreateCircleData {
    name: string
    organization: string
    address?: string
    capacity: string
    description: string
    location: string
}

export interface AllCirclesIcalData extends BasePaginationData {
    id?: string
    organization?: string
    organization__id?: string
    capacity?: string
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

interface CreateStudentBodyData {
    name: string
}

export interface CreateCircleInviteStudentData {
    body: CreateStudentBodyData
    student_phone?: string
    parent_phone: string
    email: string
    circle_id?: string
}

interface CreateTeacherBodyData {
    name: string
}

export interface CreateCircleInviteTeacherData {
    body: CreateTeacherBodyData
    phone: string
    email: string
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

export interface CircleData {
    circle_id?: string
}

export interface CircleStudentsData extends BasePaginationData {
    id?: string
    name?: string
    circle?: string
    student_profile?: string
    student_profile__phone?: string
    circle__name?: string
    student_profile__name?: string
    circle__organization?: string
    parent_phone?: string
    or_search?: string
    circle_id?: string
}
