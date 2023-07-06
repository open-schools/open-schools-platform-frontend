import React from 'react'

import {Row} from "antd";
import AuthLayout, {IAuthLayoutProps} from "../domains/user/components/containers/AuthLayout";
import {ContainerPage} from "./_app";
import {FormContainer} from "../domains/user/components/auth/FormContainer";

const SignInPage: ContainerPage<IAuthLayoutProps> = (props) => {
    return (
        <div style={{height: '100%'}}>
            <Row justify='center' align="middle" style={{height: '100%'}}>
                <FormContainer/>
            </Row>
        </div>
    )
}

SignInPage.container = AuthLayout
export default SignInPage
