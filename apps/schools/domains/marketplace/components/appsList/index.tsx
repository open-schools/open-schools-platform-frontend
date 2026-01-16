import React from 'react'
import { Spin, Pagination, Empty } from 'antd'
import { AppCard } from '../appCard'
import { App } from '../../redux/interfaces'
import styles from '../appCatalog/styles/styles.module.scss'

interface AppsListProps {
    apps: App[]
    isLoading: boolean
    page: number
    totalApps: number
    pageSize: number
    onPageChange: (page: number) => void
}

export const AppsList: React.FC<AppsListProps> = ({
    apps,
    isLoading,
    page,
    totalApps,
    pageSize,
    onPageChange,
}) => {
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <Spin size='large' />
            </div>
        )
    }

    if (apps.length === 0) {
        return (
            <div className={styles.emptyState}>
                <Empty
                    description={
                        <div>
                            <div className={styles.emptyTitle}>Приложения не найдены</div>
                            <div className={styles.emptyDescription}>
                                Попробуйте изменить параметры поиска или фильтры
                            </div>
                        </div>
                    }
                />
            </div>
        )
    }

    return (
        <>
            <div className={styles.appsGrid}>
                {apps.map((app: App) => (
                    <AppCard key={app.id} app={app} />
                ))}
            </div>

            {totalApps > pageSize && (
                <div className={styles.pagination}>
                    <Pagination
                        current={page}
                        total={totalApps}
                        pageSize={pageSize}
                        onChange={onPageChange}
                        showSizeChanger={false}
                        showTotal={(total, range) => `${range[0]}-${range[1]} из ${total} приложений`}
                    />
                </div>
            )}
        </>
    )
}

