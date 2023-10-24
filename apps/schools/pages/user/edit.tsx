import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { ProfileEdit } from 'domains/user/components/profile/profileEdit'

const UserPage = () => {
    return (
        <>
            <Head>
                <title>Редактирование профиля</title>
            </Head>
            <PageContent>
                <ProfileEdit />
            </PageContent>
        </>
    )
}

export default UserPage
