import React, { useState } from 'react'
import { Typography } from 'antd'
import router from 'next/router'
import styles from './styles/styles.module.scss'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { Button } from '@domains/common/components/button'
import { Table } from '@domains/common/components/table'
import { createSearchTextForRequest } from '@domains/common/utils/searchText'
import { RowType, TableType } from './interfaces'
import { searchStudentsColumns } from './constants'
import { useGetAllCirclesQuery } from '@domains/organization/redux/organizationApi'
import EmptyWrapper from '@domains/common/components/containers/EmptyWrapper'
import { HighlightText } from '@domains/common/components/table/forming'
import { getVarsForAddressColumn } from '@domains/common/utils/geo'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'
import { useQueryState } from 'next-usequerystate'

export function CircleList() {
    const [searchRequestText, setSearchRequestText] = useQueryState('search')
    const { organizationId } = useOrganization()

    const { data: circles, isFetching: isFetching } = useGetAllCirclesQuery({
        organization_id: organizationId,
        or_search: createSearchTextForRequest(searchRequestText || '', searchStudentsColumns),
    })

    return (
        <EmptyWrapper
            titleText={'Список кружков пока пуст'}
            descriptionText={'Вы можете добавить их, нажав на кнопку'}
            buttonText={'Добавить кружок'}
            pageTitle={'Кружки'}
            data={circles}
            isLoading={isFetching}
            handleRunTask={() => router.push(RoutePath[AppRoutes.CIRCLE_CREATE])}
            searchTrigger={searchRequestText || ''}
        >
            <div className={styles.header}>
                <Typography.Title level={1}>Кружки</Typography.Title>
                <Button
                    type='schoolDefault'
                    block
                    className={styles.button}
                    onClick={() => router.push(RoutePath[AppRoutes.CIRCLE_CREATE])}
                >
                    Добавить кружок
                </Button>
            </div>
            <Table<RowType, TableType>
                columnsTitlesAndKeys={[
                    ['Название', 'name'],
                    ['Адрес', 'address'],
                    ['Кол-во принятых заявок', 'accepted_count'],
                ]}
                data={circles}
                isLoading={isFetching}
                mainRoute={RoutePath[AppRoutes.CIRCLE_LIST]}
                searchFields={['name', 'address']}
                customFields={{
                    address: ({ text, searchText }) => {
                        const [address, additional_text] = getVarsForAddressColumn(text ?? '')

                        return (
                            <div>
                                <div className={styles.additionalTextAddress}>
                                    <HighlightText text={additional_text ?? ''} searchText={searchText} />
                                </div>

                                <div className={styles.textAddress}>
                                    <HighlightText text={address ?? ''} searchText={searchText} />
                                </div>
                            </div>
                        )
                    },
                }}
                customWidths={[60, 25, 15]}
                searchRequestText={searchRequestText || ''}
                setSearchRequestText={(text) => setSearchRequestText(text)}
                rowClassName={styles.tableRowPointer}
            />
        </EmptyWrapper>
    )
}
