import React from 'react'
import { Typography } from 'antd'
import { format } from 'date-fns'
import { App } from '../../redux/interfaces'
import styles from '../appDetail/styles/styles.module.scss'

const { Title, Text } = Typography

interface AppDetailSidebarProps {
    app: App
}

const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
        published: 'Опубликовано',
        draft: 'Черновик',
        moderation: 'На модерации',
        rejected: 'Отклонено',
    }
    return statusMap[status] || status
}

export const AppDetailSidebar: React.FC<AppDetailSidebarProps> = ({ app }) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarCard}>
                <Title level={4} className={styles.sectionTitle}>
                    Информация
                </Title>
                <div className={styles.infoRow}>
                    <Text className={styles.infoLabel}>Тип:</Text>
                    <Text className={styles.infoValue}>
                        {app.type === 'internal' ? 'Внутреннее' : 'Внешнее'}
                    </Text>
                </div>
                <div className={styles.infoRow}>
                    <Text className={styles.infoLabel}>Статус:</Text>
                    <Text className={styles.infoValue}>{getStatusText(app.status)}</Text>
                </div>
                {app.latest_release && (
                    <>
                        <div className={styles.infoRow}>
                            <Text className={styles.infoLabel}>Версия:</Text>
                            <Text className={styles.infoValue}>{app.latest_release.version}</Text>
                        </div>
                        <div className={styles.infoRow}>
                            <Text className={styles.infoLabel}>Дата релиза:</Text>
                            <Text className={styles.infoValue}>
                                {format(new Date(app.latest_release.date), 'dd MMMM yyyy')}
                            </Text>
                        </div>
                    </>
                )}
                <div className={styles.infoRow}>
                    <Text className={styles.infoLabel}>Создано:</Text>
                    <Text className={styles.infoValue}>
                        {format(new Date(app.created_at), 'dd MMMM yyyy')}
                    </Text>
                </div>
            </div>
        </div>
    )
}

