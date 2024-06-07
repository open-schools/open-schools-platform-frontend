import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'

import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import { StudentList } from '@domains/student/components/studentList'

const EmployeesPageContent = () => {
    return (
        <>
            <Head>
                <title>Обучающиеся</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <StudentList />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default EmployeesPageContent
