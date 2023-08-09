import React, { useState, useEffect } from 'react'
import { Table as DefaultTable } from 'antd'
import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { objectReBuilder, useGenerateFullColumns } from '@domains/common/components/table/forming'
import { Input } from '@domains/common/components/input'
import styles from './styles/styles.module.scss'
import { useRouter } from 'next/router'
import { typeTable } from '@domains/common/constants/Table'
import { CustomTableProps, DataType } from '@domains/common/components/table/interfaces'
import { calculateAverageWidth } from '@domains/common/utils/calculateAverageWidth'

export const Table: React.FC<CustomTableProps> = (props) => {
    const {
        customType = 'tableWithSearch',
        columnsTitles,
        columnsKeys,
        data,
        isLoading,
        searchFields,
        searchRequestText,
        setSearchRequestText,
        mainRoute,
        ...restProps
    } = props

    const baseColumns = columnsTitles.map((title, index) => ({
        dataIndex: columnsKeys[index],
        key: columnsKeys[index],
        title: title,
        width: calculateAverageWidth(columnsTitles),
    }))

    const [isTableLoading, setIsTableLoading] = useState(false)
    const [inputText, setInputText] = useState('')
    const [dataSource, setDataSource] = useState<any[]>([])
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && data) {
            const result = objectReBuilder(data.results, searchFields, searchRequestText, true)
            setDataSource(result)
            setIsTableLoading(false)
        }
    }, [isLoading, data, searchRequestText])

    const columns = useGenerateFullColumns<DataType>(baseColumns)

    if (typeTable.includes(customType)) {
        return (
            <>
                <DefaultTable
                    loading={isTableLoading || isLoading}
                    className={styles.tableContainer}
                    columns={columns}
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
                            <CloseCircleOutlined
                                className={styles.cross}
                                onClick={() => {
                                    setInputText('')
                                    setSearchRequestText('')
                                }}
                            />
                        </>
                    }
                />
                <DefaultTable
                    loading={isTableLoading || isLoading}
                    className={styles.tableContainer}
                    columns={columns}
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
