import { InputProps } from 'antd'
import defaultStyles from './styles/default.module.scss'
import passwordStyle from './styles/password.module.scss'
import centerStyle from './styles/center.module.scss'

export interface CustomInputProps extends InputProps {
    disabled?: boolean
    customType?: 'inputDefault' | 'inputPhone' | 'inputPassword' | 'inputCenter'
    placeholder?: string
    label?: string
}

export interface Dictionary {
    [key: string]: any
}

export const inputStyleDictionary: Dictionary = {
    inputDefault: defaultStyles,
    inputPassword: passwordStyle,
    inputCenter: centerStyle,
}
