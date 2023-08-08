import { ColumnType } from 'antd/lib/table/interface'
import React from 'react'

export interface RawColumnType<DataType> extends ColumnType<DataType> {
    hidden?: boolean
    dataIndex: string
}

export function useGenerateFullColumns<DataType>(baseColumns: RawColumnType<DataType>[]): ColumnType<DataType>[] {
    return baseColumns.map((column) => ({
        ...column,
    }))
}

function getFiniteValue(obj: any, searchFields: Array<String>, searchText: string) {
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

function escapeRegExp(text: string) {
    return text.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
}

function HighlightText({ text, searchText }: any) {
    const isMatch = text.includes(searchText)

    if (isMatch) {
        const parts = text.split(new RegExp(`(${escapeRegExp(searchText)})`, 'gi'))
        return (
            <span>
                {parts.map((part: any, index: any) =>
                    part.toLowerCase() === searchText.toLowerCase() ? (
                        <span key={index} style={{ backgroundColor: 'yellow' }}>
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

export function objectReBuilder(data: Array<Object>, searchFields: string[], searchRequestText: string): Array<Object> {
    let resultArray: Array<Object> = []
    const searchText = searchRequestText.split(':')[0]

    data.forEach((item: any) => {
        const newItem: any = {}
        for (const field of searchFields) {
            newItem[field] = <HighlightText text={item[field]} searchText={searchText} />
        }
        resultArray.push(newItem)
    })

    return resultArray
}
