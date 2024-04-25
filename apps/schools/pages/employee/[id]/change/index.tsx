import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import { ChangeEmployeeForm } from '@domains/employee/components/changeEmployeeForm'
import { BackPage } from '@domains/common/components/backPage'

export const ChangeEmployee = () => {
    return (
        <>
            <Head>
                <title>Редактирование сотрудника</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <BackPage />
                    <ChangeEmployeeForm />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default ChangeEmployee
