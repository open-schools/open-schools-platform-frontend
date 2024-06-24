import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Col, Row, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

import { useDeleteCircleMutation, useGetCircleQuery, useGetCircleStudentsQuery } from '@domains/circle/redux/circleApi'
import { useGetCurrentCircleQuery } from '@domains/organization/redux/organizationApi'
import DeleteModal from '@domains/common/components/deleteModal'
import { Button } from '@domains/common/components/button'
import { getUuidFromUrl } from '@domains/common/utils/getUuidFromUrl'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { CARD_HEAD_STYLE } from '@domains/circle/components/currentCircle/styles/styles'
import { Table } from '@domains/common/components/table'
import { createSearchTextForRequest } from '@domains/common/utils/searchText'
import { ActionBar } from '@domains/common/components/stickyBlock/actionBar'
import { sumObjectValues } from '@domains/common/utils/sumObjectValues'

import android from '@public/image/Android.svg'

import { searchColumns } from './constants'
import { RowType, TableType } from './interfaces'
import styles from './styles/styles.module.scss'
import { getVarsForAddressColumn } from '@domains/common/utils/geo'
import { StatusesEnum } from '@domains/common/constants/Enums'
import { ErrorType } from '@store/commonApi'
import { AppRoutes, DynamicAppRoutes, DynamicRoutePath, RoutePath } from '@domains/common/constants/routerEnums'

const CurrentCircle = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [searchRequestText, setSearchRequestText] = useState('')
    const [mutation, isDeleteFinished] = useDeleteCircleMutation()
    const uuid = getUuidFromUrl()
    const router = useRouter()

    const { organizationId } = useOrganization()

    const backQuery = `&back=true`

    const { data: circle, error: circleError } = useGetCircleQuery({ circle_id: uuid[0] })
    const { data: students, isLoading } = useGetCircleStudentsQuery({
        circle_id: uuid[0],
        or_search: createSearchTextForRequest(searchRequestText, searchColumns),
    })
    const { data: queryData } = useGetCurrentCircleQuery({ circle_id: uuid[0], organization_id: organizationId })

    const queriesCount = queryData?.circle?.student_profile_queries || {
        IN_PROGRESS: 0,
        SENT: 0,
        ACCEPTED: 0,
        DECLINED: 0,
        CANCELED: 0,
    }

    const countAllQueries = sumObjectValues(queriesCount)
    const addressVars = getVarsForAddressColumn(circle?.circle.address ?? '')

    useEffect(() => {
        if (circleError && (circleError as ErrorType).status == 404) {
            router.push(RoutePath[AppRoutes.CIRCLE_LIST])
        }
    }, [circleError])

    if (isDeleteFinished.isSuccess) return null
    if (uuid.length === 0) router.push(RoutePath[AppRoutes.NOT_FOUND])

    return (
        <>
            <Typography.Title className={styles.name} level={1}>
                {circle?.circle.name}
            </Typography.Title>
            <Row className={styles.headersBlock}>
                <Col lg={12} md={24} xs={24} sm={24} className={styles.queriesBlock}>
                    <Col span={24}>{`${addressVars[0]}, ${addressVars[1]}`}</Col>
                    <Typography.Title level={2}>Заявки</Typography.Title>
                    <Row className={styles.Row}>
                        <div>Всего</div>
                        <span></span>
                        <Link
                            href={`/query?circles=${circle?.circle.name ?? ''}${backQuery}`}
                            className={styles.colorCountAllQueries}
                        >
                            {countAllQueries}
                        </Link>
                    </Row>
                    <Row className={styles.Row}>
                        <div>Принято</div>
                        <span></span>
                        <Link
                            href={`/query?statuses=${StatusesEnum.ACCEPTED}&circles=${circle?.circle.name}${backQuery}`}
                            className={styles.colorCountAcceptedQueries}
                        >
                            {queriesCount.ACCEPTED}
                        </Link>
                    </Row>
                    <Row className={styles.Row}>
                        <div>На рассмотрении</div>
                        <span></span>
                        <Link
                            href={`/query?statuses=${StatusesEnum.IN_PROGRESS}&circles=${circle?.circle.name}${backQuery}`}
                            className={styles.colorCountInProgressQueries}
                        >
                            {queriesCount.IN_PROGRESS}
                        </Link>
                    </Row>
                </Col>
                <Col lg={12} md={24} xs={24} sm={24} className={styles.card}>
                    <div className={styles.text}>
                        <Col style={CARD_HEAD_STYLE}>Скоро здесь появится “Отчёт по кружку”</Col>
                        <Col>
                            <Typography.Text>
                                Клиенты Открытых школ могут настроить и скачать понятный и подробный отчёт. В нём -
                                важные цифры о расходах и доходах кружка.
                            </Typography.Text>
                        </Col>
                        <Col>
                            <Typography.Text>Подробности — скоро.</Typography.Text>
                        </Col>
                    </div>
                    <div className={styles.mobile}>
                        <Image src={android} alt={'Android with analytics'} className={styles.mobileImage} />
                    </div>
                </Col>
            </Row>
            <div className={styles.tableContainer}>
                <Table<RowType, TableType>
                    columnsTitlesAndKeys={[
                        ['Ф. И. О обучающегося', 'student_name'],
                        ['Телефон обучающегося', 'student_phone'],
                        ['Ф. И. О родителя', 'parent_names'],
                        ['Телефон родителя', 'parent_phones'],
                    ]}
                    data={students}
                    mainRoute={RoutePath[AppRoutes.STUDENT_LIST]}
                    isLoading={isLoading}
                    needNumbering={true}
                    searchFields={['student_name', 'student_phone', 'parent_names', 'parent_phones']}
                    searchRequestText={searchRequestText}
                    setSearchRequestText={setSearchRequestText}
                />
            </div>
            <Col span={24} className={styles.buttonBar}>
                <ActionBar
                    actions={[
                        <Button
                            className={styles.changeButton}
                            onClick={() => router.push(DynamicRoutePath[DynamicAppRoutes.CIRCLE_CHANGE](uuid[0]))}
                        >
                            Редактировать данные кружка
                        </Button>,
                        <Button
                            antdType={'ghost'}
                            className={styles.deleteButton}
                            key='submit'
                            danger
                            onClick={() => setIsModalVisible(true)}
                        >
                            Удалить кружок
                        </Button>,
                    ]}
                />
            </Col>

            <DeleteModal
                isModalVisible={isModalVisible}
                mutation={mutation}
                setIsModalVisible={setIsModalVisible}
                titleText={'Удалить кружок?'}
                buttonText={'Удалить кружок'}
                urlAfterDelete={RoutePath[AppRoutes.CIRCLE_LIST]}
                dataField={'circle_id'}
            />
        </>
    )
}

export default CurrentCircle
