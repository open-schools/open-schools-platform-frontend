import React, {PropsWithChildren} from "react";
import {Row} from "antd";
import styles from "./styles/styles.module.scss"

export const CentralizingContainer: React.FC<any> = (props: PropsWithChildren<any>) => {
    const {children} = props;
    return (
        <div className={styles.fullHeight}>
            <Row justify='center' align="middle" className={styles.fullHeight}>
                {children}
            </Row>
        </div>
    )
}