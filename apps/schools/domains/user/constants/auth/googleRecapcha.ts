import { IGoogleReCaptchaContainer, IGoogleReCaptchaScriptProps } from '../../interfaces/auth/interfaces'
import getConfig from 'next/config'

export const GOOGLE_RECAPTCHA_CONTAINER: IGoogleReCaptchaContainer = {
    element: 'ReCaptchaContainer',
    parameters: {
        badge: 'inline',
    },
}

export const GOOGLE_RECAPTCHA_SCRIPT_PROPS: IGoogleReCaptchaScriptProps = {
    async: true,
    defer: true,
    appendTo: 'body',
}

export const { publicRuntimeConfig: { googleCaptcha } } = getConfig()
