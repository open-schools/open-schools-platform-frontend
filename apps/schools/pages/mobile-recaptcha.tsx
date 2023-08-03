import React, { useEffect, useState } from "react";
import { initializeApp } from '@firebase/app'
import { getAuth, RecaptchaVerifier } from '@firebase/auth'
import {ContainerPage} from "./_app";
import {IAuthLayoutProps} from "../domains/user/components/auth/containers/AuthLayout";
import EmptyLayout from "../domains/common/components/containers/EmptyLayout";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";


const MobileRecaptcha: ContainerPage<IAuthLayoutProps> = () => {
  const [loading, setLoading] = useState(true)
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

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
      setLoading(false)
      recaptchaVerifierInstance.render()
  }, [])

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', alignItems: 'center', alignContent: 'center', justifyContent: 'center',overflow: 'auto' }}>
      <Spin indicator={antIcon} style={ loading ? {} : { display: 'none' }} />
      <div style={{ display: 'block' }} id='recaptcha-container'>
      </div>
    </div>
  )
}

MobileRecaptcha.container = EmptyLayout
export default MobileRecaptcha
