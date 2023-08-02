import { Menu } from 'antd'
import {
    BookOutlined,
    LineChartOutlined,
    ReadOutlined,
    RocketOutlined,
    SettingOutlined,
    SolutionOutlined,
    TeamOutlined,
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from './styles/styles.module.scss'

import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { MenuItemObj } from '../classes'
import {isOrganizationSelected, RulesDictionary} from "@domains/common/access/rules";

const menuList: MenuItemObj[] = [
    new MenuItemObj('analytics', 'Аналитика', <LineChartOutlined style={{ fontSize: '150%' }} />, [
        isOrganizationSelected,
    ]),
    new MenuItemObj('circles', 'Кружки', <RocketOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
    new MenuItemObj('students', 'Ученики', <ReadOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
    new MenuItemObj('queries', 'Заявки', <SolutionOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
    new MenuItemObj('employee', 'Сотрудники', <TeamOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
    new MenuItemObj('teachers', 'Учителя', <BookOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
    new MenuItemObj('settings', 'Настройки', <SettingOutlined style={{ fontSize: '150%' }} />, [
        isOrganizationSelected,
    ]),
]

const MenuCustom = () => {
    const router = useRouter()

    const [conditions, setConditions] = useState<RulesDictionary>({
        isOrganizationSelected: false,
    })
    const { organization } = useOrganization()

    useEffect(() => {
        setConditions({ isOrganizationSelected: organization.id !== undefined })
    }, [organization])

    return (
        <>
            <Menu
                className={styles.menu}
                theme='light'
                mode='inline'
                onClick={(e) => {
                    if (!router.asPath.includes(e.key)) {
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
