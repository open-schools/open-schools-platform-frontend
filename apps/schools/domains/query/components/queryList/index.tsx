import React, { useEffect, useState, useCallback, useMemo } from 'react'
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
import { HighlightText } from '@domains/common/components/table/forming'
import { isReactElement } from '@domains/common/utils/react'
import { sumObjectValues } from '@domains/common/utils/sumObjectValues'
import { BubbleFilter } from '@domains/common/components/bubbleFilter'
import { BubbleFilterListItem } from '@domains/common/components/bubbleFilter/interface'
import { useQueryState } from 'next-usequerystate'
import { parseAsArrayOf, parseAsString } from 'next-usequerystate'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'
import SearchInput from '@domains/common/components/searchInput'
import { defaultPaginationTablePage, defaultPaginationTablePageSize } from '@domains/common/constants/Table'
import { scrollToTop } from '@domains/common/utils/scrollInDirection'

export function QueryList() {
    const { organizationId } = useOrganization()
    const [searchRequestText, setSearchRequestText] = useState('')
    const [isTableLoading, setIsTableLoading] = useState(false)

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

    const { data: analytics, isLoading: isAnalyticsLoading } = useGetOrganizationAnalyticsQuery({
        organization_id: organizationId,
    })

    const bubbleFilterItems = useMemo(() => {
        const items: Record<string, BubbleFilterListItem> = {}
        for (const key in StatusDictionary) {
            const obj = StatusDictionary[key]
            items[key] = {
                key,
                text: obj.text,
                color: obj.color,
                count: analytics ? (analytics.analytics as unknown as { [index: string]: number })[key] : 0,
                isSelected: statuses?.includes(key) ?? false,
                onClick: () => {
                    setStatuses((x) => [...(x ?? []), key])
                },
                onExit: () => {
                    setStatuses((x) => {
                        const res = [...(x ?? []).filter((y) => y !== key)]
                        return res.length === 0 ? null : res
                    })
                },
            }
        }
        return items
    }, [analytics, statuses])

    const [paginationParams, setPaginationParams] = useState({
        page: defaultPaginationTablePage,
        pageSize: defaultPaginationTablePageSize,
    })

    const { data: queries, isFetching: isQueriesFetching } = useGetAllJoinCircleQueriesQuery({
        circle__organization__id: organizationId,
        or_search: createSearchTextForRequest(searchRequestText, searchStudentsColumns),
        page: paginationParams.page,
        page_size: paginationParams.pageSize,
    })

    const countAllQueries = useMemo(
        () => (!isAnalyticsLoading && analytics ? sumObjectValues(analytics.analytics) : 0),
        [analytics, isAnalyticsLoading],
    )

    useEffect(() => {
        if (!isQueriesFetching && queries) {
            setIsTableLoading(false)
        }
    }, [isQueriesFetching, queries])

    const handleSearchChange = useCallback((value: string) => {
        setIsTableLoading(true)
        setTimeout(() => {
            setSearchRequestText(value)
        }, 1000)
    }, [])

    return (
        <EmptyWrapper
            titleText={'Список заявок пока пуст'}
            descriptionText={'Дождитесь первой заявки'}
            pageTitle={'Заявки'}
            data={queries}
            isLoading={isQueriesFetching}
            searchTrigger={searchRequestText}
        >
            <div className={styles.header}>
                <Typography.Title level={1}>Заявки</Typography.Title>
            </div>
            <SearchInput onSearchChange={handleSearchChange} />
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
                pagination={{
                    current: paginationParams.page,
                    pageSize: paginationParams.pageSize,
                    total: queries?.count,
                    onChange: (page, pageSize) => {
                        setPaginationParams({
                            page,
                            pageSize,
                        })
                        scrollToTop()
                    },
                }}
                data={queries}
                isLoading={isQueriesFetching}
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
                            <Tag color={StatusDictionary[text].antdColor} className={styles.tags} key={text}>
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
