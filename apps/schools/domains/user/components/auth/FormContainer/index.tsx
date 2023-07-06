import styles from "../SignInForm/styles/styles.module.scss";
import {Col, Row} from "antd";
import { TabsAuthAction } from "../HeaderActions";
import { SignInForm } from "../SignInForm";
import React from "react";


export const FormContainer: React.FC<any> = () => {
    return (
        <div className={styles.container}>
            <div>
                <Row justify='center' align="middle">
                    <Col span={24}>
                        <TabsAuthAction currentActiveKey='/auth/signin'/>
                    </Col>
                    <Col span={24}>
                        <SignInForm/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}