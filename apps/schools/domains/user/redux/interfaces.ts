import { RetrieveCreationToken, User } from './entities'

export interface TokenResponse {
    token?: string,
}

export interface TokenData {
    phone: string,
    recaptcha: string,
}

export interface VerifyResponse {
    detail?: string,
}

export interface VerifyData {
    otp: string,
    token: string,
}

export interface UserData {
    token: string,
    name: string,
    password: string,
}

export interface ResetPasswordData {
    token: string,
    password: string,
}

export interface LoginResponse {
    token?: string,
}

export interface LoginData {
    password?: string,
    phone?: string,
}

export interface GetUserProfileResponse {
    user?: User,
}

export interface UpdateUserResponse {
    user?: User,
}

export interface UpdateUserData {
    name?: string
}

export interface UpdatePasswordData {
    'old_password'?: string,
    'new_password'?: string,
}

export interface CreationTokenResponse {
    token: RetrieveCreationToken
}

export interface CreationTokenData {
    id?: string,
}

export interface ResendData {
    resend: Resend,
    id: string,
}

interface Resend {
    recaptcha: string,
}

export interface ResendResponse {
    detail?: string
}
