import React from "react";

import AuthLayout, {
  IAuthLayoutProps,
} from "../domains/user/components/containers/AuthLayout";
import { ContainerPage } from "./_app";
import { FormContainer } from "../domains/user/components/auth/FormContainer";
import { SignInForm } from "../domains/user/components/auth/SignInForm";
import { TabsAuthAction } from "../domains/user/components/auth/HeaderActions";
import { CENTRALIZED } from "../domains/common/components/styles/constantStyles";
import { Row } from "antd";

const SignInPage: ContainerPage<IAuthLayoutProps> = (props) => {
  return (
    <Row className={CENTRALIZED}>
      <FormContainer>
        <TabsAuthAction currentActiveKey="/auth/signin" />
        <SignInForm />
      </FormContainer>
    </Row>
  );
};

SignInPage.container = AuthLayout;
export default SignInPage;
