import React from 'react'

import AuthLayout from '../../domains/user/components/containers/AuthLayout'
import { ContainerPage } from '../_app'
import { FormContainer } from '../../domains/user/components/auth/FormContainer'
import { SignInForm } from '../../domains/user/components/auth/SignInForm'
import { TabsAuthAction } from '../../domains/user/components/auth/HeaderActions'
import { CentralizingContainer } from '../../domains/common/components/CentralizingContainer'
import Head from 'next/head'
import { IAuthLayoutProps } from '../../domains/user/interfaces/auth/interfaces'

const SignInPage: ContainerPage<IAuthLayoutProps> = (props) => {
    return (
        <>
            <Head><title>Вход</title></Head>
            <CentralizingContainer>
                <FormContainer>
                    <TabsAuthAction currentActiveKey='/auth/signin'/>
                    <SignInForm/>
                </FormContainer>
            </CentralizingContainer>
        </>
    )
}

SignInPage.container = AuthLayout
export default SignInPage
