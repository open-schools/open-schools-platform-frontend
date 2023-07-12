import { useMemo } from 'react'
import { ValidatorsMap } from '../RegisterForm/interfaces'

export const useResetFormValidators = () => {
    return useMemo<ValidatorsMap>(() => {
        return {}
        // return {
        //     phone: [{ required: true }],
        //     name: [
        //         {
        //             required: true,
        //             message: PleaseInputYourNameMsg,
        //             whitespace: true,
        //             type: 'string',
        //         }, {
        //             message: NameInvalidCharMessage,
        //             // NOTE(pahaz): test it here https://regex101.com/r/sIntkL/1
        //             pattern: /^([\p{L}-][ ]?)+$/ug,
        //         }, {
        //             message: NameMustContainMsg,
        //             pattern: /\p{L}+/u,
        //         }, {
        //             message: NameMustNotStartOrAndMsg,
        //             validator: (_, value) => !/[-]\s|\s[-]/.test(value && value.trim()) ? Promise.resolve() : Promise.reject(),
        //         },
        //     ],
        //     email: [
        //         {
        //             type: 'email',
        //             message: EmailIsNotValidMsg,
        //         },
        //     ],
        //     password: [
        //         {
        //             required: true,
        //             message: PleaseInputYourPasswordMsg,
        //         },
        //         {
        //             min: MIN_PASSWORD_LENGTH,
        //             message: PasswordIsTooShortMsg,
        //         },
        //     ],
        //     confirm: [
        //         {
        //             required: true,
        //             message: PleaseConfirmYourPasswordMsg,
        //         },
        //         ({ getFieldValue }) => ({
        //             validator (_, value) {
        //                 if (!value || getFieldValue('password') === value) {
        //                     return Promise.resolve()
        //                 }
        //                 return Promise.reject(TwoPasswordDontMatchMsg)
        //             },
        //         }),
        //     ],
        // }
    }, [this])
}
