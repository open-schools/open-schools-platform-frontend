import { ColumnType } from 'antd/lib/table/interface'
import React from 'react'
import styles from './styles/styles.module.scss'
import { getSearchText } from '@domains/common/utils/searchText'
import {
    CustomFieldsProps,
    CustomFilterFieldsProps,
    HighlightTextProps,
} from '@domains/common/components/table/interfaces'
import { filterTextShaper } from '@domains/common/utils/filterTextShaper'
import { isReactElement } from '@domains/common/utils/react'

export interface RawColumnType<RowType> extends ColumnType<RowType> {
    hidden?: boolean
    dataIndex: string
}

export function useGenerateFullColumns<RowType>(
    baseColumns?: RawColumnType<RowType>[],
    data?: any[],
    filterFields?: string[],
    sortFields?: string[],
    customFilterFields?: CustomFilterFieldsProps<RowType>,
): ColumnType<RowType>[] {
    const uniqueFilters: Record<string, any[]> = {}

    if (!filterFields) {
        filterFields = []
    }

    for (const field of filterFields) {
        const uniqueValues = Array.from(new Set(data!.map((item) => item[field])))
        uniqueFilters[field] = uniqueValues.map((value) => ({
            text: filterTextShaper(value),
            value: value,
        }))
    }

    return baseColumns!.map((column) => {
        const isFilterable = filterFields!.includes(column.dataIndex as string)
        const isCustomFilterable = customFilterFields && (column.dataIndex as string) in customFilterFields!
        const isSortable = sortFields && sortFields!.includes(column.dataIndex as string)

        let columnDict = column

        if (isFilterable) {
            const filters = uniqueFilters[column.dataIndex]

            columnDict = {
                ...columnDict,
                filters,
                onFilter: (value, record) => {
                    const obj = (record as any)[column.dataIndex]

                    if (!isReactElement(obj)) return obj === value
                    return obj.props.text === value
                },
            }
        }

        if (isCustomFilterable) {
            const filtersProps = customFilterFields[column.dataIndex]

            columnDict = {
                ...columnDict,
                filters: filtersProps.filters || columnDict.filters,
                filteredValue: filtersProps.filteredValue,
                onFilter: filtersProps.onFilter || columnDict.onFilter,
            }
        }

        if (isSortable)
            columnDict = {
                ...columnDict,
                sorter: (a, b) =>
                    column.dataIndex && (a as any)[column.dataIndex] < (b as any)[column.dataIndex] ? 1 : -1,
            }

        return columnDict
    })
}

function escapeRegExp(text: string) {
    return text.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
}

export function HighlightText({ text, searchText }: HighlightTextProps) {
    const isMatch = text.toLowerCase().includes(searchText.toLowerCase())

    if (isMatch) {
        const parts = text.split(new RegExp(`(${escapeRegExp(searchText)})`, 'gi'))

        return (
            <span>
                {parts.map((part: string, index: number) =>
                    part.toLowerCase() === searchText.toLowerCase() ? (
                        <span key={index} className={styles.highlightText}>
                            {part}
                        </span>
                    ) : (
                        <span key={index}>{part}</span>
                    ),
                )}
            </span>
        )
    }

    return <span>{text}</span>
}

export function objectReBuilder<DataItemType>(
    data: Array<DataItemType>,
    fields: string[],
    searchFields: string[],
    searchRequestText: string,
    customFields: CustomFieldsProps,
    needId: boolean,
): Array<Object> {
    let resultArray: Array<Object> = []
    const searchText = getSearchText(searchRequestText)
    data.forEach((item: any, index) => {
        const newItem: any = {}
        for (const field of fields) {
            if (field in customFields) {
                newItem[field] = customFields[field]({ text: item[field], searchText: searchText, index: index })
            } else if (searchFields.includes(field))
                newItem[field] = <HighlightText text={item[field] ?? ''} searchText={searchText} />
            else newItem[field] = item[field]
        }
        if (needId) newItem.id = item.id
        resultArray.push(newItem)
    })

    return resultArray
}
