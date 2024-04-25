import React from 'react'
import { Row, Typography } from 'antd'
import styles from './styles/styles.module.scss'
import { BackPageProps } from './interface'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { ArrowLeftOutlined } from '@ant-design/icons'

export const BackPage: React.FC<BackPageProps> = ({ className, path, onClick, text = 'Назад' }) => {
    const router = useRouter()

    const goBack = () => {
        path ? router.push(path) : router.back()
    }

    return (
        <div className={classNames(styles.backPage, className)} onClick={onClick || goBack}>
            <ArrowLeftOutlined />
            <Typography.Text className={styles.text}>{text}</Typography.Text>
        </div>
    )
}
