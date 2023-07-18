import React, { createContext, useState } from 'react'

export interface IAuthLayoutProps {
    children: JSX.Element,
}

// #TODO: take this variables from env
const {
    publicRuntimeConfig: {
        HelpRequisites: {
            support_email: SUPPORT_EMAIL = null,
            support_phone: SUPPORT_PHONE = null,
        },
    },
} /* = getConfig() */ = {
    publicRuntimeConfig: {
        HelpRequisites: {
            support_email: 'openschools@education',
            support_phone: '+79999999999',
        },
    },
}

export const FirebaseReCaptchaContext = createContext<{
    phone: string,
    setPhone: React.Dispatch<React.SetStateAction<string>>,
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>,
}>({
    phone: '',
    setPhone: () => null,
    token: '',
    setToken: () => null,
})

export const FirebaseReCaptcha: React.FC<IAuthLayoutProps> = (props) => {
    const { children } = props
    const [phone, setPhone] = useState('')
    const [token, setToken] = useState('')

    return (
        <FirebaseReCaptchaContext.Provider value={{ phone, setPhone, token, setToken }}>
            {children}
        </FirebaseReCaptchaContext.Provider>
    )
}
