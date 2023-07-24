import React, { createContext, useState } from 'react'

export interface IAuthLayoutProps {
    children: JSX.Element,
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
