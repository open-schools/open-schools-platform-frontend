import React from 'react'

import { DownOutlined, UpOutlined } from '@ant-design/icons'
import styles from './styles/styles.module.scss'

const COLLAPSED_SUFFIX_ICON = { fontSize: '125%' }

export interface SuffixIconProps {
    collapsed: boolean
    isOpen: boolean
}

export const SuffixIcon: React.FC<SuffixIconProps> = (props) => {
    const { collapsed, isOpen } = props

    return (
        <div className={styles.suffixIcon} style={collapsed ? COLLAPSED_SUFFIX_ICON : {}}>
            {isOpen ? <UpOutlined /> : <DownOutlined />}
        </div>
    )
}
