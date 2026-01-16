import React from 'react'
import { Select, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Category } from '../../redux/interfaces'
import styles from '../appCatalog/styles/styles.module.scss'

const { Option } = Select

interface CatalogFiltersProps {
    search: string
    selectedCategories: string[]
    selectedType: string
    categories: Category[]
    isLoadingCategories: boolean
    onSearchChange: (value: string) => void
    onCategoryChange: (value: string[]) => void
    onTypeChange: (value: string) => void
}

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
    search,
    selectedCategories,
    selectedType,
    categories,
    isLoadingCategories,
    onSearchChange,
    onCategoryChange,
    onTypeChange,
}) => {
    return (
        <div className={styles.searchAndFilters}>
            <div className={styles.searchInput}>
                <Input
                    placeholder='Поиск приложений...'
                    value={search || ''}
                    onChange={(e) => onSearchChange(e.target.value)}
                    prefix={<SearchOutlined />}
                    allowClear
                />
            </div>

            <div className={styles.filters}>
                <Select
                    className={styles.categoryFilter}
                    placeholder='Категория'
                    mode='multiple'
                    allowClear
                    value={selectedCategories || []}
                    onChange={onCategoryChange}
                    loading={isLoadingCategories}
                    maxTagCount='responsive'
                >
                    {categories.map((category) => (
                        <Option key={category.id} value={category.id}>
                            {category.name}
                        </Option>
                    ))}
                </Select>

                <Select
                    className={styles.typeFilter}
                    placeholder='Тип приложения'
                    allowClear
                    value={selectedType || undefined}
                    onChange={onTypeChange}
                >
                    <Option value='internal'>Внутренние</Option>
                    <Option value='external'>Внешние</Option>
                </Select>
            </div>
        </div>
    )
}

