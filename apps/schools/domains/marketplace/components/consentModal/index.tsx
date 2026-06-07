import React, { useState, useEffect } from 'react'
import { Modal, Checkbox, Typography, Divider } from 'antd'
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
    const [selectedOptional, setSelectedOptional] = useState<string[]>([])

    useEffect(() => {
        if (visible) {
            const rawOptional = app.optional_scopes
            const optionalArray = Array.isArray(rawOptional)
                ? rawOptional
                : typeof rawOptional === 'string'
                ? rawOptional.trim().split(/[\s,]+/).filter(Boolean)
                : []
            
            setSelectedOptional(optionalArray)
        }
    }, [visible, app.optional_scopes])

    const handleConfirm = () => {
        const rawRequired = app.required_scopes
        const requiredArray = Array.isArray(rawRequired)
            ? rawRequired
            : typeof rawRequired === 'string'
            ? rawRequired.trim().split(/[\s,]+/).filter(Boolean)
            : []

        const totalScopes = [...requiredArray, ...selectedOptional]
        onConfirm(totalScopes)
    }

    const handleOptionalChange = (scope: string, checked: boolean) => {
        if (checked) {
            setSelectedOptional((prev) => [...prev, scope])
        } else {
            setSelectedOptional((prev) => prev.filter((s) => s !== scope))
        }
    }

    const renderScopeItem = (scope: string, isDisabled: boolean) => {
        const info = SCOPE_DESCRIPTIONS[scope] || { title: scope, desc: 'Дополнительное разрешение приложения.' }
        const isChecked = isDisabled ? true : selectedOptional.includes(scope)
        
        return (
            <div key={scope} style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start' }}>
                <Checkbox 
                    disabled={isDisabled} 
                    checked={isChecked}
                    onChange={(e) => !isDisabled && handleOptionalChange(scope, e.target.checked)}
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

    const rawRequired = app.required_scopes
    const requiredArray = Array.isArray(rawRequired)
        ? rawRequired
        : typeof rawRequired === 'string'
        ? rawRequired.trim().split(/[\s,]+/).filter(Boolean)
        : []

    const rawOptional = app.optional_scopes
    const optionalArray = Array.isArray(rawOptional)
        ? rawOptional
        : typeof rawOptional === 'string'
        ? rawOptional.trim().split(/[\s,]+/).filter(Boolean)
        : []

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
                {requiredArray.length > 0 ? (
                    requiredArray.map((scope) => renderScopeItem(scope, true))
                ) : (
                    <Text type="secondary">Обязательные права отсутствуют</Text>
                )}
            </div>

            {optionalArray.length > 0 && (
                <>
                    <Divider orientation="left" plain style={{ margin: '12px 0' }}>Дополнительные права</Divider>
                    <div style={{ paddingLeft: 8 }}>
                        {optionalArray.map((scope) => renderScopeItem(scope, false))}
                    </div>
                </>
            )}
        </Modal>
    )
}