import { ColumnType } from 'antd/lib/table/interface'
import React from 'react'
import styles from './styles/styles.module.scss'
import { getSearchText } from '@domains/common/utils/searchText'
import { HighlightTextProps } from '@domains/common/components/table/interfaces'
import { filterTextShaper } from '@domains/common/utils/filterTextShaper'

export interface RawColumnType<RowType> extends ColumnType<RowType> {
    hidden?: boolean
    dataIndex: string
}

export function useGenerateFullColumns<RowType>(
    baseColumns?: RawColumnType<RowType>[],
    data?: any[],
    filterFields?: string[],
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

        if (isFilterable) {
            const filters = uniqueFilters[column.dataIndex]

            return {
                filters,
                onFilter: (value, record) => {
                    return (record as any)[column.dataIndex].props.text === value
                },
                ...column,
            }
        } else {
            return column
        }
    })
}

function escapeRegExp(text: string) {
    return text.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
}

function HighlightText({ text, searchText }: HighlightTextProps) {
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
    needId: boolean,
): Array<Object> {
    let resultArray: Array<Object> = []
    const searchText = getSearchText(searchRequestText)
    data.forEach((item: any) => {
        const newItem: any = {}
        for (const field of fields) {
            if (searchFields.includes(field))
                newItem[field] = <HighlightText text={item[field] ?? ''} searchText={searchText} />
            else newItem[field] = item[field]
        }
        if (needId) newItem.id = item.id
        resultArray.push(newItem)
    })

    return resultArray
}
