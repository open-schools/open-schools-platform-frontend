import { Col, Row } from 'antd'
import React from 'react'

import { Card } from '..'
import data from '@public/meta.json'

export const Cards: React.FC = () => {
    return (
        <Row style={{ flex: 1 }}>
            {(data?.plugins ?? []).map((plugin) => (
                <Col md={6} key={plugin.name} data-testid="container">
                    <Card title={plugin.name}>{plugin.description}</Card>
                </Col>
            ))}
        </Row>
    )
}
