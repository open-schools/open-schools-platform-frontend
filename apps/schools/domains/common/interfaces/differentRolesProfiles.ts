import { Photo } from './photo'

export interface UserProfile {
    id?: string,
    phone?: string,
    name?: string,
    // TODO: make parent_profile, employee_profile, student_profile, teacher_profile interfaces
    'parent_profile': ParentProfile,
    'employee_profile': EmployeeProfile,
    'student_profile': StudentProfile,
    'teacher_profile': TeacherProfile,
}

export interface ParentProfile {
    id?: string,
    name: string,
    user: string,
}

export interface EmployeeProfile extends ParentProfile {}

export interface StudentProfile {
    id?: string,
    name: string,
    age?: number,
    phone?: string,
    photo: Photo,
}

export interface TeacherProfile extends StudentProfile {}
