import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'

import {
    OrganizationRequired,
} from '@domains/common/components/containers/OrganizationRequired'
import {QueryList} from "@domains/query/components/queryList";

const QueriesPage = () => {
    return (
        <>
            <Head>
                <title>Заявки</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <QueryList/>
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default QueriesPage
