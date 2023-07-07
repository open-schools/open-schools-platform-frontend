import React from 'react'

import AuthLayout, {IAuthLayoutProps} from "../domains/user/components/containers/AuthLayout";
import {ContainerPage} from "./_app";
import {FormContainer} from "../domains/user/components/auth/FormContainer";
import {SignInForm} from "../domains/user/components/auth/SignInForm";
import {TabsAuthAction} from "../domains/user/components/auth/HeaderActions";
import {CentralizingContainer} from "../domains/common/components/CentralizingContainer";

const SignInPage: ContainerPage<IAuthLayoutProps> = (props) => {
    return (
        <CentralizingContainer>
            <FormContainer>
                <TabsAuthAction currentActiveKey='/auth/signin'/>
                <SignInForm/>
            </FormContainer>
        </CentralizingContainer>
    )
}

SignInPage.container = AuthLayout
export default SignInPage
