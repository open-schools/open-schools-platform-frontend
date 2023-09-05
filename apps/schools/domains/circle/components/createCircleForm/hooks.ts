import { useMemo } from 'react'
import { PleaseInputAddressMsg, PleaseInputCircleNameMsg } from '@domains/user/components/auth/constants/message'
import { ValidatorsMap } from '@domains/common/redux/interfaces'
import { getGreaterValidator } from '@domains/common/utils/validators'

export const useCreateCircleFormValidators = () => {
    return useMemo<ValidatorsMap>(() => {
        return {
            name: [
                {
                    required: true,
                    message: PleaseInputCircleNameMsg,
                    whitespace: true,
                    type: 'string',
                },
                getGreaterValidator(200),
            ],
            address: [
                {
                    required: true,
                    message: PleaseInputAddressMsg,
                    whitespace: true,
                    type: 'string',
                },
                getGreaterValidator(200),
            ],
            room: [getGreaterValidator(55)],
        }
    }, [this])
}
