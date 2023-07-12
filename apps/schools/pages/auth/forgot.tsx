import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Dictionary } from '@reduxjs/toolkit'
import { ContainerPage } from '../_app'
import AuthLayout, {
    IAuthLayoutProps,
} from '../../domains/user/components/containers/AuthLayout'
import { InputPhoneForm } from '../../domains/user/components/auth/SharedForms/InputPhoneForm'
import { ValidatePhoneForm } from '../../domains/user/components/auth/SharedForms/ValidatePhoneForm'
import { ResetForm } from '../../domains/user/components/auth/ResetForm/ResetForm'
import { FormContainer } from '../../domains/user/components/auth/FormContainer'
import { CENTRALIZED } from '../../domains/common/components/styles/constantStyles'
import { Row } from 'antd'
import {
    ResetDescription,
    ResetPhoneButtonLabel,
} from '../../domains/user/components/auth/constants/labels'
import { TabsAuthAction } from '../../domains/user/components/auth/HeaderActions'

// const HeaderAction = () => {
//     const router = useRouter()
//     return router.query.step == 'inputPhone' && (
//         <WelcomeHeaderTitle/>
//     )
// }

const ResetPage: ContainerPage<IAuthLayoutProps> = (props) => {
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
        inputPhone: (
            <>
                <TabsAuthAction
                    currentActiveKey="/auth/register"
                    title={'Восстановление пароля'}
                />
                <InputPhoneForm
                    title={''}
                    onFinish={() => setStep('validatePhone')}
                    nextUrl={'forgot'}
                    buttonText={ResetPhoneButtonLabel}
                    description={ResetDescription}
                    disclaimer={''}
                />
            </>
        ),
        validatePhone: (
            <>
                <TabsAuthAction
                    currentActiveKey="/auth/register"
                    title={'Восстановление пароля'}
                />
                <ValidatePhoneForm
                    onFinish={() => setStep('reset')}
                    onReset={() => {
                        setStep('inputPhone')
                        Router.push('/auth/forgot')
                    }}
                />
            </>
        ),
        reset: (
            <>
                <TabsAuthAction
                    currentActiveKey="/auth/register"
                    title={'Восстановление пароля'}
                />
                <ResetForm onFinish={() => {}} />
            </>
        ),
    }

    return (
        <>
            <Head>
                <title>Регистрация</title>
            </Head>
            <Row className={CENTRALIZED}>
                <FormContainer>{steps[step]}</FormContainer>
            </Row>
        </>
    )
}

ResetPage.container = AuthLayout
export default ResetPage
