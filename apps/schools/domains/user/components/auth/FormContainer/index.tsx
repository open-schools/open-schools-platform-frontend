import styles from "../SignInForm/styles/styles.module.scss";
import {Col, Row} from "antd";
import React, {Children, PropsWithChildren} from "react";

export const FormContainer: React.FC<any> = (props: PropsWithChildren<any>) => {
    const {children} = props;

    return (
        <div className={styles.container}>
            <div>
                <Row justify='center' align="middle">
                    {Children.map(children, child =>
                        <Col span={24}>
                            {child}
                        </Col>
                    )}
                </Row>
            </div>
        </div>
    )
}