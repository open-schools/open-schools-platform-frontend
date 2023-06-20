import { Button as DefaultButton, ButtonProps } from 'antd'
import React from 'react'
import defaultStyles from '../styles/default.module.scss'
import gradientStyles from '../styles/gradient.module.scss'
import { typeButton } from '../../constants/Button'

interface CustomButtonProps {
    type?: 'schoolDefault' | 'schoolGradient',
    antdType?: ButtonProps['type'],
    onClick?: () => void,
}

const buttonStyleDictionary = {
    'defaultStyles': defaultStyles,
    'gradientStyles': gradientStyles,
}

export const Button: React.FC<CustomButtonProps> = (props) => {
    const { type = 'schoolDefault', antdType, onClick } = props

    if (!typeButton.includes(type)) {
        return <DefaultButton className={defaultStyles.button} type={antdType} onClick={onClick} data-testid="btn" />
    } else if (buttonStyleDictionary[]){
        return <DefaultButton className={} type={antdType} onClick={onClick} data-testid="btn" />
    }

}
