import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import CurrentStudent from 'domains/student/components/currentStudent'

const CirclePageContent = () => {
    return (
        <>
            <Head>
                <title>Обучающийся</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <CurrentStudent />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default CirclePageContent
