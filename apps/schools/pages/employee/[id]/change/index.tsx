import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import { ChangeEmployeeForm } from '@domains/employee/components/changeEmployeeForm'

export const ChangeEmployee = () => {
    return (
        <>
            <Head>
                <title>Редактирование сотрудника</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <ChangeEmployeeForm />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default ChangeEmployee
