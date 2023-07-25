import { useMemo } from 'react'
import {
    EmailIsNotValidMsg,
    NameMustContainMsg,
    NameMustNotStartOrAndMsg,
    PasswordIsTooShortMsg,
    PleaseConfirmYourPasswordMsg,
    PleaseInputYourNameMsg,
    PleaseInputYourPasswordMsg,
} from '../constants/message'
import { MIN_PASSWORD_LENGTH } from '../constants/numbers'
import { ValidatorsMap } from '../../../../common/redux/interfaces'

export const useRegisterFormValidators = () => {
    return useMemo<ValidatorsMap>(() => {
        return {
            phone: [{ required: true }],
            name: [
                {
                    required: true,
                    message: PleaseInputYourNameMsg,
                    whitespace: true,
                    type: 'string',
                }, {
                    message: NameMustContainMsg,
                    pattern: /\p{L}+/u,
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
            ],
            password: [
                {
                    required: true,
                    message: PleaseInputYourPasswordMsg,
                },
                {
                    min: MIN_PASSWORD_LENGTH,
                    message: PasswordIsTooShortMsg,
                },
            ],
            confirm: [
                {
                    required: true,
                    message: PleaseConfirmYourPasswordMsg,
                },
                ({ getFieldValue }) => ({
                    validator (_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                        }
                        return Promise.reject(new Error(PleaseConfirmYourPasswordMsg))
                    },
                }),
            ],
        }
    }, [this])
}
