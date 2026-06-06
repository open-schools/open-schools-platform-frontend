import React from 'react'
import { Typography, Spin, Button } from 'antd'
import { useGetAppQuery, useGetAppReviewsQuery } from '../../redux/marketplaceApi'
import { BackPage } from '@domains/common/components/backPage'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'
import { useAppDetail } from '../../hooks/useAppDetail'
import { AppDetailHeader } from '../appDetailHeader'
import { AppDetailContent } from '../appDetailContent'
import { AppDetailSidebar } from '../appDetailSidebar'
import { AppReviews } from '../appReviews'
import { AppIframe } from '../appIframe'
import { ScreenshotModal } from '../screenshotModal'
import { ConsentModal } from '../consentModal'
import styles from './styles/styles.module.scss'

const { Title } = Typography

interface AppDetailProps {
    appId: string
}

import { useOrganization } from '@domains/organization/providers/organizationProvider'

export const AppDetail: React.FC<AppDetailProps> = ({ appId }) => {
    const { organizationId } = useOrganization()
    const { data, isLoading } = useGetAppQuery({ app_id: appId })
    const { data: reviewsData } = useGetAppReviewsQuery({ app_id: appId, limit: 3, offset: 0 })
    const { 
        isInstalling, 
        isUninstalling,
        isInstalled,
        selectedScreenshot, 
        handleInstall,
        handleUninstall,
        setSelectedScreenshot,
        isConsentModalOpen,
        setIsConsentModalOpen,
        handleConfirmInstall,
        viewMode,
        setViewMode,
    } = useAppDetail(appId)

    const app = data
    const reviews = reviewsData?.results || []

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div style={{ textAlign: 'center', padding: '64px' }}>
                    <Spin size='large' />
                </div>
            </div>
        )
    }

    if (!app) {
        return (
            <div className={styles.container}>
                <BackPage path={RoutePath[AppRoutes.MARKETPLACE]} />
                <div style={{ textAlign: 'center', padding: '64px' }}>
                    <Title level={3}>Приложение не найдено</Title>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <BackPage path={RoutePath[AppRoutes.MARKETPLACE]} />

            <AppDetailHeader 
                app={app} 
                isInstalling={isInstalling}
                isUninstalling={isUninstalling}
                isInstalled={isInstalled}
                onInstall={handleInstall}
                onUninstall={handleUninstall}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            {viewMode === 'app' ? (
                <AppIframe app={app} organizationId={organizationId} />
            ) : (
                <>
                    <div className={styles.content}>
                        <AppDetailContent app={app} onScreenshotClick={setSelectedScreenshot} />
                        <AppDetailSidebar app={app} />
                    </div>
                    <AppReviews reviews={reviews} appId={appId} totalCount={reviewsData?.count} />
                </>
            )}

            <ScreenshotModal screenshot={selectedScreenshot} onClose={() => setSelectedScreenshot(null)} />

            <ConsentModal
                visible={isConsentModalOpen}
                app={app}
                isInstalling={isInstalling}
                onClose={() => setIsConsentModalOpen(false)}
                onConfirm={handleConfirmInstall}
            />
        </div>
    )
}

