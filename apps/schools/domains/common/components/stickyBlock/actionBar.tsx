import { Affix, Space, Typography } from 'antd'
import React, { ReactElement } from 'react'

import styles from './styles/styles.module.scss'

export type ActionBarProps = {
    message?: string
    actions: [ReactElement, ...ReactElement[]]
}

export const ActionBar: React.FC<ActionBarProps> = (props) => {
    const { actions, message } = props

    return (
        <Affix offsetBottom={0} prefixCls={styles.affix}>
            <Space wrap size={[16, 16]} className={styles.content}>
                {message && <Typography.Text strong>{message}</Typography.Text>}
                {actions}
            </Space>
        </Affix>
    )
}
