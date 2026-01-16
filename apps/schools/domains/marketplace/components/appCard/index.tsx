import React from 'react'
import { Typography, Rate, Button, message } from 'antd'
import { DownloadOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { App } from '../../redux/interfaces'
import styles from './styles/styles.module.scss'
import router from 'next/router'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'
import { useCheckAppInstallationQuery, useInstallAppMutation } from '../../redux/marketplaceApi'
import { useOrganization } from '@domains/organization/providers/organizationProvider'

interface AppCardProps {
    app: App
}

const { Title, Text } = Typography

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
    const { organizationId } = useOrganization()
    const [installApp, { isLoading: isInstalling }] = useInstallAppMutation()
    
    const { data: installation } = useCheckAppInstallationQuery(
        { 
            app_id: app.id,
            organization_id: organizationId || '' 
        },
        { skip: !organizationId || !app.id }
    )
    
    const isInstalled = !!installation
    const entry = app.latest_published_release?.manifest?.entry || app.latest_release?.manifest?.entry

    const handleClick = () => {
        router.push(`${RoutePath[AppRoutes.MARKETPLACE]}/${app.id}`)
    }

    const handleInstall = async (e: React.MouseEvent) => {
        e.stopPropagation()
        
        if (!organizationId) {
            message.error('Организация не выбрана')
            return
        }

        try {
            await installApp({
                app: app.id,
                organization: organizationId,
            }).unwrap()
            message.success('Приложение успешно установлено!')
        } catch (err: any) {
            const errorMessage = err?.data?.error?.message || ''
            const violations = err?.data?.error?.violations || []
            
            if (violations.includes('unique') || errorMessage.includes('unique') || errorMessage.includes('already installed')) {
                message.warning('Это приложение уже установлено для данной организации')
            } else {
                message.error(errorMessage || 'Ошибка при установке приложения')
            }
        }
    }

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (entry) {
            router.push(entry)
        }
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
                    {app.rating !== undefined && (
                        <div className={styles.rating}>
                            <Rate disabled value={app.rating} allowHalf style={{ fontSize: 14 }} />
                            <Text>({app.reviews_count || 0})</Text>
                        </div>
                    )}
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
                    <div className={styles.footerInfo}>
                        <span className={`${styles.status} ${styles[app.status]}`}>
                            {getStatusText(app.status)}
                        </span>
                        <Text type='secondary' className={styles.type}>
                            {app.type === 'internal' ? 'Внутреннее' : 'Внешнее'}
                        </Text>
                    </div>
                </div>
                <div className={styles.actions}>
                    {isInstalled ? (
                        app.type === 'internal' && entry ? (
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
        </div>
    )
}

