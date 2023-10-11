import React from 'react'
import Head from "next/head";
import {PageContent} from "@domains/common/components/containers/PageContent";
import {ProfileInfo} from "@domains/user/components/profile/profileInfo";

const UserPage = () => {
    return <>
        <Head>
            <title>Профиль</title>
        </Head>
        <PageContent>
            <ProfileInfo/>
        </PageContent>
    </>
}

export default UserPage
