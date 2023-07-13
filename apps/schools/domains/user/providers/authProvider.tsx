import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMeQuery } from '../../common/redux/meApi'

export const TokenContext = createContext('')

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const router = useRouter()
    const [token, setToken] = useState('')

    const { data, isLoading, error } = useMeQuery({})

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
