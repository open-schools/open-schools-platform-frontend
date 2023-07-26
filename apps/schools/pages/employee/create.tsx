import React from 'react'
import Head from 'next/head'
import { Col, Row, Typography } from 'antd'
import { PageContent } from '../../domains/common/components/containers/PageContent'
import { CreateEmployeeForm } from '../../domains/employee/components/createEmployeeForm'

export const Create = () => {
    return (
        <>
            <Head>
                <title>Добавление Сотрудника</title>
            </Head>
            <PageContent>
                <Row gutter={[12, 40]}>
                    <Col span={24}>
                        <Typography.Title level={1}>Добавление Сотрудника</Typography.Title>
                    </Col>
                    <Col span={24}>
                        <CreateEmployeeForm />
                    </Col>
                </Row>
            </PageContent>
        </>
    )
}

export default Create
