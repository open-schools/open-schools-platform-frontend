import React, { useState } from 'react'
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
import { scrollToTop } from '@domains/common/utils/scrollInDirection'
import { useQueryState } from 'next-usequerystate'

export function EmployeeList() {
    const { organizationId } = useOrganization()
    const [searchRequest, setSearchRequest] = useQueryState('search')

    const [paginationParams, setPaginationParams] = useState({
        page: defaultPaginationTablePage,
        pageSize: defaultPaginationTablePageSize,
    })

    const { data, isFetching } = useGetAllEmployeesQuery({
        organization: organizationId,
        or_search: createSearchTextForRequest(searchRequest || '', searchColumns),
        page: paginationParams.page,
        page_size: paginationParams.pageSize,
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
                    current: paginationParams.page,
                    pageSize: paginationParams.pageSize,
                    total: data?.count,
                    onChange: (page, pageSize) => {
                        setPaginationParams({
                            page,
                            pageSize,
                        });
                        scrollToTop();
                    },
                }}
                data={data}
                isLoading={isFetching}
                mainRoute={RoutePath[AppRoutes.EMPLOYEE_LIST]}
                searchFields={searchColumns}
                searchRequestText={searchRequest || ''}
                setSearchRequestText={(text) => setSearchRequest(text)}
            />
        </>
    )
}