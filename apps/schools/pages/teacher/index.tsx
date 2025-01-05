import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { EmployeeList } from '@domains/employee/components/employeeList'
import {
    OrganizationRequired,
} from '@domains/common/components/containers/OrganizationRequired'

const EmployeesPageContent = () => {
    return (
        <>
            <Head>
                <title>Сотрудники</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <EmployeeList/>
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default EmployeesPageContent
