import { Photo } from '../../common/redux/entities'

export interface User {
    id?: string,
    phone?: string,
    name?: string,
    'parent_profile'?: ParentProfile,
    'employee_profile'?: EmployeeProfile,
    'student_profile'?: StudentProfile,
    'teacher_profile'?: TeacherProfile,
}

export interface ParentProfile {
    id?: string,
    name?: string,
    user?: string | User,
}

export interface EmployeeProfile {
    id?: string,
    name?: string,
    user?: string | User,
}

export interface StudentProfile {
    id?: string,
    name?: string,
    age?: number,
    phone?: string,
    photo?: Photo,
}

export interface TeacherProfile {
    id?: string,
    name?: string,
    age?: number,
    phone?: string,
    photo?: Photo,
}

export interface RetrieveCreationToken {
    key?: string,
    phone?: string,
    'is_verified'?: boolean,
}
