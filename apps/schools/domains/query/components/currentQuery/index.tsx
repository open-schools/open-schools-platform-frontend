import React, { useState } from 'react'
import { Col, Row, Spin, Typography } from 'antd'
import styles from './styles/styles.module.scss'
import { Select } from '@domains/common/components/select'
import queryChat from '@public/image/chatWithParents.svg'
import Image from 'next/image'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { useGetAllJoinCircleQueriesQuery } from '@domains/organization/redux/organizationApi'
import { getUuidFromUrl } from '@domains/common/utils/getUuidFromUrl'
import { format } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import { GetStudentJoinCircle } from '@domains/common/redux/serializers'
import { useChangeStatusMutation, useGetQueryHistoryQuery } from '@domains/query/redux/queryApi'
import { handleQueryStatusChange } from '@domains/query/handlers/queryUpdate'
import { QueriesTypes } from '@domains/common/redux/interfaces'
import {
    ACCEPTED_FILTER_COLOR,
    CANCELED_FILTER_COLOR,
    DECLINED_FILTER_COLOR,
    IN_PROGRESS_FILTER_COLOR,
    SENT_FILTER_COLOR,
} from '@domains/query/components/queryList/styles/styles'
import { TIMEOUT_HISTORY_DELAY } from '@domains/query/components/currentQuery/constants'

