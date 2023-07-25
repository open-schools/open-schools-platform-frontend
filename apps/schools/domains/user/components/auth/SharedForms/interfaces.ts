export interface IInputPhoneFormProps {
    onFinish: () => void
    nextUrl: string
    title?: string
    buttonText?: string
    description?: string
    disclaimer?: string
}

export interface IValidatePhoneFormProps {
    onFinish: () => void
    onReset: () => void
    onError: () => void
    title?: string
}
