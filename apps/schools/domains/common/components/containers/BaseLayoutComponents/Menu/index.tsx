import { Menu } from 'antd'
import {
    BarChartOutlined,
    FileDoneOutlined,
    ReadOutlined,
    SlidersOutlined,
    TeamOutlined,
    UserAddOutlined,
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from './styles/styles.module.scss'

import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { MenuItemObj } from '../classes'
import { isOrganizationSelected, permanentDisabled, RulesDictionary } from '@domains/common/access/rules'

const menuList: MenuItemObj[] = [
    new MenuItemObj('analytics', 'Аналитика', <BarChartOutlined style={{ fontSize: '150%' }} />, [
        isOrganizationSelected,
        permanentDisabled,
    ]),
    new MenuItemObj('circle', 'Кружки', <ReadOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
    new MenuItemObj('student', 'Обучающиеся', <TeamOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
    new MenuItemObj('queries', 'Заявки', <FileDoneOutlined style={{ fontSize: '150%' }} />, [
        isOrganizationSelected,
        permanentDisabled,
    ]),
    new MenuItemObj('employee', 'Сотрудники', <UserAddOutlined style={{ fontSize: '150%' }} />, [
        isOrganizationSelected,
    ]),
    new MenuItemObj('settings', 'Настройки', <SlidersOutlined style={{ fontSize: '150%' }} />, [
        isOrganizationSelected,
        permanentDisabled,
    ]),
]

const MenuCustom = () => {
    const router = useRouter()

    const [conditions, setConditions] = useState<RulesDictionary>({
        isOrganizationSelected: false,
        permanentDisabled: false,
    })
    const { organization } = useOrganization()

    useEffect(() => {
        setConditions({ isOrganizationSelected: organization.id !== undefined, permanentDisabled: false })
    }, [organization])

    return (
        <>
            <Menu
                className={styles.menu}
                theme='light'
                mode='inline'
                onClick={(e) => {
                    if (!router.asPath.endsWith(e.key)) {
                        router.push(`/${e.key}`)
                    }
                }}
                selectedKeys={menuList
                    .filter((el) => router.asPath.includes(el.url) && !el.isDisabled(conditions))
                    .map((el) => el.url)}
            >
                {menuList.map((el) => (
                    <Menu.Item
                        disabled={el.isDisabled(conditions)}
                        key={el.url}
                        icon={el.icon}
                        className={styles.menuItem}
                    >
                        {el.name}
                    </Menu.Item>
                ))}
            </Menu>
        </>
    )
}

export default MenuCustom
