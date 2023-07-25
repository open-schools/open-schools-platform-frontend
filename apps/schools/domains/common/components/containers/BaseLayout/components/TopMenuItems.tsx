import { Space } from 'antd'
import React from 'react'

// import { OrganizationSelect } from '@condo/domains/organization/components/OrganizationSelect'
// import { UserMenu } from '@condo/domains/user/components/UserMenu'

export interface ITopMenuItemsProps {
    headerAction?: React.ElementType
}

export const TopMenuItems: React.FC<ITopMenuItemsProps> = (props) => {
    // const auth = useAuth()
    // const { isLoading } = useOrganization()
    //
    // if (!isLoading && !auth.isLoading) {
        return (
            <>
                {props.headerAction && props.headerAction}
                <Space direction='horizontal' size={40} style={{ marginLeft: 'auto' }}>
                    {/*<OrganizationSelect/>*/}
                    {/*<UserMenu/>*/}
                </Space>
            </>
        )
    // }
    // return null
}
