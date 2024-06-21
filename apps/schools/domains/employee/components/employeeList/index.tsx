import React, { useCallback, useState } from 'react'
import { Typography } from 'antd'
import router from 'next/router'
import styles from './styles/styles.module.scss'
import { useGetAllEmployeesQuery } from '@domains/employee/redux/employeeApi'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { Button } from '@domains/common/components/button'
import { Table } from '@domains/common/components/table'
import { createSearchTextForRequest } from '@domains/common/utils/searchText'
import { GetListEmployee } from '@domains/employee/redux/interfaces'
import { RowType } from '@domains/employee/components/employeeList/interfaces'
import { searchColumns } from '@domains/employee/components/employeeList/constants'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'
import { defaultPaginationTablePage, defaultPaginationTablePageSize } from '@domains/common/constants/Table'

export function EmployeeList() {
    const [searchRequestText, setSearchRequestText] = useState('')
    const { organizationId } = useOrganization()

    const [state, setState] = useState({
        page: defaultPaginationTablePage,
        pageSize: defaultPaginationTablePageSize,
    })

    const { data, isFetching } = useGetAllEmployeesQuery({
        organization: organizationId,
        or_search: createSearchTextForRequest(searchRequestText, searchColumns),
        page: state.page,
        page_size: state.pageSize,
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
                    onClick={() => router.push(RoutePath[AppRoutes.EMPLOYEE_CREATE])}
                >
                    Добавить сотрудника
                </Button>
            </div>
            <Table<RowType, GetListEmployee>
                columnsTitlesAndKeys={[
                    ['ФИО', 'name'],
                    ['Должность', 'position'],
                    ['Телефон', 'phone'],
                ]}
                pagination={{
                    current: state.page,
                    pageSize: state.pageSize,
                    total: data?.count,
                    onChange: (page, pageSize) => {
                        setState({
                            page,
                            pageSize,
                        })
                        window.scrollTo({ top: 0, left: 0 })
                    },
                }}
                data={data}
                isLoading={isFetching}
                mainRoute={RoutePath[AppRoutes.EMPLOYEE_LIST]}
                searchFields={searchColumns}
                searchRequestText={searchRequestText}
                setSearchRequestText={setSearchRequestText}
            />
        </>
    )
}
