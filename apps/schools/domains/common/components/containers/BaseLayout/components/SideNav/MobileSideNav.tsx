import { Layout } from 'antd'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'

import styles from '../../styles/styles.module.scss'

// import { OrganizationSelect } from '@condo/domains/organization/components/OrganizationSelect'
import {Close} from "../../../../Icons/Close";
import {useLayoutContext} from "../../BaseLayout";

interface ISideNavProps {
    menuData?: React.ElementType
}

export const MobileSideNav: React.FC<ISideNavProps> = (props) => {
    const { menuData } = props
    const { toggleCollapsed, isCollapsed } = useLayoutContext()
    const router = useRouter()

    const hideSideNav = useCallback(() => {
        if (!isCollapsed) {
            toggleCollapsed()
        }
    }, [isCollapsed])

    useEffect(() => {
        router.events.on('routeChangeComplete', hideSideNav)

        return () => {
            router.events.off('routeChangeComplete', hideSideNav)
        }
    }, [router])

    return (
        <Layout.Sider
            collapsed={isCollapsed}
            theme='light'
            className='menu mobile-menu'
            width='100%'
            collapsedWidth={0}
        >
            <div className={styles.mobileSideNavHeader}>
                <Close size='medium' onClick={toggleCollapsed}/>
                <div className={styles.organizationSelectWrapper}>
                    {/*<OrganizationSelect/>*/}
                </div>
            </div>
            <div className={styles.mobileMenuItemsContainer}>
                {menuData}
            </div>
        </Layout.Sider>
    )
}
