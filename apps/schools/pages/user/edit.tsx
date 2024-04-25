import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { ProfileEdit } from 'domains/user/components/profile/profileEdit'
import { BackPage } from '@domains/common/components/backPage'

const UserPage = () => {
    return (
        <>
            <Head>
                <title>Редактирование профиля</title>
            </Head>
            <PageContent>
                <div>
                    <BackPage />
                    <ProfileEdit />
                </div>
            </PageContent>
        </>
    )
}

export default UserPage
