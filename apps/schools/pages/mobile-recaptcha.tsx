import React, { useEffect } from 'react'
import { initializeApp } from '@firebase/app'
import { getAuth, RecaptchaVerifier } from '@firebase/auth'

const MobileRecaptcha = () => {
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

export default MobileRecaptcha
