import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { ProfileInfo } from '@domains/user/components/profile/profileInfo'
import { BackPage } from '@domains/common/components/backPage'

const UserPage = () => {
    return (
        <>
            <Head>
                <title>Профиль</title>
            </Head>
            <PageContent>
                <div>
                    <BackPage />
                    <ProfileInfo />
                </div>
            </PageContent>
        </>
    )
}

export default UserPage
