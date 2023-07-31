import React, { useEffect } from 'react'
import { initializeApp } from '@firebase/app'
import { getAuth, RecaptchaVerifier } from '@firebase/auth'
import {ContainerPage} from "./_app";
import {IAuthLayoutProps} from "../domains/user/components/auth/containers/AuthLayout";
import EmptyLayout from "../domains/common/components/containers/EmptyLayout";

const MobileRecaptcha: ContainerPage<IAuthLayoutProps> = () => {
    useEffect(() => {
        const app = initializeApp({
            apiKey: process.env.NEXT_PUBLIC_apiKey,
            authDomain: process.env.NEXT_PUBLIC_authDomain,
            projectId: process.env.NEXT_PUBLIC_projectId,
            storageBucket: process.env.NEXT_PUBLIC_storageBucket,
            messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
            appId: process.env.NEXT_PUBLIC_appId,
            measurementId: process.env.NEXT_PUBLIC_measurementId,
        })

        const auth = getAuth(app)
        const recaptchaVerifierInstance = new RecaptchaVerifier(
            'recaptcha-container',
            {
                type: 'image',
                size: 'normal',
                badge: 'bottomleft',
                'callback': (token: string) => {
                    // @ts-ignore
                    Android.verify(token)
                },
                'expired-callback': () => {
                    // @ts-ignore
                    Android.verify('')
                },
            },
            auth
        )
        recaptchaVerifierInstance.render()
    }, [])

    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh', alignItems: 'center', alignContent: 'center', justifyContent: 'center',overflow: 'auto' }}>
            <div style={{ display: 'block' }} id='recaptcha-container'>
            </div>
        </div>
    )
}

MobileRecaptcha.container = EmptyLayout
export default MobileRecaptcha
