import React from 'react'
import { ReturnedData } from '@domains/common/redux/interfaces'
import { TableProps } from 'antd'
import { ColumnFilterItem } from 'antd/lib/table/interface'
import { Key } from 'antd/es/table/interface'
import {Options} from "next-usequerystate";

export interface CustomFieldsProps {
    [key: string]: React.FC<{
        text: string
        searchText: string
        index: number
    }>
}

export interface CustomFilterFieldsProps<RowType> {
    [key: string]: {
        filters?: ColumnFilterItem[]
        filteredValue: any
        onFilter?: (value: Key | boolean, record: RowType) => boolean
    }
}

export interface CustomTableProps<RowType, DataItemType> extends TableProps<any> {
    customType?: 'tableWithSearch' | 'tableWithoutSearch'
    columnsTitlesAndKeys: Array<string[]>
    filterFields?: string[]
    data?: ReturnedData<DataItemType[]>
    isLoading: boolean
    searchFields: string[]
    customFields?: CustomFieldsProps
    searchRequestText: string
    needNumbering?: boolean
    setSearchRequestText: <Shallow>(
        value: string | ((old: string | null) => string | null) | null,
        options?: Options<Shallow> | undefined,
    ) => Promise<URLSearchParams>
    mainRoute: string
    sortFields?: string[]
    customFilterFields?: CustomFilterFieldsProps<RowType>
    customWidths?: number[]
}

export interface HighlightTextProps {
    text: string
    searchText: string
}
