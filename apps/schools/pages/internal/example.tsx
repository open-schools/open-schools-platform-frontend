import React from 'react'
import Head from 'next/head'
import { Typography, Card } from 'antd'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import { InternalModuleGuard } from '@domains/marketplace/components/internalModuleGuard'

const { Title, Paragraph } = Typography

const ExampleModulePage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Модуль Example</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <InternalModuleGuard entry="/internal/example">
                        <Card style={{ margin: '24px', textAlign: 'center' }}>
                            <Title level={2}>Модуль Example работает</Title>
                            <Paragraph>
                                Это тестовый модуль для проверки системы установки внутренних приложений.
                            </Paragraph>
                            <Paragraph>
                                Модуль успешно установлен и готов к работе!
                            </Paragraph>
                        </Card>
                    </InternalModuleGuard>
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default ExampleModulePage
