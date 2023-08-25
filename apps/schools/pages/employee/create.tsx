import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { CreateEmployeeForm } from '@domains/employee/components/createEmployeeForm'
import {
    OrganizationRequired,
} from '@domains/common/components/containers/OrganizationRequired'

export const Create = () => {
    return (
        <>
            <Head>
                <title>Добавление сотрудника</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <CreateEmployeeForm />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default Create
