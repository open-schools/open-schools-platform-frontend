import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'

import {
    OrganizationRequired,
} from '@domains/common/components/containers/OrganizationRequired'
import {CreateStudentForm} from "@domains/student/components/createStudentForm";

export const Create = () => {
    return (
        <>
            <Head>
                <title>Добавление студента</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <CreateStudentForm />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default Create
