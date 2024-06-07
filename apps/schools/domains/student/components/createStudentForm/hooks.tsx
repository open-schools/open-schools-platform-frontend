import { useMemo } from 'react'

import {
    EmailIsNotValidMsg,
    PersonNameMustContainMsg,
    PersonNameMustNotStartOrAndMsg,
    PleaseInputYourNameMsg,
    PleaseSelectOneOfOptionsMsg,
    WrongPhoneFormatMsg,
} from '@domains/user/components/auth/constants/message'
import { ValidatorsMap } from '@domains/common/redux/interfaces'

export const useCreateStudentFormValidators = () => {
    return useMemo<ValidatorsMap>(() => {
        return {
            parentPhone: [
                {
                    required: true,
                    message: WrongPhoneFormatMsg,
                },
            ],
            studentPhone: [
                {
                    required: false,
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
            select: [
                {
                    required: true,
                    message: PleaseSelectOneOfOptionsMsg,
                },
            ],
        }
    }, [this])
}
