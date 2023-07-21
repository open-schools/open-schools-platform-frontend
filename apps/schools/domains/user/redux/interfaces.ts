import { GetPhoto } from '../../common/redux/interfaces'

export interface CreateUser {
    token: string,
    name: string,
    password: string,
}

export interface PasswordReset {
    token: string,
    password: string,
}

export interface TokenResponse {
    token: string,
}

export interface CreateRegistrationToken {
    phone: string,
    recaptcha: string,
}

export interface CreationTokenResponse {
    token: GetRegistrationToken
}

interface GetRegistrationToken {
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
    user: GetUserProfiles,
}

interface GetUserProfiles {
    id?: string,
    phone?: string,
    name?: string,
    'parent_profile': GetParentProfile,
    'employee_profile': GetEmployeeProfile,
    'student_profile': GetStudentProfile,
    'teacher_profile': GetTeacherProfile,
}

interface GetParentProfile {
    id?: string,
    name: string,
    user: string,
}

interface GetEmployeeProfile {
    id?: string,
    name: string,
    user: string,
}

interface GetStudentProfile {
    id?: string,
    name: string,
    age?: number,
    phone?: string,
    photo: GetPhoto,
}

interface GetTeacherProfile {
    id?: string,
    name: string,
    age?: number,
    phone?: string,
    photo: GetPhoto,
}

export interface UpdateUserResponse {
    user: GetUser,
}

interface GetUser {
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
