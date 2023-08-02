import { Input as BaseInput } from 'antd'
import React from 'react'
import defaultStyles from './styles/default.module.scss'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { CustomInputProps, inputStyleDictionary } from './interfaces'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import classNames from 'classnames'
import {typeInput} from "@domains/common/constants/Input";

const INPUT_PHONE_STYLE: React.CSSProperties = {
    width: '100%',
    height: 48,
    borderRadius: 12,
    borderColor: '#D9D9D9',
}
const BUTTON_INPUT_PHONE_STYLE: React.CSSProperties = {
    margin: 5,
    backgroundColor: '#E6E8F1',
    border: 0,
    borderRadius: 8,
}

export const Input: React.FC<CustomInputProps> = (props) => {
    const {
        disabled = false,
        customType = 'inputDefault',
        placeholder,
        label,
        className,
        children,
        ...restProps
    } = props

    if (!typeInput.includes(customType)) {
        return (
            <div className={defaultStyles.inputContainer}>
                <label>{label}</label>
                <BaseInput
                    className={classNames(defaultStyles.input, className)}
                    placeholder={placeholder}
                    data-testid='input'
                    {...restProps}
                />
                {children}
            </div>
        )
    } else if (customType === 'inputPhone') {
        return (
            <div className={defaultStyles.inputContainer}>
                <label>{label}</label>
                <PhoneInput
                    onChange={(value, data, event, formattedValue) => {
                        if (typeof restProps.onChange === 'function') {
                            restProps.onChange(event)
                        }
                    }}
                    disabled={disabled}
                    country={'ru'}
                    placeholder={placeholder}
                    buttonStyle={BUTTON_INPUT_PHONE_STYLE}
                    inputStyle={INPUT_PHONE_STYLE}
                    containerStyle={{ marginTop: '8px' }}
                />
                {children}
            </div>
        )
    } else if (customType === 'inputPassword') {
        return (
            <div className={defaultStyles.inputContainer}>
                <label>{label}</label>
                <BaseInput.Password
                    iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    className={classNames(defaultStyles.input, className)}
                    placeholder={placeholder}
                    data-testid='password-input'
                    {...restProps}
                />
                {children}
            </div>
        )
    } else {
        return (
            <div className={inputStyleDictionary[customType]?.inputContainer}>
                <label>{label}</label>
                <BaseInput
                    className={classNames(inputStyleDictionary[customType]?.input, className)}
                    {...restProps}
                    placeholder={placeholder}
                    data-testid='input'
                />
                {children}
            </div>
        )
    }
}
