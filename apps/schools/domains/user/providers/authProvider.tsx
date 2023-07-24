import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useGetUserQuery } from '../redux/authenticationApi'

export const TokenContext = createContext('')

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const router = useRouter()
    const [token, setToken] = useState('')

    const { error } = useGetUserQuery({})

    useEffect(() => {
        const jwtToken = typeof window !== 'undefined' ? localStorage.getItem('jwtToken') : null

        if (jwtToken) {
            setToken(jwtToken)
        } else {
            router.push('/auth/signin')
        }
    }, [])

    useEffect(() => {
        if (error !== undefined && 'data' in error) {
            router.push('/auth/signin')
        }
    }, [error])

    return (
        <TokenContext.Provider value={token}>
            {children}
        </TokenContext.Provider>
    )
}
