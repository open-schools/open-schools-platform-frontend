import { Divider, Layout } from 'antd'

import React, { useState } from 'react'

import styles from './styles/styles.module.scss'

import Menu from '../Menu'
import { Icon } from '../Icon'

import UserProfile from '../UserProfile'
import { IBaseLayoutProps } from './interfaces'
import {OrganizationSelect} from "../OrganizationSelect";
import {COLLAPSED_LAYOUT_WIDTH, LAYOUT_WIDTH} from "./constants";

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
                    <Icon
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                    />
                    <div className={styles.menuScroll}>
                        <Menu/>
                        <Divider className={styles.divider}/>
                        <OrganizationSelect collapsed={collapsed}/>
                        <UserProfile/>
                    </div>
                </Sider>
                <Sider
                    collapsed={collapsed}
                    width={LAYOUT_WIDTH}
                    collapsedWidth={COLLAPSED_LAYOUT_WIDTH}
                />
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
