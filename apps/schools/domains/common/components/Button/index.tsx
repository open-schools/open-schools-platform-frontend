import { Button as DefaultButton, ButtonProps } from 'antd'
import React from 'react'
import defaultStyles from './styles/default.module.scss'
import gradientStyles from './styles/gradient.module.scss'
import { typeButton } from '../../constants/Button'

interface CustomButtonProps extends Omit<ButtonProps, 'type'> {
    type?: 'schoolDefault' | 'schoolGradient',
    antdType?: ButtonProps['type'],
    onClick?: () => void,
    text?: string,
}

interface Dictionary {
    [key: string]: any;
}

const buttonStyleDictionary : Dictionary = {
    'schoolDefault': defaultStyles,
    'schoolGradient': gradientStyles,
}

export const Button: React.FC<CustomButtonProps> = (props) => {
    const { type = 'schoolDefault', antdType = 'primary', onClick, ...restProps } = props

    if (!typeButton.includes(type)) {
        return <DefaultButton className={defaultStyles.button} {...restProps} type={antdType} onClick={onClick} data-testid="btn" />
    }
    else //if (type in buttonStyleDictionary) {
    {
        return <DefaultButton className={buttonStyleDictionary[type]?.button} {...restProps} type={antdType} onClick={onClick} data-testid="btn" />
    }
}

