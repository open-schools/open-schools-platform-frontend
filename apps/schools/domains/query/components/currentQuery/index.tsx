import React, { useEffect, useState } from 'react'
import { Col, Row, Typography } from 'antd'
import styles from './styles/styles.module.scss'
import { Select } from '@domains/common/components/select'
import queryChat from '@public/image/chatWithParents.svg'
import Image from 'next/image'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { useGetAllJoinCircleQueriesQuery } from '@domains/organization/redux/organizationApi'
import { createSearchTextForRequest } from '@domains/common/utils/searchText'
import { searchStudentsColumns } from '@domains/query/components/queryList/constants'
import { getUuidFromUrl } from '@domains/common/utils/getUuidFromUrl'
import { format } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import { GetStudentJoinCircle } from '@domains/common/redux/serializers'
import { useChangeStatusMutation } from '@domains/query/redux/queryApi'
import { handleQueryStatusChange } from '@domains/query/handlers/queryUpdate'

export const CurrentQuery = () => {
    const { organizationId } = useOrganization()
    const uuid = getUuidFromUrl()
    const { data: queries, isLoading: isQueryLoading } = useGetAllJoinCircleQueriesQuery({
        circle__organization__id: organizationId,
        id: uuid[0],
    })

    const statusTranslations: { [key: string]: string } = {
        SENT: 'Отправлена',
        ACCEPTED: 'Принята',
        IN_PROGRESS: 'На рассмотрении',
        DECLINED: 'Отклонена',
        CANCELED: 'Отменена',
    }

    const translateStatus = (status: string) => {
        return statusTranslations[status] || status
    }

    const query = queries?.results[0] as GetStudentJoinCircle
    const [mutation] = useChangeStatusMutation()
    const [currentStatus, setCurrentStatus] = useState<string>('')
    const [currentDependencies, setCurrentDependencies] = useState<string[]>([])

    const graph: { [key: string]: string | string[] } = {
        Отправлена: ['Принята', 'На рассмотрении', 'Отклонена', 'Отменена'],
        'На рассмотрении': ['Принята', 'Отклонена'],
        Принята: 'Принята',
        Отклонена: 'Отклонена',
        Отменена: 'Отменена',
    }

    const handleStatusChange = (value: string) => {
        let translatedStatus = value
        for (const key in statusTranslations) {
            if (statusTranslations[key] === value) {
                translatedStatus = key
                break
            }
        }
        handleQueryStatusChange(mutation, uuid[0], translatedStatus)
        setCurrentStatus(value)
        const dependencies = graph[value]
        if (Array.isArray(dependencies)) {
            setCurrentDependencies(dependencies)
        } else {
            setCurrentDependencies([dependencies])
        }
    }

    const createdAt = query?.created_at
    let formattedDate = ''

    if (createdAt) {
        const parsedDate = new Date(createdAt)
        formattedDate = format(parsedDate, 'dd MMMM yyyy г. в HH:mm', { locale: ruLocale })
    }

    return (
        <div>
            <Typography.Title className={styles.name} level={1}>
                Заявка
            </Typography.Title>
            <div className={styles.selectContainer}>
                <Select
                    customType={'selectDefault'}
                    value={currentStatus ? currentStatus : translateStatus(query?.status)}
                    placeholder='Выберите адрес кружка'
                    className={styles.select}
                    options={
                        currentDependencies.length !== 0
                            ? Object.values(currentDependencies).map((status) => ({
                                  value: status,
                                  label: status,
                              }))
                            : Object.values(
                                  graph[translateStatus(query?.status)] ? graph[translateStatus(query?.status)] : [],
                              ).map((status) => ({
                                  value: status,
                                  label: status,
                              }))
                    }
                    onChange={(value) => handleStatusChange(value)}
                />
            </div>
            <Row className={styles.cardsContainer}>
                <Col lg={12} md={24} xs={24} sm={24} className={styles.card}>
                    <div className={styles.mainBlock}>
                        <div className={styles.description}>Дата отправки {formattedDate}</div>
                        <div className={styles.information}>
                            <Row className={styles.row}>
                                <Col span={12}>Получено от:</Col>
                                <Col span={12}>{query?.additional.parent_name}</Col>
                            </Row>
                            <Row className={styles.row}>
                                <Col span={12}>Обучающийся:</Col>
                                <Col span={12}>{query?.body.name}</Col>
                            </Row>
                            <Row className={styles.row}>
                                <Col span={12}>Телефон родителя:</Col>
                                <Col span={12}>{query?.additional.parent_phone}</Col>
                            </Row>
                            <Row className={styles.row}>
                                <Col span={12}>Кружок:</Col>
                                <Col span={12}>{query?.recipient.name}</Col>
                            </Row>
                            <div className={styles.queryText}>
                                <div className={styles.queryTextHeader}>Текст заявки</div>
                                <div className={styles.queryTextContent}>{query?.additional.text}</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={12} md={24} xs={24} sm={24} className={styles.imageCard}>
                    <Image src={queryChat} alt={'Chat with parents'} />
                </Col>
            </Row>
        </div>
    )
}
