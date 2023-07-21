import { Photo } from '../../common/redux/interfaces'

export interface UserData {
    token: string,
    name: string,
    password: string,
}

export interface ResetPasswordData {
    token: string,
    password: string,
}

export interface TokenResponse {
    token: string,
}

export interface TokenData {
    phone: string,
    recaptcha: string,
}

export interface CreationTokenResponse {
    token: RetrieveCreationToken
}

interface RetrieveCreationToken {
    key?: string,
    phone?: string,
    'is_verified'?: string
}

export interface CreationTokenData {
    'token_key': string
}

export interface ResendData {
    recaptcha: string,
    'token_key': string,
}

export interface VerifyData {
    otp: string,
    'token_key': string,
}

export interface LoginResponse {
    password: string,
    token?: string,
    phone: string,
}

export interface LoginData {
    password: string,
    phone: string,
}

export interface GetUserResponse {
    user: UserProfiles,
}

interface UserProfiles {
    id?: string,
    phone?: string,
    name?: string,
    'parent_profile': ParentProfile,
    'employee_profile': EmployeeProfile,
    'student_profile': StudentProfile,
    'teacher_profile': TeacherProfile,
}

interface ParentProfile {
    id?: string,
    name: string,
    user: string,
}

interface EmployeeProfile {
    id?: string,
    name: string,
    user: string,
}

interface StudentProfile {
    id?: string,
    name: string,
    age?: number,
    phone?: string,
    photo: Photo,
}

interface TeacherProfile {
    id?: string,
    name: string,
    age?: number,
    phone?: string,
    photo: Photo,
}

export interface UpdateUserResponse {
    user: User,
}

interface User {
    id?: string,
    phone?: string,
    name?: string,
}

export interface UpdateUserData {
    name?: string,
}

export interface UpdatePasswordData {
    'old_password': string,
    'new_password': string,
}
