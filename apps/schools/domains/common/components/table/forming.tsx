import { ColumnType } from 'antd/lib/table/interface'
import React from 'react'
import styles from './styles/styles.module.scss'
import { getSearchText } from '@domains/common/utils/searchText'
import { HighlightTextProps } from '@domains/common/components/table/interfaces'

export interface RawColumnType<RowType> extends ColumnType<RowType> {
    hidden?: boolean
    dataIndex: string
}

export function useGenerateFullColumns<RowType>(baseColumns: RawColumnType<RowType>[]): ColumnType<RowType>[] {
    return baseColumns.map((column) => ({
        ...column,
    }))
}

function escapeRegExp(text: string) {
    return text.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
}

function HighlightText({ text, searchText }: HighlightTextProps) {
    const isMatch = text.includes(searchText)

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

export function objectReBuilder(
    data: Array<Object>,
    searchFields: string[],
    searchRequestText: string,
    needId: boolean,
): Array<Object> {
    let resultArray: Array<Object> = []
    const searchText = getSearchText(searchRequestText)
    data.forEach((item: any) => {
        const newItem: any = {}
        for (const field of searchFields) {
            newItem[field] = <HighlightText text={item[field]} searchText={searchText} />
        }
        if (needId) newItem.id = item.id
        resultArray.push(newItem)
    })

    return resultArray
}
