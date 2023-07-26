import { useMemo } from 'react'
import { PasswordIsTooShortMsg, PleaseConfirmYourPasswordMsg, PleaseInputYourPasswordMsg } from '../constants/message'
import { ValidatorsMap } from '../../../../common/redux/interfaces'
import { MIN_PASSWORD_LENGTH } from '../constants/numbers'

export const useResetFormValidators = () => {
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
                    min: MIN_PASSWORD_LENGTH,
                    message: PasswordIsTooShortMsg,
                },
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
