import React from 'react'
import { Typography } from 'antd'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { App } from '../../redux/interfaces'
import styles from '../appDetail/styles/styles.module.scss'

const { Title, Text } = Typography

interface AppDetailSidebarProps {
    app: App
}

export const AppDetailSidebar: React.FC<AppDetailSidebarProps> = ({ app }) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarCard}>
                <Title level={4} className={styles.sectionTitle}>
                    Информация
                </Title>
                {app.latest_release && (
                    <>
                        <div className={styles.infoRow}>
                            <Text className={styles.infoLabel}>Версия:</Text>
                            <Text className={styles.infoValue}>{app.latest_release.version}</Text>
                        </div>
                        <div className={styles.infoRow}>
                            <Text className={styles.infoLabel}>Дата релиза:</Text>
                            <Text className={styles.infoValue}>
                                {format(new Date(app.latest_release.date), 'dd MMMM yyyy', { locale: ru })}
                            </Text>
                        </div>
                    </>
                )}
                <div className={styles.infoRow}>
                    <Text className={styles.infoLabel}>Создано:</Text>
                    <Text className={styles.infoValue}>
                        {format(new Date(app.created_at), 'dd MMMM yyyy', { locale: ru })}
                    </Text>
                </div>
                {app.category && (
                    <div className={styles.infoRow}>
                        <Text className={styles.infoLabel}>Категория:</Text>
                        <Text className={styles.infoValue}>
                            <span className={styles.categoryTag}>{app.category.name}</span>
                        </Text>
                    </div>
                )}
                {app.privacy_policy_url && (
                    <div className={styles.infoRow}>
                        <Text className={styles.infoLabel}>Документы:</Text>
                        <Text className={styles.infoValue}>
                            <a href={app.privacy_policy_url} target="_blank" rel="noreferrer" className={styles.link}>
                                Политика конфиденциальности
                            </a>
                        </Text>
                    </div>
                )}
                {app.eula_url && (
                    <div className={styles.infoRow}>
                        {/* Empty label for alignment if both exist, otherwise Documenty */}
                        <Text className={styles.infoLabel}>{app.privacy_policy_url ? '' : 'Документы:'}</Text>
                        <Text className={styles.infoValue}>
                            <a href={app.eula_url} target="_blank" rel="noreferrer" className={styles.link}>
                                Пользовательское соглашение
                            </a>
                        </Text>
                    </div>
                )}
            </div>
        </div>
    )
}

