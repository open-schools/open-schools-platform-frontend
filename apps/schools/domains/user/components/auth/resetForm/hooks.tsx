import { useMemo } from 'react'
import { PleaseConfirmYourPasswordMsg } from '../constants/message'
import { ValidatorsMap } from '../../../../common/redux/interfaces'

export const useResetFormValidators = () => {
    return useMemo<ValidatorsMap>(() => {
        return {
            confirm: [
                {
                    required: true,
                    message: PleaseConfirmYourPasswordMsg,
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
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
