import React from 'react'
import Head from 'next/head'
import { BackPage } from '@domains/common/components/backPage'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import CurrentTicket from '@domains/ticket/components/currentTicket'

const TicketPageContent = () => {
    return (
        <>
            <Head>
                <title>Обращение</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <BackPage />
                    <CurrentTicket />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default TicketPageContent
