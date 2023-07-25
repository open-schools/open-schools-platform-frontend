import { useMemo } from 'react'
import { ValidatorsMap } from './interfaces'
import { PasswordIsTooShortMsg, PleaseConfirmYourPasswordMsg, PleaseInputYourPasswordMsg } from '../constants/message'
import { MIN_PASSWORD_LENGTH } from '../constants/numbers'

export const useRegisterFormValidators = () => {
    return useMemo<ValidatorsMap>(() => {
        return {
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
