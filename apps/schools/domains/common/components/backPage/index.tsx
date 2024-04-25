import React from 'react'
import { Typography } from 'antd'
import styles from './styles/styles.module.scss'
import { BackPageProps } from './interface'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { ArrowLeftOutlined } from '@ant-design/icons'

export const BackPage: React.FC<BackPageProps> = ({ className, path, onClick, text = 'Назад', returnable = false }) => {
    const router = useRouter()
    const { back } = router.query

    if (!(typeof window !== 'undefined') || window.history.length <= 1 || (!back && returnable)) {
        return <div className={classNames(styles.emptyBackPage, className)}></div>
    }

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
