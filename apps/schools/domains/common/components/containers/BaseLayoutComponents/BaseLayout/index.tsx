import { Divider, Layout } from 'antd'

import React from 'react'

import styles from './styles/styles.module.scss'

import Menu from '../Menu'
import { Icon } from '../Icon'

import UserProfile from '../UserProfile'
import { IBaseLayoutProps } from './interfaces'
import { OrganizationSelect } from '../OrganizationSelect'
import { useLayoutContext } from '@domains/user/providers/baseLayoutProvider'
import { COLLAPSED_DIVIDER_WIDTH, COLLAPSED_LAYOUT_WIDTH, DIVIDER_WIDTH, LAYOUT_WIDTH } from './styles/styles'
import { StatusesEnum } from '@domains/common/constants/Enums'
import Image from 'next/image'
import ExclamationCircleOutlined from '@public/icons/ExclamationCircleOutlined.svg'
import { Button } from '@domains/common/components/button'
import { handleChangeStatusInvitation } from '@domains/common/handlers/changeStatusInvitation'
import { useChangeStatusMutation } from '@domains/query/redux/queryApi'
import { useGetInvitationsQuery } from '@domains/employee/redux/employeeApi'
import { EventKey, useEventBus } from '@domains/common/providers/eventBusProvider'

const { Content, Sider } = Layout

export const BaseLayout: React.FC<IBaseLayoutProps> = (props) => {
    const { children } = props
    const { emit } = useEventBus()

    const { isCollapsed, toggleCollapsed } = useLayoutContext()
    const { data: invitations, refetch } = useGetInvitationsQuery({})
    const [mutation] = useChangeStatusMutation()

    return (
        <>
            <Layout className={styles.placement}>
                <div className={styles.invitationsContainer}>
                    {invitations?.results.map((invite) => {
                        if (invite.status === StatusesEnum.SENT || invite.status === StatusesEnum.IN_PROGRESS) {
                            return (
                                <div className={styles.inviteContainer} key={invite.id}>
                                    <div className={styles.leftContainer}>
                                        <Image src={ExclamationCircleOutlined} alt={'exclamation circle outlined'} />
                                        <div>Вас пригласили в организацию “{invite.sender.name}”</div>
                                    </div>
                                    <div className={styles.rightContainer}>
                                        <Button
                                            className={styles.acceptButton}
                                            onClick={() =>
                                                handleChangeStatusInvitation(
                                                    mutation,
                                                    invite.id,
                                                    StatusesEnum.ACCEPTED,
                                                ).then(() => {
                                                    refetch()
                                                    emit(EventKey.RefetchOrganizationsQuery)
                                                })
                                            }
                                        >
                                            Принять
                                        </Button>
                                        <Button
                                            className={styles.rejectedButton}
                                            onClick={() =>
                                                handleChangeStatusInvitation(
                                                    mutation,
                                                    invite.id,
                                                    StatusesEnum.DECLINED,
                                                ).then(refetch)
                                            }
                                        >
                                            Отклонить
                                        </Button>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
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
