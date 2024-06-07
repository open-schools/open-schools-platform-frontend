import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useGetUserQuery } from '../redux/authenticationApi'
import Cookies from 'universal-cookie'
import { GetUserProfiles } from '@domains/user/redux/interfaces'
import { EventKey, useEventBus } from '@domains/common/providers/eventBusProvider'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

export const UserProfileContext = createContext<{
    token: string
    user: GetUserProfiles
    logout: () => void
}>({
    token: '',
    logout: () => {},
    user: {},
})

interface AuthProviderProps {
    children: React.ReactNode
}

export const useUserProfile = () => useContext(UserProfileContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const router = useRouter()
    const { on } = useEventBus()
    const [token, setToken] = useState('')
    const [user, setUser] = useState({})

    const { data, error, refetch } = useGetUserQuery({})
    const cookies = new Cookies()

    useEffect(() => {
        const unsubscribeOnRefetchProfileQuery = on(EventKey.RefetchProfileQuery, () => {
            refetch()
        })

        if (router.pathname === RoutePath[AppRoutes.MOBILE_RECAPTCHA]) return

        const jwtToken = typeof window !== 'undefined' ? cookies.get('jwtToken') : null

        if (jwtToken) {
            setToken(jwtToken)
        } else {
            router.push(RoutePath[AppRoutes.AUTH_SIGN_IN])
        }

        return () => {
            unsubscribeOnRefetchProfileQuery()
        }
    }, [])

    useEffect(() => {
        setUser(data?.user ?? {})
    }, [data])

    useEffect(() => {
        if (router.pathname === RoutePath[AppRoutes.MOBILE_RECAPTCHA]) return

        if (error !== undefined && 'data' in error) {
            router.push(RoutePath[AppRoutes.AUTH_SIGN_IN])
        }
    }, [error])

    const Logout = () => {
        cookies.remove('jwtToken')
    }

    return (
        <UserProfileContext.Provider value={{ token: token, user: user, logout: Logout }}>
            {children}
        </UserProfileContext.Provider>
    )
}
