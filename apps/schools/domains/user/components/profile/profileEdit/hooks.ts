import { useMemo } from 'react'
import { ValidatorsMap } from '@domains/common/redux/interfaces'
import { PleaseInputYourEmailMsg, PleaseInputYourNameMsg } from '@domains/user/components/auth/constants/message'
import { getGreaterValidator } from '@domains/common/utils/validators'
import { USER_EMAIL, USER_NAME } from '@domains/user/components/profile/profileEdit/constants'

export const useChangeUserProfileFormValidators = () => {
    return useMemo<ValidatorsMap>(() => {
        return {
            [USER_NAME]: [
                {
                    required: true,
                    message: PleaseInputYourNameMsg,
                    whitespace: true,
                    type: 'string',
                },
                getGreaterValidator(200),
            ],
            [USER_EMAIL]: [
                {
                    message: PleaseInputYourEmailMsg,
                    whitespace: true,
                    type: 'email',
                },
                getGreaterValidator(255),
            ],
        }
    }, [this])
}
