import React, { useState, useEffect } from 'react'
import { Table, Skeleton, Typography } from 'antd'
import router from 'next/router'
import styles from './styles/styles.module.scss'
import { useGetAllEmployeesQuery } from '../../redux/employeeApi'
import { objectReBuilder, RawColumnType, useGenerateFullColumns } from '../../../common/utils/table'
import { useOrganization } from '../../../user/providers/organizationProvider'
import { Button } from '../../../common/components/button'
import { Input } from '../../../common/components/input'
import { SearchOutlined } from '@ant-design/icons'

interface DataType {
    id: string;
    name: string;
    position: string;
    phone: string;
}

const baseColumns: RawColumnType<DataType>[] = [
    {
        dataIndex: 'id',
        key: 'id',
        hidden: true,
    },
    {
        title: 'ФИО',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
    },

    {
        title: 'Должность',
        dataIndex: 'position',
        key: 'position',
        width: '30%',
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
        width: '30%',
    },
].filter((item) => !item.hidden)


export function EmployeeList () {
    const [dataSource, setDataSource] = useState<any[]>([])
    const [skip, setSkip] = useState(true)
    const { organizationId } = useOrganization()
    const [organization, setOrganization] = useState('')
    const searchFields = ['name', 'position', 'phone', 'id']
    const { data, isLoading } = useGetAllEmployeesQuery({ organization: organization }, { skip: skip })

    useEffect(() => {
        if (organizationId) {
            setSkip(!skip)
            setOrganization(organizationId)
        }
    }, [organizationId])

    useEffect(() => {
        if (!isLoading && data) {
            const result = objectReBuilder(data.results, searchFields)
            setDataSource(result)
        }
    }, [isLoading, data])

    const columns = useGenerateFullColumns<DataType>(baseColumns)

    return (
        <>
            {isLoading ? (
                <Skeleton active/>
            ) : (
                <>
                    <div
                        className={styles.header}
                    >
                        <Typography.Title level={1}>Сотрудники</Typography.Title>
                        <Button
                            type="schoolDefault"
                            block
                            style={{ width: '14%' }}
                            className={styles.button}
                            onClick={() => router.push('/employee/create')}
                        >
                            Добавить сотрудника
                        </Button>
                    </div>
                    <Input
                        customType={'inputSearch'}
                        placeholder={'Поиск'}
                        children={<SearchOutlined style={{ fontSize: '150%', position: 'absolute', right: '30px' }} />}
                    />
                    <Table
                        className={styles.tableContainer}
                        columns={columns}
                        dataSource={dataSource}
                        rowKey={record => record.id}
                        onRow={(element: DataType) => {
                            return {
                                onClick: () => {
                                    router.push(`/employee/${element.id}`)
                                },
                            }
                        }}
                    />
                </>
            )}
        </>
    )
}
