import { Select as BaseSelect } from 'antd'
import React, { useState } from 'react'
import defaultStyles from './styles/default.module.scss'
import { CustomInputProps, selectStyleDictionary } from './interfaces'
import classNames from 'classnames'
import { typeSelect } from '@domains/common/constants/Select'

export const Select: React.FC<CustomInputProps> = (props) => {
    const {
        disabled = false,
        customType = 'selectDefault',
        placeholder,
        label,
        className,
        children,
        options,
        ...restProps
    } = props

    if (!typeSelect.includes(customType)) {
        return (
            <div className={defaultStyles.selectContainer}>
                <label>{label}</label>
                <BaseSelect
                    className={classNames(defaultStyles.select, className)}
                    placeholder={placeholder}
                    data-testid='select'
                    {...restProps}
                >
                    {children}
                </BaseSelect>
            </div>
        )
    } else if (customType === 'selectInput') {
        const [addressText, setAddressText] = useState('')

        const handleSearch = (value: string) => {
            setAddressText(value)
        }

        let additionalOption =
            addressText != ''
                ? [
                      {
                          value: addressText,
                          label: addressText,
                      },
                  ]
                : []

        if (options && options.filter((x) => x.value === addressText).length > 0) additionalOption = []

        return (
            <div className={selectStyleDictionary['selectDefault']?.selectContainer}>
                <label>{label}</label>
                <BaseSelect
                    className={classNames(selectStyleDictionary['selectDefault']?.select, className)}
                    {...restProps}
                    showSearch={true}
                    onSearch={handleSearch}
                    onSelect={() => setAddressText('')}
                    placeholder={placeholder}
                    options={options?.concat(additionalOption)}
                    data-testid='select'
                >
                    {children}
                </BaseSelect>
            </div>
        )
    } else {
        return (
            <div className={selectStyleDictionary[customType]?.selectContainer}>
                <label>{label}</label>
                <BaseSelect
                    className={classNames(selectStyleDictionary[customType]?.select, className)}
                    {...restProps}
                    placeholder={placeholder}
                    data-testid='select'
                >
                    {children}
                </BaseSelect>
            </div>
        )
    }
}
