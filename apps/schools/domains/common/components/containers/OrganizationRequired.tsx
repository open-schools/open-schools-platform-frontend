import React from 'react'
import { Spin } from 'antd'
import { useOrganization } from '@domains/organization/providers/organizationProvider'

interface OrganizationRequiredProps {
    children: React.ReactNode
}

export const OrganizationRequired: React.FC<OrganizationRequiredProps> = ({ children }) => {
    let pageView = children
    const { organizationId } = useOrganization()

    if (organizationId === null || organizationId === '') {
        pageView = (
            <Spin tip='Loading' size='large'>
                <div />
            </Spin>
        )
    }

    return <>{pageView}</>
}
