import { BaseEntity, Photo } from '../../common/redux/entities'

export interface User extends BaseEntity {
    id?: string,
    phone?: string,
    name?: string,
    'is_active'?: boolean,
    'is_admin'?: boolean,
    'last_login_ip_address'?: string,
    'parent_profile'?: ParentProfile,
    'employee_profile'?: EmployeeProfile,
    'student_profile'?: StudentProfile,
    'teacher_profile'?: TeacherProfile,
}

export interface ParentProfile extends BaseEntity {
    id?: string,
    name?: string,
    user?: string | User,
}

export interface EmployeeProfile extends BaseEntity {
    id?: string,
    name?: string,
    user?: string | User,
    email?: string,
}

export interface StudentProfile extends BaseEntity {
    id?: string,
    user?: string | User,
    name?: string,
    age?: number,
    phone?: string,
    photo?: Photo,
}

export interface TeacherProfile extends BaseEntity {
    id?: string,
    user?: string | User,
    name?: string,
    age?: number,
    phone?: string,
    photo?: Photo,
}
