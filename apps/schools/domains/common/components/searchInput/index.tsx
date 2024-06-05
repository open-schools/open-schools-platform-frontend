import React, { useState, ChangeEvent } from 'react'
import { Input } from '@domains/common/components/input'
import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons'
import styles from './styles/styles.module.scss'

interface SearchInputProps {
    onSearchChange: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearchChange }) => {
    const [inputText, setInputText] = useState('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputText(value)
        onSearchChange(value)
    }

    return (
        <Input
            onChange={handleInputChange}
            customType={'inputSearch'}
            placeholder={'Поиск'}
            value={inputText}
            children={
                <>
                    <SearchOutlined className={styles.search} />
                    {inputText && (
                        <CloseCircleOutlined
                            className={styles.cross}
                            onClick={() => {
                                setInputText('')
                                onSearchChange('')
                            }}
                        />
                    )}
                </>
            }
        />
    )
}

export default SearchInput
