import { TableProps } from 'antd'
import React from 'react'
import { GetListEmployee } from '@domains/employee/redux/interfaces'
import { ReturnedData } from '@domains/common/redux/interfaces'

export interface CustomTableProps extends TableProps<RowType> {
    customType?: 'tableWithSearch' | 'tableWithoutSearch'
    columnsTitlesAndKeys: Array<string[]>
    data?: ReturnedData<GetListEmployee[]>
    isLoading: boolean
    searchFields: string[]
    searchRequestText: string
    setSearchRequestText: React.Dispatch<React.SetStateAction<string>>
    mainRoute: string
}

export interface RowType {
    id: string
    name: string
    position: string
    phone: string
}

export interface HighlightTextProps {
    text: string
    searchText: string
}
