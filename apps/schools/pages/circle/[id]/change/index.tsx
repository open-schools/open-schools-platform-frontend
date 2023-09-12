import React from 'react'
import Head from 'next/head'
import { PageContent } from '@domains/common/components/containers/PageContent'
import { OrganizationRequired } from '@domains/common/components/containers/OrganizationRequired'
import {ChangeCircleForm} from "@domains/circle/components/changeCircleForm";

export const Change = () => {
  return (
      <>
        <Head>
          <title>Редактирование кружка</title>
        </Head>
        <PageContent>
          <OrganizationRequired>
            <ChangeCircleForm />
          </OrganizationRequired>
        </PageContent>
      </>
  )
}

export default Change
