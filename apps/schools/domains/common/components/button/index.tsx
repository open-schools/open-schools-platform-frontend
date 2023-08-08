import { Button as DefaultButton } from 'antd'
import React from 'react'
import defaultStyles from './styles/default.module.scss'

import { buttonStyleDictionary, CustomButtonProps } from './interfaces'
import classNames from 'classnames'
import { typeButton } from '@domains/common/constants/Button'

export const Button: React.FC<CustomButtonProps> = (props) => {
    const { type = 'schoolDefault', antdType = 'primary', onClick, className, ...restProps } = props

    if (!typeButton.includes(type)) {
        return (
            <DefaultButton
                className={classNames(defaultStyles.button, className)}
                {...restProps}
                type={antdType}
                onClick={onClick}
                data-testid='btn'
            />
        )
    } else {
        return (
            <DefaultButton
                className={classNames(buttonStyleDictionary[type]?.button, className)}
                {...restProps}
                type={antdType}
                onClick={onClick}
                data-testid='btn'
            />
        )
    }
}
