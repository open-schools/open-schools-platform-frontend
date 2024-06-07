import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import { CurrentQuery } from '@domains/query/components/currentQuery'
import { BackPage } from '@domains/common/components/backPage'

const EmployeePageContent = () => {
    return (
        <>
            <Head>
                <title>Заявки</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <BackPage />
                    <CurrentQuery />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default EmployeePageContent
