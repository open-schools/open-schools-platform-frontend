import React from 'react'
import { Select, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Category } from '../../redux/interfaces'
import styles from '../appCatalog/styles/styles.module.scss'

const { Option } = Select

interface CatalogFiltersProps {
    search: string
    selectedCategories: string[]
    categories: Category[]
    isLoadingCategories: boolean
    onSearchChange: (value: string) => void
    onCategoryChange: (value: string[]) => void
}

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
    search,
    selectedCategories,
    categories,
    isLoadingCategories,
    onSearchChange,
    onCategoryChange,
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

            </div>
        </div>
    )
}

