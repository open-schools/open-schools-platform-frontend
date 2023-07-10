import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Dictionary } from '@reduxjs/toolkit'
import { ContainerPage } from '../_app'
import AuthLayout, { IAuthLayoutProps } from '../../domains/user/components/containers/AuthLayout'
import { CentralizingContainer } from '../../domains/common/components/CentralizingContainer'
import { FormContainer } from '../../domains/user/components/auth/FormContainer'
import { InputPhoneForm } from '../../domains/user/components/auth/SharedForms/InputPhoneForm'
import { TabsAuthAction } from '../../domains/user/components/auth/HeaderActions'
import { ValidatePhoneForm } from '../../domains/user/components/auth/SharedForms/ValidatePhoneForm'
import { RegisterForm } from '../../domains/user/components/auth/RegisterForm/RegisterForm'


// const HeaderAction = () => {
//     const router = useRouter()
//     return router.query.step == 'inputPhone' && (
//         <WelcomeHeaderTitle/>
//     )
// }

const RegisterPage: ContainerPage<IAuthLayoutProps> = () => {
    // const intl = useIntl()
    // const RegistrationTitleMsg = intl.formatMessage({ id: 'pages.auth.RegistrationTitle' })
    // const PhoneConfirmTokenErrorLabel = intl.formatMessage({ id: 'pages.auth.register.PhoneConfirmTokenErrorLabel' })
    // const PhoneConfirmTokenErrorMessage = intl.formatMessage({ id: 'pages.auth.register.PhoneConfirmTokenErrorMessage' })
    // const RestartPhoneConfirmLabel = intl.formatMessage({ id: 'pages.auth.register.RestartPhoneConfirmLabel' })
    // const router = useRouter()

    // const { token, isConfirmed, tokenError, setToken, setTokenError } = useContext(RegisterContext)
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
        'inputPhone': <>
            <TabsAuthAction currentActiveKey='/auth/register'/>
            <InputPhoneForm
                title={'Регистрация'}
                nextUrl={'register'}
                onFinish={() => setStep('validatePhone')}
            />
        </>,
        'validatePhone': <ValidatePhoneForm
            onFinish={() => setStep('register')}
            onReset={() => {
                setStep('inputPhone')
                Router.push('/auth/register')
            }}
            title={'Регистрация'}
        />,
        'register': <>
            <TabsAuthAction currentActiveKey='/auth/register'/>
            <RegisterForm onFinish={() => {}}/>
        </>,
    }

    return (
        <>
            <Head><title>Регистрация</title></Head>
            <CentralizingContainer>
                <FormContainer width={step === 'register' ? 500 : 560}>
                    {steps[step]}
                </FormContainer>
            </CentralizingContainer>
        </>
    )
}

RegisterPage.container = AuthLayout
export default RegisterPage
