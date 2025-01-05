import React, { useState } from 'react'
import { Typography } from 'antd'
import router from 'next/router'
import styles from './styles/styles.module.scss'
import { useGetAllTeachersQuery } from '@domains/Teacher/redux/TeacherApi'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { Button } from '@domains/common/components/button'
import { Table } from '@domains/common/components/table'
import { createSearchTextForRequest } from '@domains/common/utils/searchText'
import { GetListTeacher } from '@domains/Teacher/redux/interfaces'
import { RowType } from '@domains/Teacher/components/teacherList/interfaces'
import { searchColumns } from '@domains/Teacher/components/teacherList/constants'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'
import { useQueryState } from 'next-usequerystate'
import { scrollToTop } from '@domains/common/utils/scrollInDirection'

export function TeacherList() {
    const [searchRequest, setSearchRequest] = useQueryState('search')
    const { organizationId } = useOrganization()

    const { data, isFetching } = useGetAllTeachersQuery({
        organization: organizationId,
        or_search: createSearchTextForRequest(searchRequest || '', searchColumns),
    })

    return (
        <>
            <div className={styles.header}>
                <Typography.Title level={1}>Преподаватели</Typography.Title>
                <Button
                    type='schoolDefault'
                    block
                    style={{ width: '14%' }}
                    className={styles.button}
                    onClick={() => router.push(RoutePath[AppRoutes.Teacher_CREATE])}
                >
                    Добавить преподавателя
                </Button>
            </div>
            <Table<RowType, GetListTeacher>
                columnsTitlesAndKeys={[
                    ['ФИО', 'name'],
                    ['Должность', 'position'],
                    ['Телефон', 'phone'],
                ]}
                data={data}
                isLoading={isFetching}
                mainRoute={RoutePath[AppRoutes.Teacher_LIST]}
                searchFields={searchColumns}
                searchRequestText={searchRequest || ''}
                setSearchRequestText={(text) => setSearchRequest(text)}
            />
        </>
    )
}
