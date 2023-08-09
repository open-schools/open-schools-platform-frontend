import { TableProps } from "antd";
import React from "react";


export interface CustomTableProps extends TableProps<DataType> {
  customType?: 'tableWithSearch' | 'tableWithoutSearch'
  columnsTitles: string[]
  columnsKeys: string[]
  data: any
  isLoading: boolean
  searchFields: string[]
  searchRequestText: string
  setSearchRequestText: React.Dispatch<React.SetStateAction<string>>
  mainRoute: string
}

export interface DataType {
  id: string
  name: string
  position: string
  phone: string
}
