import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import styles from './styles/styles.module.scss'
import { IAuthLayoutProps } from '../../interfaces/auth/interfaces'
import { GOOGLE_RECAPTCHA_CONTAINER, GOOGLE_RECAPTCHA_SCRIPT_PROPS, googleCaptcha } from '../../constants/auth/googleRecapcha'

// #TODO: take this variables from env
const {
    publicRuntimeConfig: { HelpRequisites: { support_email: SUPPORT_EMAIL = null, support_phone: SUPPORT_PHONE = null } },
} /* = getConfig() */ = { publicRuntimeConfig: { HelpRequisites: { support_email: 'openschools@education', support_phone: '+79999999999' } } }

const AuthLayout: React.FC<IAuthLayoutProps> = (props) => {
    const { children, ...otherProps } = props
    // const { isAuthenticated } = useAuth()

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={googleCaptcha && googleCaptcha.SITE_KEY}
            useRecaptchaNet
            container={GOOGLE_RECAPTCHA_CONTAINER}
            scriptProps={GOOGLE_RECAPTCHA_SCRIPT_PROPS}>

            <div id='ReCaptchaContainer'/>
            <div className={styles.background}>
                <object type="image/svg+xml" data="/image/authImage1.svg">svg-animation</object>
            </div>
            <div className={styles.container}>
                {children}
            </div>
        </GoogleReCaptchaProvider>
    )
}

export default AuthLayout
