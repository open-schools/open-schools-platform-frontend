import { Menu } from 'antd'
import { FileDoneOutlined, MailOutlined, ReadOutlined, TeamOutlined, UserAddOutlined, AppstoreOutlined } from '@ant-design/icons'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import styles from './styles/styles.module.scss'

import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { MenuItemObj } from '../classes'
import { isOrganizationSelected, RulesDictionary } from '@domains/common/access/rules'

const { SubMenu } = Menu

const menuList: MenuItemObj[] = [
    new MenuItemObj('circle', 'Кружки', <ReadOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
    new MenuItemObj('student', 'Обучающиеся', <TeamOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
    new MenuItemObj('query', 'Заявки', <FileDoneOutlined style={{ fontSize: '150%' }} />, [isOrganizationSelected]),
    new MenuItemObj('employee', 'Сотрудники', <UserAddOutlined style={{ fontSize: '150%' }} />, [
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
    const [openKeys, setOpenKeys] = useState<string[]>([])
    const { organization } = useOrganization()

    useEffect(() => {
        setConditions({ isOrganizationSelected: organization.id !== undefined, permanentDisabled: false })
    }, [organization])

    useEffect(() => {
        if (router.asPath.includes('marketplace')) {
            setOpenKeys(['marketplace'])
        }
    }, [router.asPath])

    const { menuItems, selectedKeys } = useMemo(() => {
        const result = menuList.reduce<{
            menuItems: React.ReactNode[]
            selectedKeys: string[]
        }>(
            (acc, el) => {
                const isDisabled = el.isDisabled(conditions)
                acc.menuItems.push(
                    <Menu.Item disabled={isDisabled} key={el.url} icon={el.icon} className={styles.menuItem}>
                        {el.name}
                    </Menu.Item>,
                )
                if (!isDisabled && router.asPath.includes(el.url)) {
                    acc.selectedKeys.push(el.url)
                }
                return acc
            },
            { menuItems: [], selectedKeys: [] },
        )

        const isMarketplaceActive = router.asPath.includes('marketplace')
        const isMarketplaceDisabled = !conditions.isOrganizationSelected
        
        if (!isMarketplaceDisabled) {
            const marketplaceSubMenu = (
                <SubMenu key="marketplace" icon={<AppstoreOutlined style={{ fontSize: '150%' }} />} title="Маркетплейс">
                    <Menu.Item key="marketplace" className={styles.menuItem}>
                        Все приложения
                    </Menu.Item>
                    <Menu.Item key="marketplace?installed=true" className={styles.menuItem}>
                        Установленные
                    </Menu.Item>
                </SubMenu>
            )
            result.menuItems.push(marketplaceSubMenu)
            
            if (isMarketplaceActive) {
                const query = router.query
                if (query.installed === 'true') {
                    result.selectedKeys.push('marketplace?installed=true')
                } else {
                    result.selectedKeys.push('marketplace')
                }
            }
        }

        return result
    }, [conditions, router.asPath, router.query])

    const handleMenuClick = useCallback(
        (e: { key: string }) => {
            if (e.key === 'marketplace') {
                router.push('/marketplace')
            } else if (e.key === 'marketplace?installed=true') {
                router.push('/marketplace?installed=true')
            } else if (!router.asPath.endsWith(e.key)) {
                router.push(`/${e.key}`)
            }
        },
        [router],
    )

    const handleOpenChange = useCallback(
        (keys: string[]) => {
            setOpenKeys(keys)
        },
        [],
    )

    return (
        <Menu 
            className={styles.menu} 
            theme='light' 
            mode='inline' 
            onClick={handleMenuClick} 
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
        >
            {menuItems}
        </Menu>
    )
}

export default MenuCustom
