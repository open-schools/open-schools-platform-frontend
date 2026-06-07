import React from 'react'
import { Typography, Rate, Button } from 'antd'
import { DownloadOutlined, DeleteOutlined, PlayCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'
import router from 'next/router'
import { App } from '../../redux/interfaces'
import styles from '../appDetail/styles/styles.module.scss'


const { Title, Text } = Typography

interface AppDetailHeaderProps {
    app: App
    isInstalling: boolean
    isUninstalling: boolean
    isInstalled: boolean
    viewMode?: 'store' | 'app'
    onViewModeChange?: (mode: 'store' | 'app') => void
    onInstall: () => void
    onUninstall: () => void
}

export const AppDetailHeader: React.FC<AppDetailHeaderProps> = ({ 
    app, 
    isInstalling, 
    isUninstalling,
    isInstalled,
    viewMode,
    onViewModeChange,
    onInstall,
    onUninstall 
}) => {
    return (
        <div className={styles.header}>
            <div className={styles.iconSection}>
                {app.icon_url ? (
                    <img src={app.icon_url} alt={app.name} className={styles.largeIcon} />
                ) : (
                    <div className={styles.largeIcon} />
                )}
            </div>

            <div className={styles.infoSection}>
                <Title level={1} className={styles.title}>
                    {app.name}
                </Title>

                {app.DeveloperProfile?.email && (
                    <Text className={styles.developer}>Разработчик: {app.DeveloperProfile.email}</Text>
                )}

                <div className={styles.ratingSection}>
                    {app.average_rating !== undefined && (
                        <div className={styles.rating}>
                            <Rate disabled value={app.average_rating} allowHalf style={{ fontSize: 20 }} />
                            <Text strong>{app.average_rating.toFixed(1)}</Text>
                            <Text type='secondary'>({app.reviews_count || 0} отзывов)</Text>
                        </div>
                    )}
                </div>

                {app.Category && app.Category.length > 0 && (
                    <div className={styles.categories}>
                        {app.Category.map((category) => (
                            <span key={category.id} className={styles.categoryTag}>
                                {category.name}
                            </span>
                        ))}
                    </div>
                )}

                <div className={styles.actions}>
                    {isInstalled ? (
                        <>
                            {(app.app_url || app.latest_release?.manifest?.entry || app.latest_published_release?.manifest?.entry) ? (
                                viewMode === 'app' ? (
                                    <Button
                                        type='default'
                                        size='large'
                                        className={styles.installButton}
                                        onClick={() => onViewModeChange?.('store')}
                                    >
                                        В магазин
                                    </Button>
                                ) : (
                                    <Button
                                        type='primary'
                                        size='large'
                                        icon={<PlayCircleOutlined />}
                                        className={styles.installButton}
                                        onClick={() => onViewModeChange?.('app')}
                                    >
                                        Открыть
                                    </Button>
                                )
                            ) : (
                                <Button
                                    type='default'
                                    size='large'
                                    icon={<CheckOutlined />}
                                    className={styles.installButton}
                                    disabled
                                >
                                    Уже установлено
                                </Button>
                            )}
                            <Button
                                danger
                                size='large'
                                icon={<DeleteOutlined />}
                                loading={isUninstalling}
                                onClick={onUninstall}
                            >
                                Удалить
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                type='primary'
                                size='large'
                                icon={<DownloadOutlined />}
                                className={styles.installButton}
                                loading={isInstalling}
                                onClick={onInstall}
                            >
                                Установить
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

