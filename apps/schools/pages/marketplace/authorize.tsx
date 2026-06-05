import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Spin, Card, Button, Typography, Result, Row, Col, Alert } from 'antd'
import { DownloadOutlined, SafetyCertificateOutlined } from '@ant-design/icons'

// Импорты из твоей кодовой базы
import { 
    useCheckAppInstallationQuery, 
    useInstallAppMutation,
    useGetAppQuery // Предполагаем стандартное имя экшена получения данных приложения
} from '../../domains/marketplace/redux/marketplaceApi'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { ConsentModal } from '../../domains/marketplace/components/consentModal'

const { Title, Text, Paragraph } = Typography

export const OAuth2AuthorizePage = () => {
    const router = useRouter()
    const { organizationId } = useOrganization()
    
    // 1. Извлекаем query-параметры OAuth2
    const { client_id, response_type, redirect_uri, scope, state } = router.query
    
    const [isConsentOpen, setIsConsentOpen] = useState(false)
    const [installApp, { isLoading: isInstalling }] = useInstallAppMutation()

    // В OAuth2 client_id чаще всего соответствует id приложения в системе
    const appId = client_id as string

    // 2. Проверяем, установлено ли приложение в текущей организации
    const { 
        data: installation, 
        isLoading: isCheckLoading, 
        error: checkError 
    } = useCheckAppInstallationQuery(
        { 
            app_id: appId, 
            organization_id: organizationId || '' 
        },
        { skip: !organizationId || !appId }
    )

    // 3. Загружаем данные приложения (нужно для Сценария 2 — показать карточку перед установкой)
    const { 
        data: app, 
        isLoading: isAppLoading 
    } = useGetAppQuery(
        { app_id: appId },
        { skip: !appId || !!installation } // Пропускаем, если приложение уже стоит
    )

    // Базовый URL бэкенда (подставь используемую в проекте переменную, например process.env.NEXT_PUBLIC_API_URL)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.open-schools.ru'

    // Функция перенаправления на бэкенд для завершения OAuth2-авторизации
    const redirectToBackendAuthorize = () => {
        const searchParams = new URLSearchParams({
            client_id: appId,
            response_type: (response_type as string) || 'code',
            redirect_uri: redirect_uri as string,
        })
        if (scope) searchParams.append('scope', scope as string)
        if (state) searchParams.append('state', state as string)

        // Сценарий 1: Уводим пользователя на бэкенд
        window.location.href = `${API_BASE_URL}/api/marketplace/oauth2/authorize?${searchParams.toString()}`
    }

    // Следим за статусом проверки установки: если приложение УЖЕ стоит — редиректим сразу
    useEffect(() => {
        if (installation && router.isReady) {
            redirectToBackendAuthorize()
        }
    }, [installation, router.isReady])

    // Валидация обязательных параметров
    if (router.isReady && (!client_id || !redirect_uri)) {
        return (
            <Result
                status="error"
                title="Ошибка авторизации"
                subTitle="Отсутствуют обязательные параметры запроса (client_id или redirect_uri)."
            />
        )
    }

    // Состояние загрузки (идёт проверка или редирект)
    if (!router.isReady || isCheckLoading || (installation && !checkError)) {
        return (
            <Row justify="center" align="middle" style={{ minHeight: '80vh', flexDirection: 'column' }}>
                <Spin size="large" />
                <Text style={{ marginTop: 16 }} type="secondary">
                    {installation ? 'Авторизация приложения...' : 'Проверка безопасности...'}
                </Text>
            </Row>
        )
    }

    // Обработка успешного согласия в ConsentModal
    const handleConfirmInstall = async (scopes: string[]) => {
        if (!organizationId || !appId) return

        try {
            // Устанавливаем приложение с выбранными скоупами
            await installApp({
                app: appId,
                organization: organizationId,
                scopes,
            }).unwrap()

            // После успешной установки бэкенд обновит кэш RTK Query, 
            // сработает useEffect выше и автоматически перенаправит на Сценарий 1.
            setIsConsentOpen(false)
        } catch (err) {
            console.error('Ошибка при установке в процессе OAuth2:', err)
        }
    }

    // Сценарий 2: Приложение НЕ установлено. Показываем интерфейс запроса на установку.
    return (
        <Row justify="center" align="middle" style={{ minHeight: '90vh', padding: '24px' }}>
            <Col xs={24} sm={18} md={12} lg={10}>
                <Card 
                    bordered={true} 
                    style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                >
                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <SafetyCertificateOutlined style={{ fontSize: 40, color: '#1890ff' }} />
                        <Title level={3} style={{ marginTop: 16 }}>Запрос на авторизацию</Title>
                        <Paragraph type="secondary">
                            Стороннее приложение запрашивает доступ к вашему аккаунту Open-Schools
                        </Paragraph>
                    </div>

                    {isAppLoading ? (
                        <Row justify="center"><Spin /></Row>
                    ) : app ? (
                        <Card type="inner" style={{ background: '#fafafa', borderRadius: 8, marginBottom: 24 }}>
                            <Row align="middle" gutter={16}>
                                <Col>
                                    {app.icon_url ? (
                                        <img src={app.icon_url} alt={app.name} style={{ width: 48, height: 48, borderRadius: 8 }} />
                                    ) : (
                                        <div style={{ width: 48, height: 48, borderRadius: 8, background: '#e8e8e8' }} />
                                    )}
                                </Col>
                                <Col>
                                    <Text strong style={{ fontSize: 16 }}>{app.name}</Text>
                                    <br />
                                    <Text type="secondary" size="small">Разработчик: {app.DeveloperProfile?.email || 'Не указан'}</Text>
                                </Col>
                            </Row>
                        </Card>
                    ) : (
                        <Alert message="Не удалось загрузить данные приложения" type="warning" style={{ marginBottom: 24 }} />
                    )}

                    <Alert 
                        message="Приложение не установлено" 
                        description="Для продолжения авторизации необходимо сначала установить это приложение в вашу организацию и предоставить ему запрашиваемые права."
                        type="info" 
                        showIcon
                        style={{ marginBottom: 24 }}
                    />

                    <Row gutter={16}>
                        <Col span={12}>
                            <Button block size="large" onClick={() => router.back()}>
                                Отмена
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button 
                                type="primary" 
                                block 
                                size="large" 
                                icon={<DownloadOutlined />}
                                disabled={!app}
                                onClick={() => setIsConsentOpen(true)}
                            >
                                Установить
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Col>

            {app && (
                <ConsentModal 
                    visible={isConsentOpen}
                    app={app}
                    isInstalling={isInstalling}
                    onClose={() => setIsConsentOpen(false)}
                    onConfirm={handleConfirmInstall}
                />
            )}
        </Row>
    )
}

// Экспортируем страницу по умолчанию для Next.js роутинга
default export OAuth2AuthorizePage