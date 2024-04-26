import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'

import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import { TicketList } from '@domains/ticket/components/ticketList'

const TicketsPageContent = () => {
    return (
        <>
            <Head>
                <title>Обращения</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <TicketList />
                </OrganizationRequired>
            </PageContent>
        </>
    )
}

export default TicketsPageContent
