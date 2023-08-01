import { InputProps } from 'antd'
import React from 'react'
import defaultStyles from './styles/default.module.scss'
import passwordStyle from './styles/password.module.scss'
import centerStyle from './styles/center.module.scss'
import searchStyle from './styles/search.module.scss'

export interface CustomInputProps extends InputProps {
    disabled?: boolean
    customType?:
        | 'inputDefault'
        | 'inputPhone'
        | 'inputPassword'
        | 'inputCenter'
        | 'inputSearch'
    placeholder?: string
    label?: string
    children?: React.ReactNode
}

export interface Dictionary {
    [key: string]: any
}

export const inputStyleDictionary: Dictionary = {
    inputDefault: defaultStyles,
    inputPassword: passwordStyle,
    inputCenter: centerStyle,
    inputSearch: searchStyle,
}
