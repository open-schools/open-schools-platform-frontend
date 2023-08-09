import React, { useState } from 'react'
import { Typography } from 'antd'
import router from 'next/router'
import styles from './styles/styles.module.scss'
import { useGetAllEmployeesQuery } from '@domains/employee/redux/employeeApi'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { Button } from '@domains/common/components/button'
import { searchColumns } from '@domains/common/constants/Table'
import { Table } from '@domains/common/components/table'
import { createSearchTextForRequest } from '@domains/common/utils/searchText'

export function EmployeeList() {
    const [searchRequestText, setSearchRequestText] = useState('')
    const { organizationId } = useOrganization()

    const { data, isLoading } = useGetAllEmployeesQuery({
        organization: organizationId,
        or_search: createSearchTextForRequest(searchRequestText, searchColumns),
    })

    return (
        <>
            <div className={styles.header}>
                <Typography.Title level={1}>Сотрудники</Typography.Title>
                <Button
                    type='schoolDefault'
                    block
                    style={{ width: '14%' }}
                    className={styles.button}
                    onClick={() => router.push('/employee/create')}
                >
                    Добавить сотрудника
                </Button>
            </div>
            <Table
                columnsTitles={['ФИО', 'Должность', 'Телефон']}
                columnsKeys={['name', 'position', 'phone']}
                data={data}
                isLoading={isLoading}
                mainRoute={'/employee'}
                searchFields={searchColumns}
                searchRequestText={searchRequestText}
                setSearchRequestText={setSearchRequestText}
            />
        </>
    )
}
