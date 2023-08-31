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
import { mapReturnedData } from '@domains/common/redux/utils'
import { HighlightText } from '@domains/common/components/table/forming'
import { getVarsForAddressColumn } from '@domains/student/components/studentList/utils'

export function CircleList() {
    const [searchRequestText, setSearchRequestText] = useState('')
    const { organizationId } = useOrganization()

    const { data: circles, isLoading: isLoading } = useGetAllCirclesQuery({
        organization_id: organizationId,
        or_search: createSearchTextForRequest(searchRequestText, searchStudentsColumns),
    })

    const reformattedData = mapReturnedData(circles, (circle) => {
        const transformedCircle = structuredClone(circle) as unknown as TableType
        transformedCircle.accepted_count = circle.student_profile_queries.ACCEPTED
        return transformedCircle
    })

    return (
        <EmptyWrapper
            titleText={'Список кружков пока пуст'}
            descriptionText={'Вы можете добавить их, нажав на кнопку'}
            buttonText={'Добавить кружок'}
            pageTitle={'Кружки'}
            data={circles}
            isLoading={isLoading}
            handleRunTask={() => router.push('/circle/create')}
            searchTrigger={searchRequestText}
        >
            <div className={styles.header}>
                <Typography.Title level={1}>Кружки</Typography.Title>
                <Button
                    type='schoolDefault'
                    block
                    className={styles.button}
                    onClick={() => router.push('/circle/create')}
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
                data={reformattedData}
                isLoading={isLoading}
                mainRoute={'/student'}
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
                searchRequestText={searchRequestText}
                setSearchRequestText={setSearchRequestText}
            />
        </EmptyWrapper>
    )
}
