import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'

import { Dictionary } from '@reduxjs/toolkit'
import { ContainerPage } from '../_app'
import AuthLayout, {
    IAuthLayoutProps,
} from '../../domains/user/components/auth/containers/AuthLayout'
import { InputPhoneForm } from '../../domains/user/components/auth/SharedForms/InputPhoneForm'
import { ValidatePhoneForm } from '../../domains/user/components/auth/SharedForms/ValidatePhoneForm'
import { ResetForm } from '../../domains/user/components/auth/ResetForm'
import { FormContainer } from '../../domains/user/components/auth/FormContainer'
import { CENTRALIZED } from '../../domains/common/components/styles/constantStyles'
import { Row } from 'antd'
import {
    ResetDescription,
    ResetPhoneButtonLabel,
} from '../../domains/user/components/auth/constants/labels'
import { TabsAuthAction } from '../../domains/user/components/auth/HeaderActions'
import { FirebaseReCaptcha } from '../../domains/user/providers/firebaseReCaptchaProvider'

const ResetPage: ContainerPage<IAuthLayoutProps> = (props) => {
    const [step, setStep] = useState('inputPhone')

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
                <ResetForm
                    onFinish={() => {}}
                    onError={() => {
                        setStep('inputPhone')
                        Router.push('/auth/forgot')}}
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
                    <FormContainer>{steps[step]}</FormContainer>
                </FirebaseReCaptcha>
            </Row>
        </>
    )
}

ResetPage.container = AuthLayout
export default ResetPage
