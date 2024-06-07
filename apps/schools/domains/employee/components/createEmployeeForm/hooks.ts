import { useMemo } from 'react'
import {
    EmailIsNotValidMsg,
    PersonNameMustContainMsg,
    PersonNameMustNotStartOrAndMsg,
    PleaseInputYourNameMsg,
    WrongPhoneFormatMsg,
} from '@domains/user/components/auth/constants/message'
import { ValidatorsMap } from '@domains/common/redux/interfaces'

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
                },
                {
                    message: PersonNameMustContainMsg,
                    // TODO: move code above regexps to constants
                    pattern: /^[А-ЯЁа-яёA-Za-z]+(?: [А-ЯЁа-яёA-Za-z]+)*$/,
                },
                {
                    message: PersonNameMustNotStartOrAndMsg,
                    // TODO: move code above regexps to constants
                    validator: (_, value) =>
                        !/[-]\s|\s[-]/.test(value && value.trim()) ? Promise.resolve() : Promise.reject(),
                },
            ],
            email: [
                {
                    type: 'email',
                    message: EmailIsNotValidMsg,
                },
            ],
        }
    }, [this])
}
