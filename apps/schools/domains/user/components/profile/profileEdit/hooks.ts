import { useMemo } from 'react'
import { ValidatorsMap } from '@domains/common/redux/interfaces'
import {
    PersonNameMustContainMsg, PersonNameMustNotStartOrAndMsg,
    PleaseInputYourEmailMsg,
    PleaseInputYourNameMsg
} from '@domains/user/components/auth/constants/message'
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
