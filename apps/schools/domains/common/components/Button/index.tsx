import { Button as DefaultButton } from 'antd'
import React from 'react'
import defaultStyles from './styles/default.module.scss'
import { typeButton } from '../../constants/Button'
import { buttonStyleDictionary, CustomButtonProps } from './interfaces'

export const Button: React.FC<CustomButtonProps> = (props) => {
    const {
        type = 'schoolDefault',
        antdType = 'primary',
        onClick,
        ...restProps
    } = props

    if (!typeButton.includes(type)) {
        return (
            <DefaultButton
                className={defaultStyles.button}
                {...restProps}
                type={antdType}
                onClick={onClick}
                data-testid="btn"
            />
        )
    } else {
        return (
            <DefaultButton
                className={buttonStyleDictionary[type]?.button}
                {...restProps}
                type={antdType}
                onClick={onClick}
                data-testid="btn"
            />
        )
    }
}
