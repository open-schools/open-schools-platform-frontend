import React, { useState, useEffect } from 'react'
import { Table, Skeleton, Typography } from 'antd'
import router from 'next/router'
import styles from './styles/styles.module.scss'
import { useGetAllEmployeesQuery } from '@domains/employee/redux/employeeApi'
import { objectReBuilder, RawColumnType, useGenerateFullColumns } from '@domains/common/components/table/forming'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { Button } from '@domains/common/components/button'
import { Input } from '@domains/common/components/input'
import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { search } from '@domains/common/constants/Table'

interface DataType {
    id: string
    name: string
    position: string
    phone: string
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

export function EmployeeList() {
    const [isTableLoading, setIsTableLoading] = useState(false)
    const [inputText, setInputText] = useState('')
    const [searchRequestText, setSearchRequestText] = useState('')
    const [dataSource, setDataSource] = useState<any[]>([])
    const { organizationId } = useOrganization()
    const searchFields = ['name', 'position', 'phone', 'id']


    const { data, isLoading } = useGetAllEmployeesQuery({
        organization: organizationId,
        or_search: `${searchRequestText}:[${search.map((e: string) => e)}]`,
    })

    useEffect(() => {
        if (!isLoading && data) {
            const result = objectReBuilder(data.results, searchFields, searchRequestText)
            setDataSource(result)
            setIsTableLoading(false)
        }
    }, [isLoading, data])

    const columns = useGenerateFullColumns<DataType>(baseColumns)

    return (
        <>
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
                <Input
                    onChange={(text) => {
                        setIsTableLoading(true)
                        setInputText(text.target.value)
                        setTimeout(() =>{
                            setSearchRequestText(text.target.value)
                        }, 1000)
                    }}
                    customType={'inputSearch'}
                    placeholder={'Поиск'}
                    value={inputText}
                    children={
                        <>
                            <SearchOutlined className={styles.search} />
                            <CloseCircleOutlined className={styles.cross} onClick={() => {
                                setInputText('')
                                setSearchRequestText('')
                            }} />
                        </>
                    }
                />
                <Table
                    loading={isTableLoading || isLoading}
                    className={styles.tableContainer}
                    columns={columns}
                    dataSource={dataSource}
                    rowKey={(record) => record.id}
                    onRow={(element: DataType) => {
                        return {
                            onClick: () => {
                                router.push(`/employee/${element.id}`)
                            },
                        }
                    }}
                />
            </>
        </>
    )
}
