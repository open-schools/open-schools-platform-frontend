import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Dictionary } from '@reduxjs/toolkit'
import { ContainerPage } from '../_app'
import AuthLayout, {
    IAuthLayoutProps,
} from '../../domains/user/components/auth/containers/AuthLayout'
import { FormContainer } from '../../domains/user/components/auth/FormContainer'
import { InputPhoneForm } from '../../domains/user/components/auth/SharedForms/InputPhoneForm'
import { TabsAuthAction } from '../../domains/user/components/auth/HeaderActions'
import { ValidatePhoneForm } from '../../domains/user/components/auth/SharedForms/ValidatePhoneForm'
import { RegisterForm } from '../../domains/user/components/auth/RegisterForm'
import { CENTRALIZED } from '../../domains/common/components/styles/constantStyles'
import { Row } from 'antd'
import {
    RegistrationDisclaimer,
    RegistrationPhoneButtonLabel,
} from '../../domains/user/components/auth/constants/labels'
import { FirebaseReCaptcha } from '../../domains/user/providers/firebaseReCaptchaProvider'

const RegisterPage: ContainerPage<IAuthLayoutProps> = (props) => {
    const [step, setStep] = useState('inputPhone')

    // useEffect(() => {
    //     if (token && isConfirmed) {
    //         setStep('register')
    //     } else if (token) {
    //         setStep('validatePhone')
    //     } else {
    //         setStep('inputPhone')
    //     }
    // }, [token, isConfirmed])

    // useEffect(() => {
    //     router.push(router.route + qs.stringify(
    //         { ...router.query, step },
    //         { arrayFormat: 'comma', skipNulls: true, addQueryPrefix: true },
    //     ))
    // }, [step])

    // if (tokenError && token) {
    //     return (
    //         <BasicEmptyListView>
    //             <Typography.Title level={3}>
    //                 {PhoneConfirmTokenErrorLabel}
    //             </Typography.Title>
    //             <Typography.Text style={{ fontSize: fontSizes.content }}>
    //                 {PhoneConfirmTokenErrorMessage}
    //             </Typography.Text>
    //             <Button
    //                 type='sberPrimary'
    //                 style={{ marginTop: '16px' }}
    //                 onClick={() => {
    //                     setToken(null)
    //                     setTokenError(null)
    //                     setStep('inputPhone')
    //                     Router.push('/auth/register')
    //                 }}
    //             >
    //                 {RestartPhoneConfirmLabel}
    //             </Button>
    //         </BasicEmptyListView>
    //     )
    // }

    const steps: Dictionary<JSX.Element> = {
        inputPhone: (
            <>
                <TabsAuthAction currentActiveKey="/auth/register" />
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
                <TabsAuthAction
                    currentActiveKey="/auth/register"
                    title={'Регистрация'}
                />
                <ValidatePhoneForm
                    onFinish={() => setStep('register')}
                    onReset={() => {
                        setStep('inputPhone')
                        Router.push('/auth/register')
                    }}
                />
            </>
        ),
        register: (
            <>
                <TabsAuthAction currentActiveKey="/auth/register" />
                <RegisterForm onFinish={(userId) =>
                    Router.push(`/auth/signin/${userId}`)} />
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
                    <FormContainer width={step === 'register' ? 500 : 560}>
                        {steps[step]}
                    </FormContainer>
                </FirebaseReCaptcha>
            </Row>
        </>
    )
}

RegisterPage.container = AuthLayout
export default RegisterPage
