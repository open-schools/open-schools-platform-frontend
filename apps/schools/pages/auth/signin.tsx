import React from 'react'

import AuthLayout, {
    IAuthLayoutProps,
} from '../../domains/user/components/auth/containers/AuthLayout'
import { ContainerPage } from '../_app'
import { FormContainer } from '../../domains/user/components/auth/formContainer'
import { SignInForm } from '../../domains/user/components/auth/signInForm'
import { TabsAuthAction } from '../../domains/user/components/auth/headerActions'
import Head from 'next/head'
import { CENTRALIZED } from '../../domains/common/components/styles/constantStyles'
import { Row, Button, Typography } from 'antd'

const { Text } = Typography

const SignInPage: ContainerPage<IAuthLayoutProps> = (props) => {
    return (
        <>
            <Head>
                <title>Вход</title>
            </Head>
            <Row className={CENTRALIZED}>
                <FormContainer>
                    <TabsAuthAction currentActiveKey="/auth/signin" />
                    <SignInForm />
                    <div style={{ marginTop: 24, textAlign: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#595959', display: 'block', marginBottom: 8 }}>
                            Если вы хотите разместить приложение, свяжитесь с нашей службой поддержки.
                        </Text>
                        <Button
                            type="link"
                            href="https://help.lamart.site"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ padding: 0, height: 'auto', fontSize: 14 }}
                        >
                            Связаться с поддержкой
                        </Button>
                    </div>
                </FormContainer>
            </Row>
        </>
    )
}

SignInPage.container = AuthLayout
export default SignInPage
