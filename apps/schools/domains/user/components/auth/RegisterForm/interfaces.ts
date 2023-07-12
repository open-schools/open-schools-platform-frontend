import { Rule } from 'rc-field-form/lib/interface'

export interface IRegisterFormProps {
    onFinish: (userId: string) => void
}

export type ValidatorsMap = {
    [key: string]: Rule[]
}
