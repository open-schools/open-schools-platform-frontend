import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import { AppDetail } from '@domains/marketplace/components/appDetail'

const AppDetailPage: React.FC = () => {
    const router = useRouter()
    const { appId } = router.query

    if (!appId || typeof appId !== 'string') {
        return null
    }

    return (
        <>
            <Head>
                <title>Приложение</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                <AppDetail appId={appId} />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default AppDetailPage

