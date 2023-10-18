import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useOrganization } from "@domains/organization/providers/organizationProvider";


const IndexPage = () => {
    const router = useRouter()
    const organization = useOrganization()

    useEffect(() => {
        router.push('/query')
    }, [organization, router])
    return <></>
}

export default IndexPage
