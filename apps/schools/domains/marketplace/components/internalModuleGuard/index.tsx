import React from 'react'
import { useRouter } from 'next/router'
import { Spin, Result, Button } from 'antd'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { useGetOrganizationInstallationsQuery, useGetAllAppsQuery } from '../../redux/marketplaceApi'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

interface InternalModuleGuardProps {
    entry: string
    children: React.ReactNode
}

export const InternalModuleGuard: React.FC<InternalModuleGuardProps> = ({ entry, children }) => {
    const router = useRouter()
    const { organizationId } = useOrganization()

    const { data: installationsData, isLoading: isLoadingInstallations } = useGetOrganizationInstallationsQuery(
        { organization_id: organizationId || '' },
        { skip: !organizationId }
    )

    const { data: appsData, isLoading: isLoadingApps } = useGetAllAppsQuery(
        { type: 'internal' },
        { skip: !organizationId }
    )

    const isLoading = isLoadingInstallations || isLoadingApps

    if (!organizationId) {
        return (
            <Result
                status="warning"
                title="Организация не выбрана"
                extra={
                    <Button type="primary" onClick={() => router.push(RoutePath[AppRoutes.MARKETPLACE])}>
                        Перейти в каталог
                    </Button>
                }
            />
        )
    }

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '64px' }}>
                <Spin size="large" />
            </div>
        )
    }

    const installations = installationsData?.results || []
    const apps = appsData?.results || []

    const installedApp = installations.find((installation) => {
        const appId = typeof installation.app === 'string' ? installation.app : installation.app?.id
        const app = apps.find((a) => a.id === appId)
        const appEntry = app?.latest_published_release?.manifest?.entry || app?.latest_release?.manifest?.entry
        return appEntry === entry
    })

    if (!installedApp) {
        return (
            <Result
                status="403"
                title="Доступ запрещен"
                subTitle="Это приложение не установлено для вашей организации."
                extra={
                    <Button type="primary" onClick={() => router.push(RoutePath[AppRoutes.MARKETPLACE])}>
                        Перейти в каталог
                    </Button>
                }
            />
        )
    }

    return <>{children}</>
}
