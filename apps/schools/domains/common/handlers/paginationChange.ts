export const handlePaginationChange = (
    setPaginationParams: (params: { page: number; pageSize: number }) => void,
    setQueryPaginationParams: (params: { [key: string]: { page: number; pageSize: number } }) => void,
    counts: { [key: string]: number | undefined },
    newPage: number,
    newPageSize: number,
    defaultPaginationTablePage: number,
    defaultPaginationTablePageSize: number,
    scrollToTop: () => void,
) => {
    setPaginationParams({
        page: newPage,
        pageSize: newPageSize,
    })

    const newQueryParams: { [key: string]: { page: number; pageSize: number } } = {}

    let currentPage = newPage
    let currentOffset = 0

    Object.keys(counts).forEach((key, index) => {
        const count = counts[key] ?? 0
        const maxPages = Math.ceil(count / newPageSize)

        if (currentPage <= maxPages) {
            newQueryParams[key] = {
                page: currentPage,
                pageSize: newPageSize,
            }
        } else {
            currentPage -= maxPages
            newQueryParams[key] = {
                page: defaultPaginationTablePage,
                pageSize: defaultPaginationTablePageSize,
            }
        }

        currentOffset += count
    })

    setQueryPaginationParams(newQueryParams)
    scrollToTop()
}
