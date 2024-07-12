import React, { useCallback, useEffect, useState } from 'react'
import { Typography } from 'antd'
import router from 'next/router'
import styles from './styles/styles.module.scss'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { Button } from '@domains/common/components/button'
import { Table } from '@domains/common/components/table'
import { createSearchTextForRequest } from '@domains/common/utils/searchText'
import { RowType, TableType } from './interfaces'
import { searchInvitesColumns, searchStudentsColumns } from './constants'
import { useGetAllStudentInvitationsQuery, useGetAllStudentsQuery } from '@domains/organization/redux/organizationApi'
import { StatusesEnum } from '@domains/common/constants/Enums'
import EmptyWrapper from '@domains/common/components/containers/EmptyWrapper'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'
import { defaultPaginationTablePage, defaultPaginationTablePageSize } from '@domains/common/constants/Table'
import { scrollToTop } from '@domains/common/utils/scrollInDirection'
import { handlePaginationChange } from '@domains/common/handlers/paginationChange'
import { calculateResults } from '@domains/student/handlers/resultsCalculate'

export function StudentList() {
    const [queryPaginationParams, setQueryPaginationParams] = useState({
        invites: {
            page: defaultPaginationTablePage,
            pageSize: defaultPaginationTablePageSize,
        },
        students: {
            page: defaultPaginationTablePage,
            pageSize: defaultPaginationTablePageSize,
        },
    })

    const [searchRequestText, setSearchRequestText] = useState('')
    const { organizationId } = useOrganization()

    const { data: invites, isLoading: isLoadingInvites } = useGetAllStudentInvitationsQuery({
        circle__organization__id: organizationId,
        status: StatusesEnum.SENT,
        or_search: createSearchTextForRequest(searchRequestText, searchInvitesColumns),
        page: queryPaginationParams.invites.page,
        page_size: queryPaginationParams.invites.pageSize,
    })

    const { data: students, isFetching: isFetchingStudents } = useGetAllStudentsQuery({
        circle__organization: organizationId,
        or_search: createSearchTextForRequest(searchRequestText, searchStudentsColumns),
        page: queryPaginationParams.students.page,
        page_size: queryPaginationParams.students.pageSize,
    })

    const [paginationParams, setPaginationParams] = useState({
        page: defaultPaginationTablePage,
        pageSize: defaultPaginationTablePageSize,
    })

    const resultsCalculate = useCallback(
        () => calculateResults(paginationParams, invites, students),
        [paginationParams, invites, students],
    )

    const data = {
        count: (invites?.count ?? 0) + (students?.count ?? 0),
        next: invites?.next ?? '',
        previous: invites?.previous ?? '',
        results: resultsCalculate(),
    }

    const handlePageChange = (newPage: number, newPageSize: number) => {
        handlePaginationChange(
            setPaginationParams,
            setQueryPaginationParams,
            invites?.count,
            newPage,
            newPageSize,
            defaultPaginationTablePage,
            defaultPaginationTablePageSize,
            scrollToTop,
        )
    }

    return (
        <EmptyWrapper
            titleText={'Список обучающихся пока пуст'}
            descriptionText={'Вы можете добавить их, нажав на кнопку'}
            buttonText={'Добавить обучающегося'}
            pageTitle={'Обучающиеся'}
            data={data}
            isLoading={isFetchingStudents || isLoadingInvites}
            handleRunTask={() => router.push(RoutePath[AppRoutes.STUDENT_CREATE])}
            searchTrigger={searchRequestText}
        >
            <div className={styles.header}>
                <Typography.Title level={1}>Обучающиеся</Typography.Title>
                <Button
                    type='schoolDefault'
                    block
                    style={{ width: '14%' }}
                    className={styles.button}
                    onClick={() => router.push(RoutePath[AppRoutes.STUDENT_CREATE])}
                >
                    Добавить обучающегося
                </Button>
            </div>
            <Table<RowType, TableType>
                columnsTitlesAndKeys={[
                    ['ФИО', 'student_name'],
                    ['Кружок', 'circle_name'],
                    ['Телефон обучающегося', 'student_phone'],
                    ['Телефон родителя', 'parent_phone'],
                ]}
                pagination={{
                    current: paginationParams.page,
                    pageSize: paginationParams.pageSize,
                    total:
                        Math.ceil((invites?.count ?? 0) / paginationParams.pageSize) * paginationParams.pageSize +
                        Math.ceil((students?.count ?? 0) / paginationParams.pageSize) * paginationParams.pageSize,
                    onChange: (page, pageSize) => {
                        handlePageChange(page, pageSize)
                    },
                }}
                filterFields={['circle_name']}
                data={data}
                isLoading={isLoadingInvites || isFetchingStudents}
                mainRoute={RoutePath[AppRoutes.STUDENT_LIST]}
                searchFields={['student_name', 'student_phone', 'parent_phone', 'circle_name']}
                searchRequestText={searchRequestText}
                setSearchRequestText={setSearchRequestText}
            />
        </EmptyWrapper>
    )
}
