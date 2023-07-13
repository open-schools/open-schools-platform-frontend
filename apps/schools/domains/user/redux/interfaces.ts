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

export interface verifyData {
    otp: string,
    token: string,
}

export interface UserRegister {
    token: string,
    name: string,
    password: string,
}

export interface jwtTokenResponse {
    token: string,
}

export interface LoginData {
    password: string,
    phone: string,
}
