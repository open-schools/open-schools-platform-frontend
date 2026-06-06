import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const useCatalogFilters = () => {
    const router = useRouter()
    const [search, setSearch] = useState<string>('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const pageSize = 12

    const [installedOnly, setInstalledOnly] = useState<boolean>(false)

    useEffect(() => {
        if (router.isReady) {
            const query = router.query
            if (query.search && typeof query.search === 'string') {
                setSearch(query.search)
            }
            if (query.categories) {
                const categories = Array.isArray(query.categories) ? query.categories : [query.categories]
                setSelectedCategories(categories.filter((c): c is string => typeof c === 'string'))
            }
            if (query.page && typeof query.page === 'string') {
                const pageNum = parseInt(query.page, 10)
                if (!isNaN(pageNum)) setPage(pageNum)
            }
            if (query.installed === 'true') {
                setInstalledOnly(true)
            } else {
                setInstalledOnly(false)
            }
        }
    }, [router.isReady, router.query])

    const categoryId = selectedCategories?.[0]
        ? (() => {
              const parsed = parseInt(selectedCategories[0], 10)
              return isNaN(parsed) ? undefined : parsed
          })()
        : undefined

    const updateURL = (updates: Record<string, string | string[] | null>) => {
        const query = { ...router.query }
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
                delete query[key]
            } else {
                query[key] = value
            }
        })
        query.page = '1'
        router.push({ pathname: router.pathname, query }, undefined, { shallow: true })
    }

    const handleCategoryChange = (value: string[]) => {
        setSelectedCategories(value)
        setPage(1)
        updateURL({ categories: value.length > 0 ? value : null })
    }

    const handleSearchChange = (value: string) => {
        setSearch(value)
        setPage(1)
        updateURL({ search: value || null })
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        router.push({ pathname: router.pathname, query: { ...router.query, page: String(newPage) } }, undefined, {
            shallow: true,
        })
    }

    return {
        search,
        selectedCategories,
        page,
        pageSize,
        categoryId,
        installedOnly,
        handleCategoryChange,
        handleSearchChange,
        handlePageChange,
    }
}

