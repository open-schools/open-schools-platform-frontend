import React from 'react';
import AddressForm from "@domains/circle/components/addressForm";
import Head from "next/head";
import {PageContent} from "@domains/common/components/containers/PageContent";
import {OrganizationRequired} from "@domains/common/components/containers/OrganizationRequired";

const Index = () => {
    return (
        <>
            <Head>
                <title>Добавление кружка</title>
            </Head>
            <PageContent>
                <OrganizationRequired>
                    <AddressForm />
                </OrganizationRequired>
            </PageContent>
        </>
    );
};

export default Index;