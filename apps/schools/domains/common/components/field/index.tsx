import styles from './styles/styles.module.scss'
import { Col, Row } from 'antd'
import React from 'react'
import { FieldProps } from './interface'

export const Field = (props: FieldProps) => {
    const { fieldName, fieldValue = undefined, defaultValue, type = 'right' } = props

    let lgxs

    if (type === 'left') {
        lgxs = 14
    } else if (type === 'center') {
        lgxs = 12
    } else {
        lgxs = 10
    }

    if (!fieldValue && !defaultValue) {
        return null
    }

    return (
        <Row gutter={[0, 24]} className={styles.itemContainer}>
            <Col className={styles.fieldName} lg={lgxs} xs={lgxs}>
                {fieldName}
            </Col>
            <Col className={styles.fieldValue} lg={24 - lgxs} xs={24 - lgxs}>
                {fieldValue ?? defaultValue}
            </Col>
        </Row>
    )
}
