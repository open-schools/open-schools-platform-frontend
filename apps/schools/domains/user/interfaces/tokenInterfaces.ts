export interface CreationToken {
    phone: string,
    recaptcha: string
}

export interface TokenResponse {
    token: string
}

export interface VerifyResponse {
    detail: string
}

export interface UserRegister {
    token: string,
    name: string,
    password: string,
}