export const CurrentQuery = () => {
    const { organizationId } = useOrganization()
    const uuid = getUuidFromUrl()
    const { data: queries, isLoading } = useGetAllJoinCircleQueriesQuery({
        circle__organization__id: organizationId,
        id: uuid[0],
    })
    const {
        data: history,
        isLoading: historyLoading,
        refetch,
    } = useGetQueryHistoryQuery({
        query_id: uuid[0],
    })

    const statusTranslations: { [key: string]: { translate: string; color: string } } = {
        SENT: {
            translate: 'Отправлена',
            color: SENT_FILTER_COLOR,
        },
        ACCEPTED: {
            translate: 'Принята',
            color: ACCEPTED_FILTER_COLOR,
        },
        IN_PROGRESS: {
            translate: 'На рассмотрении',
            color: IN_PROGRESS_FILTER_COLOR,
        },
        DECLINED: {
            translate: 'Отклонена',
            color: DECLINED_FILTER_COLOR,
        },
        CANCELED: {
            translate: 'Отменена',
            color: CANCELED_FILTER_COLOR,
        },
    }

    const translateStatus = (status: string) => {
        return statusTranslations[status]?.translate || status
    }

    const decorateStatus = (status: string) => {
        return statusTranslations[status]?.color || '#fff'
    }

    const query = queries?.results[0] as GetStudentJoinCircle
    const [mutation] = useChangeStatusMutation()
    const [currentStatus, setCurrentStatus] = useState<string>('')
    const [currentDependencies, setCurrentDependencies] = useState<string[]>([])

    const graph: { [key: string]: string[] } = {
        Отправлена: ['Принята', 'На рассмотрении', 'Отклонена', 'Отменена'],
        'На рассмотрении': ['Принята', 'Отклонена'],
        Принята: ['Принята'],
        Отклонена: ['Отклонена'],
        Отменена: ['Отменена'],
    }

    const handleStatusChange = (value: string) => {
        let translatedStatus = value
        for (const key in statusTranslations) {
            if (statusTranslations[key].translate === value) {
                translatedStatus = key
                break
            }
        }
        handleQueryStatusChange(mutation, uuid[0], translatedStatus as QueriesTypes)
        setCurrentStatus(value)
        setCurrentDependencies(graph[value] || [])
        setTimeout(() => refetch(), TIMEOUT_HISTORY_DELAY)
    }

    const createdAt = query?.created_at
    let formattedDate = ''

    if (createdAt) {
        const parsedDate = new Date(createdAt)
        formattedDate = format(parsedDate, 'dd MMMM yyyy г. в HH:mm', { locale: ruLocale })
    }

    const formattedHistory = history?.results.map((change, i) => {
        const changeDate = new Date(change.date)
        const formattedChangeDate = format(changeDate, 'dd.MM.yyyy, HH:mm', { locale: ruLocale })

        if (change?.previous_status === null)
            return (
                <div key={i} className={styles.queryHistoryContainer}>
                    <div className={styles.queryHistoryTime}>{formattedChangeDate}</div>
                    <div className={styles.queryHistoryText}>
                        Администратор {change.user.name} создал заявку со статусом "
                        <span style={{ color: decorateStatus(change?.new_status || '') }}>
                            {translateStatus(change?.new_status || '')}
                        </span>
                        "
                    </div>
                </div>
            )

        return (
            <div key={i} className={styles.queryHistoryContainer}>
                <div className={styles.queryHistoryTime}>{formattedChangeDate}</div>
                <div className={styles.queryHistoryText}>
                    Администратор {change.user.name} изменил статус заявки с "
                    <span style={{ color: decorateStatus(change?.previous_status || '') }}>
                        {translateStatus(change?.previous_status || '')}
                    </span>
                    " на "
                    <span style={{ color: decorateStatus(change?.new_status || '') }}>
                        {translateStatus(change?.new_status || '')}
                    </span>
                    "
                </div>
            </div>
        )
    })

    return !isLoading ? (
        <div>
            <Typography.Title className={styles.name} level={1}>
                Заявка
            </Typography.Title>
            <div className={styles.selectContainer}>
                <Select
                    customType={'selectDefault'}
                    value={currentStatus ? currentStatus : translateStatus(query?.status)}
                    placeholder='Статус отсутсвует'
                    className={styles.select}
                    options={
                        currentDependencies.length !== 0
                            ? currentDependencies.map((status) => ({
                                  value: status,
                                  label: status,
                              }))
                            : (graph[translateStatus(query?.status)] ? graph[translateStatus(query?.status)] : []).map(
                                  (status) => ({
                                      value: status,
                                      label: status,
                                  }),
                              )
                    }
                    onChange={(value) => handleStatusChange(value)}
                />
            </div>
            <Row className={styles.cardsContainer}>
                <Col lg={12} md={24} xs={24} sm={24} className={styles.card}>
                    <div className={styles.mainBlock}>
                        <div className={styles.description}>Дата отправки {formattedDate || 'Не определена'}</div>
                        <div className={styles.information}>
                            <Row className={styles.row}>
                                <Col span={12}>Получено от:</Col>
                                <Col span={12}>{query?.additional.parent_name || 'Не определено'}</Col>
                            </Row>
                            <Row className={styles.row}>
                                <Col span={12}>Обучающийся:</Col>
                                <Col span={12}>{query?.body.name || 'Не определен'}</Col>
                            </Row>
                            <Row className={styles.row}>
                                <Col span={12}>Телефон родителя:</Col>
                                <Col span={12}>{query?.additional.parent_phone || 'Не определен'}</Col>
                            </Row>
                            <Row className={styles.row}>
                                <Col span={12}>Кружок:</Col>
                                <Col span={12}>{query?.recipient.name || 'Не определен'}</Col>
                            </Row>
                            <div className={styles.queryText}>
                                <div className={styles.queryTextHeader}>Текст заявки:</div>
                                <div className={styles.queryTextContent}>
                                    {query?.additional.text || 'Не определен'}
                                </div>
                            </div>
                            {history?.results.length !== 0 && (
                                <div className={styles.queryHistory}>
                                    <div className={styles.queryHistoryHeader}>История изменения заявки</div>
                                    {!historyLoading ? (
                                        <div className={styles.queryHistoryScrollContainer}>{formattedHistory}</div>
                                    ) : (
                                        <>
                                            <Spin></Spin>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
                <Col lg={12} md={24} xs={24} sm={24} className={styles.imageCard}>
                    <Image className={styles.image} src={queryChat} alt={'Chat with parents'} />
                </Col>
            </Row>
        </div>
    ) : (
        <>
            <Spin></Spin>
        </>
    )
}
