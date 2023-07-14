import React, { createContext, useEffect, useState } from 'react'
import { initializeApp } from '@firebase/app'
import { getAuth, RecaptchaVerifier } from '@firebase/auth'

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

    const app = initializeApp({
        apiKey: process.env.NEXT_PUBLIC_apiKey,
        authDomain: process.env.NEXT_PUBLIC_authDomain,
        projectId: process.env.NEXT_PUBLIC_projectId,
        storageBucket: process.env.NEXT_PUBLIC_storageBucket,
        messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
        appId: process.env.NEXT_PUBLIC_appId,
        measurementId: process.env.NEXT_PUBLIC_measurementId,
    })

    useEffect(() => {
        const auth = getAuth()
        const recaptchaVerifierInstance = new RecaptchaVerifier(
            'recaptcha-container',
            {
                size: 'invisible',
                callback: (token: string) => {
                    setToken(token)
                },
            },
            auth
        )
        recaptchaVerifierInstance.render()
    }, [])

    return (
        <FirebaseReCaptchaContext.Provider value={{ phone, setPhone, token, setToken }}>
            {children}
        </FirebaseReCaptchaContext.Provider>
    )
}
