import styles from './styles/styles.module.scss'

import React from 'react'
import { useRouter } from 'next/router'
import { MenuItemObj } from '../classes'
import { UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'

const menuList: MenuItemObj[] = [
    new MenuItemObj(
        'user',
        'Профиль',
        <UserOutlined style={{ fontSize: '150%' }} />,
        []
    ),
]

const UserProfile = () => {
    const router = useRouter()

    return (
        <>
            <Menu
                style={{ width: '100%' }}
                className={styles.menu}
                theme="light"
                mode="inline"
                onClick={(e) => {
                    if (!router.asPath.includes(e.key)) {
                        router.push(`/${e.key}`)
                    }
                }}
                selectedKeys={menuList
                    .filter((el) => router.asPath.includes(el.url))
                    .map((el) => el.url)}
            >
                {menuList.map((el) => (
                    <Menu.Item
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

export default UserProfile
