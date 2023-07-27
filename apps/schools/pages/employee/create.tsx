import React from 'react'
import Head from 'next/head'
import { PageContent } from '../../domains/common/components/containers/PageContent'
import { CreateEmployeeForm } from '../../domains/employee/components/createEmployeeForm'

export const Create = () => {
    return (
        <>
            <Head>
                <title>Добавление Сотрудника</title>
            </Head>
            <PageContent>
                <CreateEmployeeForm />
            </PageContent>
        </>
    )
}

export default Create
