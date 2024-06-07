import { ButtonProps } from 'antd'
import defaultStyles from './styles/default.module.scss'
import resendStyles from './styles/resend.module.scss'
import defaultAutoStyles from './styles/defaultAuto.module.scss'

export interface CustomButtonProps extends Omit<ButtonProps, 'type'> {
    type?: 'schoolDefault' | 'schoolResend' | 'schoolDefaultAuto'
    antdType?: ButtonProps['type']
    onClick?: () => void
    text?: string
}

export interface Dictionary {
    [key: string]: any
}

export const buttonStyleDictionary: Dictionary = {
    schoolDefault: defaultStyles,
    schoolDefaultAuto: defaultAutoStyles,
    schoolResend: resendStyles,
}
