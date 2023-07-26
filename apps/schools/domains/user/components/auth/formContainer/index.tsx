import styles from '../styles/formStyles.module.scss'
import { Col, Row } from 'antd'
import React, { Children } from 'react'
import { FormContainerProps } from './interfaces'

export const FormContainer: React.FC<FormContainerProps> = (
    props: FormContainerProps
) => {
    const { width, children } = props

    return (
        <div className={styles.container} style={{ width: width }}>
            <div>
                <Row justify="center" align="middle">
                    {Children.map(children, (child) => (
                        <Col span={24}>{child}</Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}
