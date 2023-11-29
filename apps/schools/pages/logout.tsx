import React, { useEffect } from 'react'
import {useUserProfile} from "@domains/user/providers/authProvider";
import router from "next/router";


const LogoutPage = () => {
    const {logout} = useUserProfile()

    useEffect(() => {
        logout();
        router.push('auth/signin');
    }, [])

    return <></>
}

export default LogoutPage
