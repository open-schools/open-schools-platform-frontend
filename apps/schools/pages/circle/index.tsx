import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'

import {
    OrganizationRequired,
} from '@domains/common/components/containers/OrganizationRequired'
import {CircleList} from "@domains/circle/components/circleList";

const CirclesPageContent = () => {
    return (
        <>
            <Head>
                <title>Кружки</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <CircleList/>
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default CirclesPageContent
