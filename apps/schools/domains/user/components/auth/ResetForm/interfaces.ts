import { Rule } from 'rc-field-form/lib/interface'

export interface IResetFormProps {
    onFinish: (userId: string) => void,
    onError: () => void
}

type ValidatorsMap = {
    [key: string]: Rule[]
}
