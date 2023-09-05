import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import { CreateCircleForm } from '@domains/circle/components/createCircleForm'

export const Create = () => {
    return (
        <>
            <Head>
                <title>Добавление кружка</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <CreateCircleForm />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default Create
