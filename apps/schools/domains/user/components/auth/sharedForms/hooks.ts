import { ValidatorsMap } from '../../../../common/redux/interfaces'
import {
    CodeMustContainCaetrainLength,
    NeedConfirmField,
} from '../constants/message'
import { useMemo } from 'react'
import { SMS_CODE_LENGTH } from '../constants/numbers'

export const useInputPhoneFormValidators = () => {
    return useMemo<ValidatorsMap>(() => {
        return {
            phone: [
                {
                    required: true,
                    message: NeedConfirmField,
                },
            ],
        }
    }, [this])
}

export const useValidatePhoneFormValidators = () => {
    return useMemo<ValidatorsMap>(() => {
        return {
            smsCode: [
                {
                    required: true,
                    message: NeedConfirmField,
                },
                {
                    len: SMS_CODE_LENGTH,
                    message: CodeMustContainCaetrainLength,
                },
            ],
        }
    }, [this])
}
