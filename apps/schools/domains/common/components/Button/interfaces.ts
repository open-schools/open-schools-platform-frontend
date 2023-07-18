import { ButtonProps } from 'antd'
import defaultStyles from './styles/default.module.scss'
import gradientStyles from './styles/gradient.module.scss'
import resendStyles from './styles/resend.module.scss'

export interface CustomButtonProps extends Omit<ButtonProps, 'type'> {
    type?: 'schoolDefault' | 'schoolGradient' | 'schoolResend'
    antdType?: ButtonProps['type']
    onClick?: () => void
    text?: string
}

export interface Dictionary {
    [key: string]: any
}

export const buttonStyleDictionary: Dictionary = {
    schoolDefault: defaultStyles,
    schoolGradient: gradientStyles,
    schoolResend: resendStyles,
}
