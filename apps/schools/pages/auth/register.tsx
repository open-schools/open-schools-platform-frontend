import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Dictionary } from '@reduxjs/toolkit'
import { ContainerPage } from '../_app'
import AuthLayout, { IAuthLayoutProps } from '../../domains/user/components/auth/containers/AuthLayout'
import { FormContainer } from '@domains/user/components/auth/formContainer'
import { InputPhoneForm } from '@domains/user/components/auth/sharedForms/InputPhoneForm'
import { TabsAuthAction } from '@domains/user/components/auth/headerActions'
import { ValidatePhoneForm } from '@domains/user/components/auth/sharedForms/ValidatePhoneForm'
import { RegisterForm } from '@domains/user/components/auth/registerForm'
import { CENTRALIZED } from '@domains/common/components/styles/constantStyles'
import { Row } from 'antd'
import { RegistrationDisclaimer, RegistrationPhoneButtonLabel } from '@domains/user/components/auth/constants/labels'
import { FirebaseReCaptcha } from '@domains/user/providers/firebaseReCaptchaProvider'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

const RegisterPage: ContainerPage<IAuthLayoutProps> = (props) => {
    const [step, setStep] = useState('inputPhone')

    const steps: Dictionary<JSX.Element> = {
        inputPhone: (
            <>
                <TabsAuthAction currentActiveKey={RoutePath[AppRoutes.AUTH_REGISTER]} />
                <InputPhoneForm
                    title={''}
                    nextUrl={'register'}
                    onFinish={() => setStep('validatePhone')}
                    buttonText={RegistrationPhoneButtonLabel}
                    description={''}
                    disclaimer={RegistrationDisclaimer}
                />
            </>
        ),
        validatePhone: (
            <>
                <TabsAuthAction currentActiveKey={RoutePath[AppRoutes.AUTH_REGISTER]} title={'Регистрация'} />
                <ValidatePhoneForm
                    onFinish={() => setStep('register')}
                    onReset={() => {
                        setStep('inputPhone')
                        Router.push(RoutePath[AppRoutes.AUTH_REGISTER])
                    }}
                    onError={() => {
                        setStep('inputPhone')
                        Router.push(RoutePath[AppRoutes.AUTH_REGISTER])
                    }}
                />
            </>
        ),
        register: (
            <>
                <TabsAuthAction currentActiveKey={RoutePath[AppRoutes.AUTH_REGISTER]} />
                <RegisterForm
                    onFinish={() => Router.push(RoutePath[AppRoutes.USER_LIST])}
                    onError={() => {
                        setStep('inputPhone')
                        Router.push(RoutePath[AppRoutes.AUTH_REGISTER])
                    }}
                />
            </>
        ),
    }

    return (
        <>
            <Head>
                <title>Регистрация</title>
            </Head>
            <Row className={CENTRALIZED}>
                <FirebaseReCaptcha>
                    <FormContainer width={step === 'register' ? 500 : 560}>{steps[step]}</FormContainer>
                </FirebaseReCaptcha>
            </Row>
        </>
    )
}

RegisterPage.container = AuthLayout
export default RegisterPage
