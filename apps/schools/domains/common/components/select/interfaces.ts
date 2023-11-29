import { SelectProps } from 'antd'
import React from 'react'
import defaultStyles from './styles/default.module.scss'
import multipleStyle from './styles/multiple.module.scss'
import selectInput from './styles/multiple.module.scss'

export interface CustomInputProps extends SelectProps {
    disabled?: boolean
    customType?: 'selectMultiple' | 'selectDefault' | 'selectInput'
    placeholder?: string
    label?: string
    children?: React.ReactNode
}

export interface Dictionary {
    [key: string]: any
}

export const selectStyleDictionary: Dictionary = {
    selectMultiple: multipleStyle,
    selectDefault: defaultStyles,
    selectInput: selectInput,
}
