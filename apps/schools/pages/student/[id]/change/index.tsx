import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import { ChangeStudentForm } from '@domains/student/components/changeStudentForm'
import { BackPage } from '@domains/common/components/backPage'

export const ChangeStudent = () => {
    return (
        <>
            <Head>
                <title>Редактирование обучающегося</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <BackPage />
                    <ChangeStudentForm />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default ChangeStudent
