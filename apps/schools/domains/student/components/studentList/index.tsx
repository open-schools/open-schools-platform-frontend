import React, { useState } from 'react'
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

export function StudentList() {
    const [invitesPaginationParams, setInvitesPaginationParams] = useState({
        page: defaultPaginationTablePage,
        pageSize: defaultPaginationTablePageSize,
    })

    const [studentsPaginationParams, setStudentsPaginationParams] = useState({
        page: defaultPaginationTablePage,
        pageSize: defaultPaginationTablePageSize,
    })

    const [searchRequestText, setSearchRequestText] = useState('')
    const { organizationId } = useOrganization()

    const { data: invites, isLoading: isLoadingInvites } = useGetAllStudentInvitationsQuery({
        circle__organization__id: organizationId,
        status: StatusesEnum.SENT,
        or_search: createSearchTextForRequest(searchRequestText, searchInvitesColumns),
        page: invitesPaginationParams.page,
        page_size: invitesPaginationParams.pageSize,
    })

    const { data: students, isFetching: isFetchingStudents } = useGetAllStudentsQuery({
        circle__organization: organizationId,
        or_search: createSearchTextForRequest(searchRequestText, searchStudentsColumns),
        page: studentsPaginationParams.page,
        page_size: studentsPaginationParams.pageSize,
    })

    const data = {
        count: (invites?.count ?? 0) + (students?.count ?? 0),
        next: invites?.next ?? '',
        previous: invites?.previous ?? '',
        results: [...(invites?.results ?? []), ...(students?.results ?? [])].map((x) => {
            if ('body' in x) {
                return {
                    id: x.body.id,
                    student_name: x.body.name,
                    student_phone: x.additional.phone,
                    parent_phone: x.recipient.parent_phones.replaceAll(',', '\n'),
                    circle_name: x.sender.name,
                } as RowType
            } else {
                return {
                    id: x.id,
                    student_name: x.name,
                    student_phone: x.student_profile.phone,
                    parent_phone: x.student_profile.parent_phones?.replaceAll(',', '\n'),
                    circle_name: x.circle.name,
                } as RowType
            }
        }),
    }

    const [currentPage, setCurrentPage] = useState(defaultPaginationTablePage)
    const [currentPageSize, setCurrentPageSize] = useState(defaultPaginationTablePageSize)

    const handlePageChange = (newPage: number, newPageSize: number) => {
        setCurrentPage(newPage)
        setCurrentPageSize(newPageSize)

        if (newPage <= Math.ceil(invites?.count ?? 0 / defaultPaginationTablePageSize)) {
            setInvitesPaginationParams({ page: newPage, pageSize: newPageSize })
        } else {
            const invitesCount = invites?.count ?? 0
            const studentsPage =
                Math.ceil((newPage * defaultPaginationTablePageSize - invitesCount) / defaultPaginationTablePageSize) +
                1
            setStudentsPaginationParams({ page: studentsPage, pageSize: newPageSize })
        }
        scrollToTop()
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
                    current: currentPage,
                    pageSize: currentPageSize,
                    total: data.count,
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
