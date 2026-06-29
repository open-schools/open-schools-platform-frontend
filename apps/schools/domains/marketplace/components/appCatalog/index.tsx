import React, { useMemo } from 'react'
import { Typography, Button } from 'antd'
import { useGetAllAppsQuery, useGetAllCategoriesQuery, useGetOrganizationInstallationsQuery } from '../../redux/marketplaceApi'
import { useCatalogFilters } from '../../hooks/useCatalogFilters'
import { CatalogFilters } from '../catalogFilters'
import { AppsList } from '../appsList'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import styles from './styles/styles.module.scss'

const { Title, Text } = Typography

export const AppCatalog: React.FC = () => {
    const { organizationId } = useOrganization()
    const {
        search,
        selectedCategories,
        page,
        pageSize,
        categoryId,
        installedOnly,
        handleCategoryChange,
        handleSearchChange,
        handlePageChange,
    } = useCatalogFilters()

    const { data: appsData, isLoading: isLoadingApps } = useGetAllAppsQuery(
        {
            q: search || undefined,
            category_id: categoryId,
            page: page,
            page_size: pageSize,
        },
        { skip: false },
    )

    const { data: categoriesData, isLoading: isLoadingCategories } =
        useGetAllCategoriesQuery({}, { skip: false })

    const { data: installationsData, isLoading: isLoadingInstallations } = useGetOrganizationInstallationsQuery(
        { organization_id: organizationId || '' },
        { skip: !organizationId || !installedOnly }
    )

    const allApps = appsData?.results || []
    const installations = installationsData?.results || []
    
    const apps = useMemo(() => {
        if (!installedOnly || !organizationId) {
            return allApps
        }
        
        const installedAppIds = new Set(
            installations.map((installation) => {
                const appId = typeof installation.app === 'string' ? installation.app : installation.app?.id
                return appId
            })
        )
        
        return allApps.filter((app) => installedAppIds.has(app.id))
    }, [allApps, installations, installedOnly, organizationId])

    const categories = categoriesData?.categories || []
    const totalApps = installedOnly ? apps.length : (appsData?.count || 0)
    const isLoading = isLoadingApps || isLoadingCategories || (installedOnly && isLoadingInstallations)

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title level={1} className={styles.title}>
                    Каталог приложений
                </Title>
            </div>

            <CatalogFilters
                search={search}
                selectedCategories={selectedCategories}
                categories={categories}
                isLoadingCategories={isLoadingCategories}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
            />

            <AppsList
                apps={apps}
                isLoading={isLoading}
                page={page}
                totalApps={totalApps}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />

            <div className={styles.supportSection}>
                <Text className={styles.supportText}>
                    Если вы хотите разместить приложение, свяжитесь с нашей службой поддержки.
                </Text>
                <Button
                    type="link"
                    href="https://help.lamart.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.supportButton}
                >
                    Связаться с поддержкой
                </Button>
            </div>
        </div>
    )
}

