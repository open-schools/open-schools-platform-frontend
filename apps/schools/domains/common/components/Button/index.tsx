import { Button as DefaultButton, ButtonProps } from 'antd'
import React from 'react'
import defaultStyles from './styles/default.module.scss'
import gradientStyles from './styles/gradient.module.scss'
import { typeButton } from '../../constants/Button'
import { ButtonHTMLAttributes } from 'react'

interface CustomButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: 'schoolDefault' | 'schoolGradient';
    antdType?: ButtonProps['type'];
}

interface Dictionary {
    [key: string]: any;
}

const buttonStyleDictionary : Dictionary = {
    'defaultStyles': defaultStyles,
    'gradientStyles': gradientStyles,
}

const textButton = () => {
    return (
        <div>
            Hello world!
        </div>
    )
}

export const Button: React.FC<CustomButtonProps> = (props) => {
    const { type = 'schoolDefault', antdType, ...restProps } = props

    if (!typeButton.includes(type)) {
        return (
            <DefaultButton
                className={defaultStyles.button}
                children={textButton()}
                type={antdType}
                data-testid="btn"
                {...restProps}
            />
        )
    } else {
        return (
            <DefaultButton
                className={buttonStyleDictionary[type]}
                children={textButton()}
                type={antdType}
                data-testid="btn"
                {...restProps}
            />
        )
    }
}
