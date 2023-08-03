import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useGetUserQuery } from '../redux/authenticationApi'
import Cookies from 'universal-cookie'

export const TokenContext = createContext('')

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const router = useRouter()
    const [token, setToken] = useState('')

    const { error } = useGetUserQuery({})
    const cookies = new Cookies()

    useEffect(() => {
        if (router.pathname === '/mobile-recaptcha') return

        const jwtToken = typeof window !== 'undefined' ? cookies.get('jwtToken') : null

        if (jwtToken) {
            setToken(jwtToken)
        } else {
            router.push('/auth/signin')
        }
    }, [])

    useEffect(() => {
        if (router.pathname === '/mobile-recaptcha') return

        if (error !== undefined && 'data' in error) {
            router.push('/auth/signin')
        }
    }, [error])

    return <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
}
