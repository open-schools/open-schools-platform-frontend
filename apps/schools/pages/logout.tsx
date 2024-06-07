import React, { useEffect } from 'react'
import { useUserProfile } from '@domains/user/providers/authProvider'
import Router from 'next/router'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

const LogoutPage = () => {
    const { logout } = useUserProfile()

    useEffect(() => {
        logout()
        Router.push(RoutePath[AppRoutes.AUTH_SIGN_IN])
    }, [])

    return <></>
}

export default LogoutPage
