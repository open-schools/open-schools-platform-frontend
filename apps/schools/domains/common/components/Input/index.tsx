import { Input as BaseInput } from 'antd'
import React from 'react'
import defaultStyles from './styles/default.module.scss'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { typeInput } from '../../constants/Input'
import { CustomInputProps, inputStyleDictionary } from './interfaces'

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
        type = 'inputDefault',
        placeholder,
        label,
        ...restProps
    } = props

    if (!typeInput.includes(type)) {
        return (
            <div className={defaultStyles.inputContainer}>
                <label>{label}</label>
                <BaseInput
                    className={defaultStyles.input}
                    {...restProps}
                    placeholder={placeholder}
                    data-testid="input"
                />
            </div>
        )
    } else if (type === 'inputPhone') {
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
                />
            </div>
        )
    } else {
        return (
            <div className={inputStyleDictionary[type]?.inputContainer}>
                <label>{label}</label>
                <BaseInput
                    className={inputStyleDictionary[type]?.input}
                    {...restProps}
                    placeholder={placeholder}
                    data-testid="input"
                />
            </div>
        )
    }
}
