import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMeQuery } from '../../domains/common/redux/meApi'

export const TokenContext = createContext('')

export const TokenProvider: React.FC = ({ children }) => {
    const router = useRouter()
    const [token, setToken] = useState('')

    const { data, isLoading, error } = useMeQuery({})

    useEffect(() => {
        const jwtToken = typeof window !== 'undefined' ? localStorage.getItem('jwtToken') : null

        if (jwtToken) {
            setToken(jwtToken)
        } else {
            router.push('/')
        }
    }, [])

    useEffect(() => {
        if (error !== undefined) {
            if ('data' in error) {
                router.push('/')
            }
        }
    }, [error])

    return (
        <TokenContext.Provider value={token}>
            {children}
        </TokenContext.Provider>
    )
}
