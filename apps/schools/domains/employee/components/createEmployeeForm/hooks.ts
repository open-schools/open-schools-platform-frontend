import { useMemo } from 'react'
import { ValidatorsMap } from '../../../user/components/auth/registerForm/interfaces'
import {
    EmailIsNotValidMsg,
    NameMustContainMsg,
    NameMustNotStartOrAndMsg, PleaseInputYourEmailMsg,
    PleaseInputYourNameMsg,
    WrongPhoneFormatMsg,
} from '../../../user/components/auth/constants/message'

export const useCreateEmployeeFormValidators = () => {
    return useMemo<ValidatorsMap>(() => {
        return {
            phone: [
                {
                    required: true,
                    message: WrongPhoneFormatMsg,
                },
            ],
            name: [
                {
                    required: true,
                    message: PleaseInputYourNameMsg,
                    whitespace: true,
                    type: 'string',
                }, {
                    message: NameMustContainMsg,
                    pattern: /^\p{L}+(?: \p{L}+)*$/u,
                }, {
                    message: NameMustNotStartOrAndMsg,
                    validator: (_, value) => !/[-]\s|\s[-]/.test(value && value.trim()) ? Promise.resolve() : Promise.reject(),
                },
            ],
            email: [
                {
                    type: 'email',
                    message: EmailIsNotValidMsg,
                },
                {
                    required: true,
                    message: PleaseInputYourEmailMsg,
                },
            ],
        }
    }, [this])
}
