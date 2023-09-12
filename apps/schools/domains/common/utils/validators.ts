import { CharactersBottomLimitMsg, CharactersTopLimitMsg } from '@domains/user/components/auth/constants/message'

export function getLesserValidator(limit: number) {
    return {
        message: CharactersBottomLimitMsg(limit),
        validator: (_: any, value: any) => {
            return value.length >= limit
                ? Promise.resolve()
                : Promise.reject(new Error(CharactersBottomLimitMsg(limit)))
        },
    }
}

export function getGreaterValidator(limit: number) {
    return {
        message: CharactersTopLimitMsg(limit),
        validator: (_: any, value: any) => {
            return value.length <= limit ? Promise.resolve() : Promise.reject(new Error(CharactersTopLimitMsg(limit)))
        },
    }
}
