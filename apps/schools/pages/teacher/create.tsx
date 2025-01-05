import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { CreateTeacherForm } from '@domains/teachers/components/createTeacherForm'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import { BackPage } from '@domains/common/components/backPage'

export const Create = () => {
    return (
        <>
            <Head>
                <title>Добавление преподавателя</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <BackPage />
                    <CreateTeacherForm />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default Create
