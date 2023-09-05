import React, { useState, useEffect } from 'react'
import { Table as DefaultTable } from 'antd'
import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { objectReBuilder, useGenerateFullColumns } from '@domains/common/components/table/forming'
import { Input } from '@domains/common/components/input'
import styles from './styles/styles.module.scss'
import { useRouter } from 'next/router'
import { typeTable } from '@domains/common/constants/Table'
import { CustomTableProps } from '@domains/common/components/table/interfaces'
import { calculateAverageWidth } from '@domains/common/utils/calculateAverageWidth'
import { ColumnType } from 'antd/lib/table/interface'

export const Table = <RowType, DataItemType>(props: CustomTableProps<RowType, DataItemType>) => {
    const {
        customType = 'tableWithSearch',
        customFields = {},
        filterFields,
        columnsTitlesAndKeys,
        data,
        isLoading,
        searchFields,
        searchRequestText,
        setSearchRequestText,
        mainRoute,
        needNumbering,
        customWidths,
        ...restProps
    } = props

    let baseColumns: any[]

    if (customWidths && customWidths.length !== columnsTitlesAndKeys.length) {
        throw new Error('Длина customWidths должна соответствовать длине columnsTitlesAndKeys.')
    }

    if (!customWidths) {
        baseColumns = columnsTitlesAndKeys.map(([title, key]) => ({
            dataIndex: key,
            key,
            title,
            width: calculateAverageWidth(columnsTitlesAndKeys.map(([title]) => title)),
        }))
    } else {
        baseColumns = columnsTitlesAndKeys.map(([title, key], index: number) => ({
            dataIndex: key,
            key,
            title,
            width: `${customWidths[index]}%`,
        }))
    }

    const columnsWithIndex = [
        {
            title: 'Номер',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            width: '5%',
        },
        ...baseColumns,
    ]

    const [isTableLoading, setIsTableLoading] = useState(false)
    const [inputText, setInputText] = useState('')
    const [dataSource, setDataSource] = useState<any[]>([])
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && data) {
            const result = objectReBuilder<DataItemType>(
                data.results,
                columnsTitlesAndKeys.map((x) => x[1]),
                searchFields,
                searchRequestText,
                customFields,
                true,
            )

            if (needNumbering) {
                const numberedResult = result.map((item, index) => ({
                    ...item,
                    index: index + 1,
                }))

                setDataSource(numberedResult)
            } else {
                setDataSource(result)
            }
            setIsTableLoading(false)
        }
    }, [isLoading, data, searchRequestText])

    const columns = useGenerateFullColumns<RowType>(baseColumns, data ? data?.results : [], filterFields)

    if (typeTable.includes(customType)) {
        return (
            <>
                <DefaultTable
                    loading={isTableLoading || isLoading}
                    className={styles.tableContainer}
                    columns={needNumbering ? (columnsWithIndex as ColumnType<RowType>[]) : columns}
                    dataSource={dataSource}
                    rowKey={(record) => record.id}
                    onRow={(element) => {
                        return {
                            onClick: () => {
                                router.push(`${mainRoute}/${element.id}`)
                            },
                        }
                    }}
                    {...restProps}
                />
            </>
        )
    } else {
        return (
            <>
                <Input
                    onChange={(text) => {
                        setIsTableLoading(true)
                        setInputText(text.target.value)
                        setTimeout(() => {
                            setSearchRequestText(text.target.value)
                        }, 1000)
                    }}
                    customType={'inputSearch'}
                    placeholder={'Поиск'}
                    value={inputText}
                    children={
                        <>
                            <SearchOutlined className={styles.search} />
                            {inputText && (
                                <CloseCircleOutlined
                                    className={styles.cross}
                                    onClick={() => {
                                        setInputText('')
                                        setSearchRequestText('')
                                    }}
                                />
                            )}
                        </>
                    }
                />
                <DefaultTable
                    loading={isTableLoading || isLoading}
                    className={styles.tableContainer}
                    columns={needNumbering ? (columnsWithIndex as ColumnType<RowType>[]) : columns}
                    dataSource={dataSource}
                    rowKey={(record) => record.id}
                    onRow={(element) => {
                        return {
                            onClick: () => {
                                router.push(`${mainRoute}/${element.id}`)
                            },
                        }
                    }}
                    {...restProps}
                />
            </>
        )
    }
}
