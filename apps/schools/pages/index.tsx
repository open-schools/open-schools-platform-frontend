import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

const IndexPage = () => {
    const router = useRouter()
    const organization = useOrganization()

    useEffect(() => {
        router.push(RoutePath[AppRoutes.QUERY_LIST])
    }, [organization, router])
    return <></>
}

export default IndexPage
