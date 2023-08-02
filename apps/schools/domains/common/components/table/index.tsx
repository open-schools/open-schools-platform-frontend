import { ColumnType, FilterConfirmProps } from 'antd/lib/table/interface'
import React, { useState } from 'react'
import { Button, Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export interface RawColumnType<DataType> extends ColumnType<DataType> {
    hidden?: boolean
    dataIndex: string
}

export function useGenerateFullColumns<DataType>(baseColumns: RawColumnType<DataType>[]): ColumnType<DataType>[] {
    const filterFunctions = useFilterItems<DataType>()
    return baseColumns.map((column) => ({
        ...column,
        ...filterFunctions(column.dataIndex as keyof DataType),
    }))
}

export function useFilterItems<RowDataType>(): (dataIndex: keyof RowDataType) => ColumnType<RowDataType> {
    const [_, setSearchText] = useState('')
    const [__, setSearchedColumn] = useState('')

    const getColumnSearchProps = (dataIndex: keyof RowDataType): ColumnType<RowDataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Поиск`}
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    onBlur={() => {
                        handleSearch(selectedKeys as string[], confirm, dataIndex)
                    }}
                    style={{ marginBottom: 8, display: 'block' }}
                />

                <Space>
                    <Button
                        onClick={() => {
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }}
                        type='primary'
                        size='small'
                        style={{ width: 90 }}
                    >
                        Поиск
                    </Button>{' '}
                    <Button
                        onClick={() => {
                            clearFilters && handleReset(clearFilters)
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Очистить
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            (record[dataIndex] as any)
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
    })

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: keyof RowDataType,
    ) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex.toString())
    }

    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText('')
    }
    return getColumnSearchProps
}

function getFiniteValue(obj: any, searchFields: Array<String>) {
    let newObj: any = {}
    getProp(obj)

    function getProp(o: any) {
        for (let prop in o) {
            if (typeof o[prop] === 'object') {
                getProp(o[prop])
            } else {
                searchFields.forEach((item) => {
                    if (item == prop) {
                        newObj[prop] = o[prop]
                    }
                })
            }
        }
    }
    return newObj
}

export function objectReBuilder(data: Array<Object>, searchFields: Array<String>): Array<Object> {
    let resultArray: Array<Object> = []

    data.forEach((item: any) => {
        resultArray.push(getFiniteValue(item, searchFields))
    })

    return resultArray
}
