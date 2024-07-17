import React, { useEffect, useState, useCallback } from 'react'
import { TablePaginationConfig, Tag, Typography } from 'antd'
import styles from './styles/styles.module.scss'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { Table } from '@domains/common/components/table'
import { createSearchTextForRequest } from '@domains/common/utils/searchText'
import { RowType, TableType } from './interfaces'
import { searchTicketsColumns, StatusDictionary } from './constants'
import { useGetAllTicketsQuery, useGetTicketsAnalyticsQuery } from '@domains/organization/redux/organizationApi'
import EmptyWrapper from '@domains/common/components/containers/EmptyWrapper'
import { HighlightText } from '@domains/common/components/table/forming'
import { isReactElement } from '@domains/common/utils/react'
import { BubbleFilter } from '@domains/common/components/bubbleFilter'
import { BubbleFilterListItem } from '@domains/common/components/bubbleFilter/interface'
import { useQueryState } from 'next-usequerystate'
import { parseAsArrayOf, parseAsString } from 'next-usequerystate'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'
import Image from 'next/image'
import dot from '@public/icons/dot.svg'
import SearchInput from '@domains/common/components/searchInput'
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface'
import { defaultPaginationTablePage, defaultPaginationTablePageSize } from '@domains/common/constants/Table'
import { scrollToTop } from '@domains/common/utils/scrollInDirection'

type HandleInputChange = (text: React.ChangeEvent<HTMLInputElement> | string) => void
type HandleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<TableType> | SorterResult<TableType>[],
    extra: TableCurrentDataSource<TableType>,
) => void

export function TicketList() {
    const [inputText, setInputText] = useState('')
    const [searchRequestText, setSearchRequestText] = useState('')
    const [isTableLoading, setIsTableLoading] = useState(false)
    const { organizationId } = useOrganization()

    const [statuses, setStatuses] = useQueryState(
        'statuses',
        parseAsArrayOf(parseAsString).withOptions({
            history: 'push',
        }),
    )

    const { data: analytics } = useGetTicketsAnalyticsQuery({
        organization_id: organizationId,
    })

    const bubbleFilterItems: any = {}

    for (const key in StatusDictionary) {
        const obj = StatusDictionary[key]

        bubbleFilterItems[key] = {
            key: key,
            text: obj.text,
            color: obj.color,
            count: analytics ? (analytics['ticket-analytics'] as unknown as { [index: string]: number })[key] : 0,
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

    const { data: tickets, isFetching: isTicketsFetching } = useGetAllTicketsQuery({
        organization_id: organizationId,
        or_search: createSearchTextForRequest(searchRequestText, searchTicketsColumns),
    })

    useEffect(() => {
        if (!isTicketsFetching && tickets) {
            setIsTableLoading(false)
        }
    }, [isTicketsFetching, tickets])

    const handleInputChange: HandleInputChange = useCallback(
        (text) => {
            if (typeof text === 'string') {
                setIsTableLoading(true)
                setInputText(text)
                setTimeout(() => {
                    setSearchRequestText(text)
                }, 1000)
            } else {
                setIsTableLoading(true)
                setInputText(text.target.value)
                setTimeout(() => {
                    setSearchRequestText(text.target.value)
                }, 1000)
            }
        },
        [setIsTableLoading, setInputText, setSearchRequestText],
    )

    const handleChange: HandleChange = useCallback(
        (pagination, filters, sorter) => {
            const localStatuses = [...(filters['status'] ?? [])] as string[]
            setStatuses(localStatuses.length === 0 ? null : localStatuses)
        },
        [setStatuses],
    )

    return (
        <EmptyWrapper
            titleText={'Список обращений пока пуст'}
            descriptionText={'Дождитесь первого обращения'}
            pageTitle={'Обращения'}
            data={tickets}
            isLoading={isTicketsFetching}
            searchTrigger={searchRequestText}
        >
            <div className={styles.header}>
                <Typography.Title level={1}>Обращения</Typography.Title>
            </div>
            <SearchInput onSearchChange={handleInputChange} />
            <BubbleFilter items={Object.values(bubbleFilterItems)} text={`Статусы обращений`} statuses={statuses} />
            <div className={styles.tableTicketList}>
                <Table<RowType, TableType>
                    loading={isTableLoading}
                    customType={'tableWithoutSearch'}
                    columnsTitlesAndKeys={[
                        ['Создано', 'created_at'],
                        ['Статус', 'status'],
                        ['Содержание', 'content'],
                        ['Семья', 'sender'],
                    ]}
                    customWidths={[10, 10, 40, 30]}
                    data={tickets}
                    isLoading={isTicketsFetching}
                    mainRoute={RoutePath[AppRoutes.TICKETS_LIST]}
                    searchFields={['created_at', 'content', 'sender']}
                    customFields={{
                        created_at: ({ text, searchText, index }) => {
                            const [date, time] = new Intl.DateTimeFormat('pt-BR', {
                                dateStyle: 'short',
                                timeStyle: 'short',
                            })
                                .format(new Date(text))
                                .replaceAll('/', '.')
                                .split(',')

                            return (
                                <div className={styles.createdAtContainer}>
                                    {(tickets?.results[index] as TableType).unread_sender_comments_count > 0 && (
                                        <div className={styles.unreadPoint}>
                                            <Image src={dot} alt={'Unread dot'} />
                                        </div>
                                    )}
                                    <div className={styles.dateContainer}>
                                        <div className={styles.additionalTextAddress}>
                                            <HighlightText text={date} searchText={searchText} />
                                        </div>

                                        <div className={styles.textAddress}>
                                            <HighlightText text={time} searchText={searchText} />
                                        </div>
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
                    }}
                    sortFields={['created_at']}
                    searchRequestText={searchRequestText}
                    setSearchRequestText={setSearchRequestText}
                    onChange={handleChange}
                />
            </div>
        </EmptyWrapper>
    )
}
