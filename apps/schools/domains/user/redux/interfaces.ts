export interface TokenResponse {
    token?: string,
}

export interface TokenData {
    phone: string,
    recaptcha: string,
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

export interface CreationTokenResponse {
    token: RetrieveCreationToken
}

export interface RetrieveCreationToken {
    key?: string,
    phone?: string,
    'is_verified'?: boolean,
}

export interface ResendData {
    resend: Resend,
    id: string,
}

export interface Resend {
    recaptcha: string,
}
