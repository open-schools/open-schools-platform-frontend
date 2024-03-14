import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import CurrentEmployee from '@domains/employee/components/currentEmployee'

const EmployeePageContent = () => {
    return (
        <>
            <Head>
                <title>Сотрудник</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <CurrentEmployee />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default EmployeePageContent
