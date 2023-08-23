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
import { QueryStatuses } from '@domains/common/constants/Enums'
import EmptyWrapper from '@domains/common/components/containers/EmptyWrapper'

export function StudentList() {
    const [searchRequestText, setSearchRequestText] = useState('')
    const { organizationId } = useOrganization()

    const { data: invites, isLoading: isLoadingInvites } = useGetAllStudentInvitationsQuery({
        circle__organization__id: organizationId,
        status: QueryStatuses.SENT,
        or_search: createSearchTextForRequest(searchRequestText, searchInvitesColumns),
    })

    const { data: students, isLoading: isLoadingStudents } = useGetAllStudentsQuery({
        circle__organization: organizationId,
        or_search: createSearchTextForRequest(searchRequestText, searchStudentsColumns),
    })

    const data = {
        count: (invites?.count ?? 0) + (students?.count ?? 0),
        next: invites?.next ?? '',
        previous: invites?.previous ?? '',
        results: (invites?.results ?? [])
            .map(
                (x) =>
                    ({
                        id: x.body.id,
                        student_name: x.body.name,
                        student_phone: x.additional.phone,
                        parent_phone: x.recipient.parent_phones.replaceAll(',', '\n'),
                        circle_name: x.sender.name,
                    }) as RowType,
            )
            .concat(
                (students?.results ?? []).map(
                    (x) =>
                        ({
                            id: x.id,
                            student_name: x.name,
                            student_phone: x.student_profile.phone,
                            parent_phone: x.student_profile.parent_phones.replaceAll(',', '\n'),
                            circle_name: x.circle.name,
                        }) as RowType,
                ),
            ),
    }

    return (
        <EmptyWrapper
            titleText={'Список обучающихся пока пуст'}
            descriptionText={'Вы можете добавить их, нажав на кнопку'}
            buttonText={'Добавить обучающегося'}
            pageTitle={'Обучающиеся'}
            data={data}
            isLoading={isLoadingStudents || isLoadingInvites}
            handleRunTask={() => router.push('/student/create')}
            searchTrigger={searchRequestText}
        >
            <div className={styles.header}>
                <Typography.Title level={1}>Обучающиеся</Typography.Title>
                <Button
                    type='schoolDefault'
                    block
                    style={{ width: '14%' }}
                    className={styles.button}
                    onClick={() => router.push('/student/create')}
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
                data={data}
                isLoading={isLoadingInvites || isLoadingStudents}
                mainRoute={'/student'}
                searchFields={['student_name', 'student_phone', 'parent_phone', 'circle_name']}
                searchRequestText={searchRequestText}
                setSearchRequestText={setSearchRequestText}
            />
        </EmptyWrapper>
    )
}
