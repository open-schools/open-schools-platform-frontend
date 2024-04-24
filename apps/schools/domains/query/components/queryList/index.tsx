import React, { useEffect, useState } from 'react'
import { Tag, Typography } from 'antd'
import styles from './styles/styles.module.scss'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { Table } from '@domains/common/components/table'
import { createSearchTextForRequest } from '@domains/common/utils/searchText'
import { RowType, TableType } from './interfaces'
import { searchStudentsColumns, StatusDictionary } from './constants'
import {
    useGetAllJoinCircleQueriesQuery,
    useGetOrganizationAnalyticsQuery,
} from '@domains/organization/redux/organizationApi'
import EmptyWrapper from '@domains/common/components/containers/EmptyWrapper'
import { mapReturnedData } from '@domains/common/redux/utils'
import { HighlightText } from '@domains/common/components/table/forming'
import { isReactElement } from '@domains/common/utils/react'
import { sumObjectValues } from '@domains/common/utils/sumObjectValues'
import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Input } from '@domains/common/components/input'
import { BubbleFilter } from '@domains/common/components/bubbleFilter'
import { BubbleFilterListItem } from '@domains/common/components/bubbleFilter/interface'
import { useQueryState } from 'next-usequerystate'
import { parseAsArrayOf, parseAsString } from 'next-usequerystate'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

export function QueryList() {
    const [searchRequestText, setSearchRequestText] = useState('')
    const { organizationId } = useOrganization()
    const [isTableLoading, setIsTableLoading] = useState(false)

    const [inputText, setInputText] = useState('')

    const [statuses, setStatuses] = useQueryState(
        'statuses',
        parseAsArrayOf(parseAsString).withOptions({
            history: 'push',
        }),
    )

    const [circles, setCircles] = useQueryState(
        'circles',
        parseAsArrayOf(parseAsString).withOptions({
            history: 'push',
        }),
    )

    const bubbleFilterItems: any = {}

    const { data: analytics, isLoading: isAnalyticsLoading } = useGetOrganizationAnalyticsQuery({
        organization_id: organizationId,
    })

    for (const key in StatusDictionary) {
        const obj = StatusDictionary[key]

        bubbleFilterItems[key] = {
            key: key,
            text: obj.text,
            color: obj.color,
            count: analytics ? (analytics.analytics as unknown as { [index: string]: number })[key] : 0,
            isSelected: statuses?.includes(key) ?? false,
            onClick: () => {
                setStatuses((x) => [...(x ?? []), key])
            },
            onExit: () => {
                setStatuses((x) => {
                    const res = [...(x ?? []).filter((y) => y != key)]
                    return res.length === 0 ? null : res
                })
            },
        } as BubbleFilterListItem
    }

    const { data: queries, isLoading: isQueriesLoading } = useGetAllJoinCircleQueriesQuery({
        circle__organization__id: organizationId,
        or_search: createSearchTextForRequest(searchRequestText, searchStudentsColumns),
    })

    const countAllQueries = !isAnalyticsLoading && analytics ? sumObjectValues(analytics?.analytics) : 0

    const reformattedData = mapReturnedData(queries, (query) => {
        const transformedQuery = structuredClone(query) as unknown as TableType
        transformedQuery.parent_name = query.additional.parent_name
        transformedQuery.parent_phone = query.additional.parent_phone
        transformedQuery.circle_name = query.recipient.name
        transformedQuery.student_name = query.body.name
        return transformedQuery
    })

    useEffect(() => {
        if (!isQueriesLoading && queries) {
            setIsTableLoading(false)
        }
    }, [queries])

    return (
        <EmptyWrapper
            titleText={'Список заявок пока пуст'}
            descriptionText={'Дождитесь первой заявки'}
            pageTitle={'Заявки'}
            data={queries}
            isLoading={isQueriesLoading}
            searchTrigger={searchRequestText}
        >
            <div className={styles.header}>
                <Typography.Title level={1}>Заявки</Typography.Title>
            </div>
            <Input
                onChange={(text) => {
                    setIsTableLoading(true)
                    setInputText(text.target.value)
                    setTimeout(() => {
                        setSearchRequestText(text.target.value)
                    }, 1000)
                }}
                customType={'inputSearch'}
                placeholder={'Поиск'}
                value={inputText}
                children={
                    <>
                        <SearchOutlined className={styles.search} />
                        {inputText && (
                            <CloseCircleOutlined
                                className={styles.cross}
                                onClick={() => {
                                    setInputText('')
                                    setSearchRequestText('')
                                }}
                            />
                        )}
                    </>
                }
            />
            <BubbleFilter items={Object.values(bubbleFilterItems)} text={`${countAllQueries} заявок`} />
            <Table<RowType, TableType>
                loading={isTableLoading}
                customType={'tableWithoutSearch'}
                columnsTitlesAndKeys={[
                    ['Дата и время', 'created_at'],
                    ['Статус', 'status'],
                    ['Ф. И. О. обучающегося', 'student_name'],
                    ['Ф. И. О. родителя', 'parent_name'],
                    ['Телефон родителя', 'parent_phone'],
                    ['Кружок', 'circle_name'],
                ]}
                data={reformattedData}
                isLoading={isQueriesLoading}
                mainRoute={RoutePath[AppRoutes.QUERY_LIST]}
                searchFields={[
                    'created_at',
                    'student_name',
                    'student_phone',
                    'parent_phone',
                    'parent_name',
                    'circle_name',
                ]}
                customFields={{
                    created_at: ({ text, searchText }) => {
                        const [date, time] = new Intl.DateTimeFormat('pt-BR', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                        })
                            .format(new Date(text))
                            .replaceAll('/', '.')
                            .split(',')

                        return (
                            <div>
                                <div className={styles.additionalTextAddress}>
                                    <HighlightText text={date} searchText={searchText} />
                                </div>

                                <div className={styles.textAddress}>
                                    <HighlightText text={time} searchText={searchText} />
                                </div>
                            </div>
                        )
                    },
                    status: ({ text }) => {
                        return (
                            <Tag color={StatusDictionary[text].antdColor} key={text}>
                                {StatusDictionary[text].text}
                            </Tag>
                        )
                    },
                }}
                filterFields={['circle_name']}
                customFilterFields={{
                    status: {
                        filters: Object.entries(StatusDictionary).map(([key, value]) => ({
                            value: key,
                            text: value.text,
                        })),
                        filteredValue: statuses ?? [],
                        onFilter: (value, record) => {
                            const obj = (record as any)['status']
                            if (!isReactElement(obj)) return obj === value

                            return obj.key === value
                        },
                    },
                    circle_name: {
                        filteredValue: circles ?? [],
                    },
                }}
                sortFields={['created_at']}
                searchRequestText={searchRequestText}
                setSearchRequestText={setSearchRequestText}
                onChange={(pagination, filters, sorter) => {
                    const localStatuses = [...(filters['status'] ?? [])] as string[]
                    setStatuses(localStatuses.length === 0 ? null : localStatuses)
                    const localCircles = [...(filters['circle_name'] ?? [])] as string[]
                    setCircles(localCircles.length === 0 ? null : localCircles)
                }}
            />
        </EmptyWrapper>
    )
}
