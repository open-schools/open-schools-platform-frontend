import { Tabs } from 'antd'
import Router from 'next/router'
import React from 'react'

import styles from './styles/styles.module.scss'
import { ITabsActionsProps } from './interfaces'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

export const TabsAuthAction: React.FC<ITabsActionsProps> = (props) => {
    const { currentActiveKey, title } = props

    const registerTab = 'Регистрация'
    const signInTab = 'Вход'

    return (
        <div className={`${styles.removeTabLine} ${styles.removeSelectedLine}`}>
            <Tabs
                defaultActiveKey={currentActiveKey}
                onChange={(activeKey) => Router.push(activeKey)}
                centered
                animated={false}
                size={'large'}
            >
                {title ? (
                    <>
                        <Tabs.TabPane tab={title} />
                    </>
                ) : (
                    <>
                        <Tabs.TabPane key={`${RoutePath[AppRoutes.AUTH_REGISTER]}?step=inputPhone`} tab={registerTab} />
                        <Tabs.TabPane key={RoutePath[AppRoutes.AUTH_SIGN_IN]} tab={signInTab} />
                    </>
                )}
            </Tabs>
        </div>
    )
}
