import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import { CreateCircleForm } from '@domains/circle/components/createCircleForm'
import { BackPage } from '@domains/common/components/backPage'

export const Create = () => {
    return (
        <>
            <Head>
                <title>Добавление кружка</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <BackPage />
                    <CreateCircleForm />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default Create
