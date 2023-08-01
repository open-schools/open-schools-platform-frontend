import { Divider, Layout } from 'antd'

import React, { useState } from 'react'

import styles from './styles/styles.module.scss'

import Menu from '../Menu'
import { Icon } from '../Icon/Icon'
import OrganizationSelect from '../OrganizationSelect'
import UserProfile from '../UserProfile'
import {
    COLLAPSED_LAYOUT_WIDTH,
    LAYOUT_WIDTH,
} from '../../../../constants/BaseLayout'
import { IBaseLayoutProps } from './interfaces'

const { Content, Sider } = Layout

export const BaseLayout: React.FC<IBaseLayoutProps> = (props) => {
    const [collapsed, setCollapsed] = useState(false)

    const { children } = props

    return (
        <>
            <Layout className={styles.placement}>
                <Sider
                    width={LAYOUT_WIDTH}
                    collapsedWidth={COLLAPSED_LAYOUT_WIDTH}
                    collapsed={collapsed}
                    className={styles.sliderStyle}
                    onCollapse={() => {
                        setCollapsed((state) => !state)
                    }}
                    theme="light"
                >
                    <Icon collapsed={collapsed} setCollapsed={setCollapsed} />
                    <Menu />
                    <Divider className={styles.divider} />
                    <OrganizationSelect />
                    <UserProfile />
                </Sider>
                <Layout className={styles.siteLayout}>
                    <Content className={styles.content}>
                        <div className={styles.siteLayoutBackground}>
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
