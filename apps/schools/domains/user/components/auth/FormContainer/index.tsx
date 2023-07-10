import styles from '../styles/formStyles.module.scss'
import { Col, Row } from 'antd'
import React, { Children, PropsWithChildren } from 'react'

export const FormContainer: React.FC<any> = (props: PropsWithChildren<any>) => {
    const { width, children } = props

    return (
        <div className={styles.container} style={{ width: width }}>
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
