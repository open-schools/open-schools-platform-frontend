import { useMemo } from 'react'
import { ValidatorsMap } from './interfaces'
import { PleaseConfirmYourPasswordMsg } from '../constants/message'

export const useRegisterFormValidators = () => {
    return useMemo<ValidatorsMap>(() => {
        return {
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
