import { useMemo } from 'react'
import {
    NeedConfirmField,
    PasswordIsTooShortMsg,
    PleaseInputYourPasswordMsg,
} from '../constants/message'
import { MIN_PASSWORD_LENGTH } from '../constants/numbers'
import { ValidatorsMap } from '../../../../common/redux/interfaces'

export const useSignInFormValidators = () => {
    return useMemo<ValidatorsMap>(() => {
        return {
            phone: [
                {
                    required: true,
                    message: NeedConfirmField,
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
        }
    }, [this])
}
