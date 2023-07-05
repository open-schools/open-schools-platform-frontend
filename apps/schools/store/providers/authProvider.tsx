import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { message } from 'antd'
import { useMeQuery } from '../../domains/common/redux/meApi'


export const TokenProvider: React.FC = ({ children }) => {
    const router = useRouter()
    const [token, setToken] = useState('')
    const TokenContext = createContext('')

    const { data, isLoading, error } = useMeQuery({})

    function checkJwtToken (){
        if (data && 'data' in data) {
            return true
        }
        message.info('Вам нужно зайти в свой аккаунт, чтобы начать работать')
        return false
    }

    useEffect(() => {
        const jwtToken = typeof window !== 'undefined' ? localStorage.getItem('jwtToken') : null
        if (jwtToken) {
            setToken(jwtToken)
            if (!checkJwtToken()) {
                router.push('/')
            }
        } else {
            router.push('/')
            message.info('Вам нужно зайти в свой аккаунт, чтобы начать работать')
        }
    }, [])

    return (
        <TokenContext.Provider value={token}>
            {children}
        </TokenContext.Provider>
    )
}
