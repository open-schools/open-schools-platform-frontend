import React, { useState, useEffect } from 'react'
import { Modal, Checkbox, Typography, Space, Divider } from 'antd'
import { App } from '../../redux/interfaces'

const { Text, Paragraph } = Typography

const SCOPE_DESCRIPTIONS: Record<string, { title: string; desc: string }> = {
    openid: { title: 'Идентификация', desc: 'Базовая идентификация вашего аккаунта в системе.' },
    profile: { title: 'Профиль сотрудника', desc: 'Доступ к ФИО, должности и аватарке.' },
    email: { title: 'Email адрес', desc: 'Чтение основного адреса электронной почты.' },
    phone: { title: 'Номер телефона', desc: 'Доступ к вашему контактному номеру телефона.' },
    'read:organizations': { title: 'Чтение организаций', desc: 'Доступ к списку ваших организаций.' },
    'write:organizations': { title: 'Управление организацией', desc: 'Редактирование настроек организации и отправка приглашений.' },
    'read:organization_members': { title: 'Чтение членов организаций', desc: 'Доступ к списку участников в ваших организациях.' },
    'write:organization_members': { title: 'Управление участниками', desc: 'Добавление, изменение и удаление учеников, учителей и сотрудников.' },
    'read:circles': { title: 'Чтение групп и кружков', desc: 'Доступ к списку классов и кружков в организации.' },
    'write:circles': { title: 'Управление группами', desc: 'Создание, редактирование и удаление классов и кружков.' },
    'read:queries': { title: 'Просмотр заявок', desc: 'Чтение списка заявок на вступление и приглашений.' },
    'write:queries': { title: 'Обработка заявок', desc: 'Принятие или отклонение заявок на вступление.' },
    'read:tickets': { title: 'Чтение обращений', desc: 'Просмотр тикетов и обращений организации.' },
    'write:tickets': { title: 'Управление обращениями', desc: 'Создание и редактирование тикетов.' },
    'read:analytics': { title: 'Аналитика и экспорт', desc: 'Доступ к статистике и массовой выгрузке данных (Excel/CSV).' },
}

interface ConsentModalProps {
    visible: boolean
    app: App
    isInstalling: boolean
    onClose: () => void
    onConfirm: (selectedScopes: string[]) => void
}

export const ConsentModal: React.FC<ConsentModalProps> = ({
    visible,
    app,
    isInstalling,
    onClose,
    onConfirm,
}) => {
    // Храним только выбранные опциональные скоупы
    const [selectedOptional, setSelectedOptional] = useState<string[]>([])

    // При открытии модалки сбрасываем состояние — по умолчанию выбраны все опциональные
    useEffect(() => {
        if (visible && app.optional_scopes) {
            setSelectedOptional(app.optional_scopes)
        }
    }, [visible, app.optional_scopes])

    const handleConfirm = () => {
        // Объединяем обязательные скоупы и выбранные пользователем опциональные
        const totalScopes = [...(app.required_scopes || []), ...selectedOptional]
        onConfirm(totalScopes)
    }

    const renderScopeItem = (scope: string, isDisabled: boolean) => {
        const info = SCOPE_DESCRIPTIONS[scope] || { title: scope, desc: 'Дополнительное разрешение приложения.' }
        
        return (
            <div key={scope} style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start' }}>
                <Checkbox 
                    value={scope} 
                    disabled={isDisabled} 
                    checked={isDisabled ? true : undefined} // Для disabled форсируем true
                    style={{ marginTop: 4 }}
                />
                <div style={{ marginLeft: 12 }}>
                    <Text strong>{info.title}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>{info.desc}</Text>
                </div>
            </div>
        )
    }

    return (
        <Modal
            title={`Разрешения для приложения "${app.name}"`}
            open={visible}
            onCancel={onClose}
            onOk={handleConfirm}
            confirmLoading={isInstalling}
            okText="Подтвердить установку"
            cancelText="Отмена"
            destroyOnClose
        >
            <Paragraph style={{ marginTop: 8 }}>
                Для корректной работы приложению требуются следующие права доступа к вашим данным в Open-Schools:
            </Paragraph>

            <Divider orientation="left" plain style={{ margin: '12px 0' }}>Обязательные права</Divider>
            <div style={{ paddingLeft: 8 }}>
                {app.required_scopes && app.required_scopes.length > 0 ? (
                    app.required_scopes.map((scope) => renderScopeItem(scope, true))
                ) : (
                    <Text type="secondary">Обязательные права отсутствуют</Text>
                )}
            </div>

            {app.optional_scopes && app.optional_scopes.length > 0 && (
                <>
                    <Divider orientation="left" plain style={{ margin: '12px 0' }}>Дополнительные права</Divider>
                    <Checkbox.Group 
                        value={selectedOptional} 
                        onChange={(checkedValues) => setSelectedOptional(checkedValues as string[])}
                        style={{ width: '100%', flexDirection: 'column', paddingLeft: 8 }}
                    >
                        {app.optional_scopes.map((scope) => renderScopeItem(scope, false))}
                    </Checkbox.Group>
                </>
            )}
        </Modal>
    )
}