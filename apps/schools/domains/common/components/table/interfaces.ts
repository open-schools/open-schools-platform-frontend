import React from 'react'
import { ReturnedData } from '@domains/common/redux/interfaces'

export interface CustomTableProps<RowType, DataItemType> {
    customType?: 'tableWithSearch' | 'tableWithoutSearch';
    columnsTitlesAndKeys: Array<string[]>;
    data?: ReturnedData<DataItemType[]>;
    isLoading: boolean;
    searchFields: string[];
    searchRequestText: string;
    setSearchRequestText: React.Dispatch<React.SetStateAction<string>>;
    mainRoute: string;
}


export interface HighlightTextProps {
    text: string
    searchText: string
}
