import React from 'react'
import Head from 'next/head'
import { PageContent } from '../../domains/common/components/containers/PageContent'
import { EmployeeList } from '../../domains/employee/components/employeeList'

const EmployeesPageContent = () => {
    return (
        <>
            <Head>
                <title>Сотрудники</title>
            </Head>
            <PageContent>
                <EmployeeList />
            </PageContent>
        </>
    )
}

export default EmployeesPageContent