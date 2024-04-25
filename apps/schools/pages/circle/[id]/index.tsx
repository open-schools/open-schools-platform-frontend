import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import CurrentCircle from '@domains/circle/components/currentCircle'
import { BackPage } from '@domains/common/components/backPage'

const CirclePageContent = () => {
    return (
        <>
            <Head>
                <title>Кружок</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <BackPage />
                    <CurrentCircle />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default CirclePageContent
