export interface TokenResponse {
    token: string,
}

export interface CreationData {
    phone: string,
    recaptcha: string,
}

export interface VerifyResponse {
    detail: string,
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

export interface jwtTokenResponse {
    token: string,
}

export interface LoginData {
    password: string,
    phone: string,
}

export interface ResendData {
    resend: Resend,
    id: string,
}

interface Resend {
    recaptcha: string,
}

export interface ResendResponse {
    detail: string
}