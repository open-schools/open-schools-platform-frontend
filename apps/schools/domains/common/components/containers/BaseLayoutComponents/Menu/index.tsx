import { Menu } from 'antd'
import { FileDoneOutlined, MailOutlined, ReadOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import styles from './styles/styles.module.scss'

import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { MenuItemObj } from '../classes'
import { isOrganizationSelected, RulesDictionary } from '@domains/common/access/rules'

const menuList: MenuItemObj[] = [
    new MenuItemObj('circle', 'Кружки', <ReadOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
    new MenuItemObj('student', 'Обучающиеся', <TeamOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
    new MenuItemObj('query', 'Заявки', <FileDoneOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
    new MenuItemObj('employee', 'Сотрудники', <UserAddOutlined style={{ fontSize: '150%' }} />, [
        isOrganizationSelected,
    ]),
    new MenuItemObj('teacher', 'Преподаватели', <UserAddOutlined style={{ fontSize: '150%' }} />, [
        isOrganizationSelected,
    ]),
    new MenuItemObj('ticket', 'Обращения', <MailOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
]

const MenuCustom: React.FC = () => {
    const router = useRouter()

    const [conditions, setConditions] = useState<RulesDictionary>({
        isOrganizationSelected: false,
        permanentDisabled: false,
    })
    const { organization } = useOrganization()

    useEffect(() => {
        setConditions({ isOrganizationSelected: organization.id !== undefined, permanentDisabled: false })
    }, [organization])

    const { menuItems, selectedKeys } = useMemo(() => {
        return menuList.reduce<{
            menuItems: React.ReactNode[]
            selectedKeys: string[]
        }>(
            (result, el) => {
                const isDisabled = el.isDisabled(conditions)
                result.menuItems.push(
                    <Menu.Item disabled={isDisabled} key={el.url} icon={el.icon} className={styles.menuItem}>
                        {el.name}
                    </Menu.Item>,
                )
                if (!isDisabled && router.asPath.includes(el.url)) {
                    result.selectedKeys.push(el.url)
                }
                return result
            },
            { menuItems: [], selectedKeys: [] },
        )
    }, [conditions, router.asPath])

    const handleMenuClick = useCallback(
        (e: { key: string }) => {
            if (!router.asPath.endsWith(e.key)) {
                router.push(`/${e.key}`)
            }
        },
        [router],
    )

    return (
        <Menu className={styles.menu} theme='light' mode='inline' onClick={handleMenuClick} selectedKeys={selectedKeys}>
            {menuItems}
        </Menu>
    )
}

export default MenuCustom
