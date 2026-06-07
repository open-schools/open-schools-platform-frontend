import React from 'react'
import { Typography, Rate, Button } from 'antd'
import { DownloadOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { App } from '../../redux/interfaces'
import styles from './styles/styles.module.scss'
import router from 'next/router'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'
import { useAppDetail } from '../../hooks/useAppDetail'
import { ConsentModal } from '../consentModal'

interface AppCardProps {
    app: App
}

const { Title, Text } = Typography

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
    const { 
        isInstalling, 
        isInstalled,
        handleInstall: baseHandleInstall,
        isConsentModalOpen,
        setIsConsentModalOpen,
        handleConfirmInstall,
    } = useAppDetail(app.id)

    const entry = app.app_url || app.latest_published_release?.manifest?.entry || app.latest_release?.manifest?.entry

    const handleClick = () => {
        router.push(`${RoutePath[AppRoutes.MARKETPLACE]}/${app.id}`)
    }

    const handleInstall = (e: React.MouseEvent) => {
        e.stopPropagation()
        baseHandleInstall()
    }

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (entry) {
            router.push(entry)
        }
    }

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.header}>
                {app.icon_url ? (
                    <img src={app.icon_url} alt={app.name} className={styles.icon} />
                ) : (
                    <div className={styles.icon} />
                )}
                <div className={styles.titleSection}>
                    <Title level={4} className={styles.title}>
                        {app.name}
                    </Title>
                    {app.DeveloperProfile?.email && (
                        <Text className={styles.developer}>{app.DeveloperProfile.email}</Text>
                    )}
                    <div className={styles.rating}>
                        <Rate disabled value={app.average_rating || 0} allowHalf style={{ fontSize: 14 }} />
                        <Text style={{ marginLeft: 4 }}>({app.reviews_count || 0})</Text>
                    </div>
                </div>
            </div>

            {app.description && <Text className={styles.description}>{app.description}</Text>}

            {app.Category && app.Category.length > 0 && (
                <div className={styles.categories}>
                    {app.Category.map((category) => (
                        <span key={category.id} className={styles.categoryTag}>
                            {category.name}
                        </span>
                    ))}
                </div>
            )}

            <div className={styles.footer}>
                <div className={styles.footerLeft}>
                </div>
                <div className={styles.actions}>
                    {isInstalled ? (
                        entry ? (
                            <Button
                                type="primary"
                                size="small"
                                icon={<PlayCircleOutlined />}
                                onClick={handleOpen}
                            >
                                Открыть
                            </Button>
                        ) : null
                    ) : (
                        <Button
                            type="primary"
                            size="small"
                            icon={<DownloadOutlined />}
                            loading={isInstalling}
                            onClick={handleInstall}
                        >
                            Установить
                        </Button>
                    )}
                </div>
            </div>
            
            <div onClick={(e) => e.stopPropagation()}>
                <ConsentModal
                    visible={isConsentModalOpen}
                    app={app}
                    isInstalling={isInstalling}
                    onClose={() => setIsConsentModalOpen(false)}
                    onConfirm={handleConfirmInstall}
                />
            </div>
        </div>
    )
}