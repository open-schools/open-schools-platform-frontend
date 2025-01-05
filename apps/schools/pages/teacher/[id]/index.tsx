import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import CurrentTeacher from '@domains/employee/components/currentTeacher'
import { BackPage } from '@domains/common/components/backPage'

const TeacherPageContent = () => {
    return (
        <>
            <Head>
                <title>Преподаватели</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <BackPage />
                    <CurrentTeacher />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default TeacherPageContent
