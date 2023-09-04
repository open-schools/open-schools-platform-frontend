import React from 'react'
import { ReturnedData } from '@domains/common/redux/interfaces'
import { TableProps } from 'antd'

export interface CustomFieldsProps {
    [key: string]: React.FC<{
        text: string
        searchText: string
    }>
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
    setSearchRequestText: React.Dispatch<React.SetStateAction<string>>
    mainRoute: string
}

export interface HighlightTextProps {
    text: string
    searchText: string
}
