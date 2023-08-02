import { Divider, Layout } from 'antd'

import React from 'react'

import styles from './styles/styles.module.scss'

import Menu from '../Menu'
import { Icon } from '../Icon'

import UserProfile from '../UserProfile'
import { IBaseLayoutProps } from './interfaces'
import { OrganizationSelect } from '../OrganizationSelect'
import { useLayoutContext } from '../../../../../user/providers/baseLayoutProvider'
import { COLLAPSED_DIVIDER_WIDTH, COLLAPSED_LAYOUT_WIDTH, DIVIDER_WIDTH, LAYOUT_WIDTH } from './styles/styles'

const { Content, Sider } = Layout

export const BaseLayout: React.FC<IBaseLayoutProps> = (props) => {
    const { isCollapsed, toggleCollapsed } = useLayoutContext()

    const { children } = props

    return (
        <>
            <Layout className={styles.placement}>
                <Sider
                    width={LAYOUT_WIDTH}
                    collapsedWidth={COLLAPSED_LAYOUT_WIDTH}
                    collapsed={isCollapsed}
                    className={styles.sliderStyle}
                    onCollapse={() => {
                        toggleCollapsed()
                    }}
                    theme='light'
                >
                    <Icon collapsed={isCollapsed ?? false} setCollapsed={toggleCollapsed} />
                    <div className={styles.menuScroll}>
                        <Menu />
                        <Divider
                            className={styles.divider}
                            style={isCollapsed ? { width: COLLAPSED_DIVIDER_WIDTH } : { width: DIVIDER_WIDTH }}
                        />
                        <OrganizationSelect collapsed={isCollapsed ?? false} />
                        <UserProfile />
                    </div>
                </Sider>
                <Sider collapsed={isCollapsed} width={LAYOUT_WIDTH} collapsedWidth={COLLAPSED_LAYOUT_WIDTH} />
                <Layout className={styles.siteLayout}>
                    <Content className={styles.content}>
                        <div className={styles.siteLayoutBackground}>{children}</div>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
