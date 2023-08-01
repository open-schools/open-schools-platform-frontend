import React from 'react'
import { useOrganization } from '../../../user/providers/organizationProvider'
import { Spin } from 'antd'

interface OrganizationRequiredProps {
    children: React.ReactNode;
}

export const OrganizationRequired: React.FC<OrganizationRequiredProps> = ({ children }) => {
    let pageView = children
    const { organizationId } = useOrganization()

    if (organizationId === null || organizationId === '') {
        pageView = <Spin tip="Loading" size="large">
            <div />
        </Spin>
    }

    return (
        <>
            {pageView}
        </>
    )
}
