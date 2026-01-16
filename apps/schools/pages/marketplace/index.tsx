import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import { AppCatalog } from '@domains/marketplace/components/appCatalog'

const MarketplacePage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Каталог приложений</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                <AppCatalog />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default MarketplacePage

