import { useState } from 'react'
import { message } from 'antd'
import { useInstallAppMutation, useCheckAppInstallationQuery, useUninstallAppMutation } from '../redux/marketplaceApi'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { useUserProfile } from '@domains/user/providers/authProvider'

export const useAppDetail = (appId: string) => {
    const { organizationId } = useOrganization()
    const { user } = useUserProfile()
    const [installApp, { isLoading: isInstalling }] = useInstallAppMutation()
    const [uninstallApp, { isLoading: isUninstalling }] = useUninstallAppMutation()
    const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null)
    
    const { data: installation } = useCheckAppInstallationQuery(
        { 
            app_id: appId,
            organization_id: organizationId || '' 
        },
        { skip: !organizationId || !appId }
    )
    
    const isInstalled = !!installation

    const handleInstall = async () => {
        if (!organizationId) {
            message.error('Организация не выбрана')
            return
        }

        try {
            await installApp({
                app: appId,
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

    const handleUninstall = async () => {
        if (!installation?.id) {
            message.error('Установка не найдена')
            return
        }

        try {
            await uninstallApp({ installation_id: installation.id }).unwrap()
            message.success('Приложение успешно удалено!')
        } catch (err: any) {
            const errorMessage = err?.data?.error?.message || ''
            message.error(errorMessage || 'Ошибка при удалении приложения')
        }
    }

    return {
        isInstalling,
        isUninstalling,
        isInstalled,
        installation,
        selectedScreenshot,
        handleInstall,
        handleUninstall,
        setSelectedScreenshot,
    }
}

