export const handlePaginationChange = (
    setPaginationParams: (params: { page: number; pageSize: number }) => void,
    setQueryPaginationParams: (params: {
        invites: { page: number; pageSize: number }
        teachers: { page: number; pageSize: number }
        students: { page: number; pageSize: number }
    }) => void,
    invitesCount: number | undefined,
    teachersCount: number | undefined,
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

    let newQueryParams: {
        invites: { page: number; pageSize: number }
        teachers: { page: number; pageSize: number }
        students: { page: number; pageSize: number }
    }

    if (newPage <= Math.ceil((invitesCount ?? 0) / newPageSize)) {
        newQueryParams = {
            invites: {
                page: newPage,
                pageSize: newPageSize,
            },
            teachers: {
                page: defaultPaginationTablePage,
                pageSize: defaultPaginationTablePageSize,
            },
            students: {
                page: defaultPaginationTablePage,
                pageSize: defaultPaginationTablePageSize,
            },
        }
    } else if (newPage <= Math.ceil(((teachersCount ?? 0) + (invitesCount ?? 0)) / newPageSize)) {
        const nextPage = Math.abs(newPage - Math.ceil((invitesCount ?? 0) / newPageSize))
        newQueryParams = {
            invites: {
                page: defaultPaginationTablePage,
                pageSize: defaultPaginationTablePageSize,
            },
            teachers: {
                page: nextPage,
                pageSize: newPageSize,
            },
            students: {
                page: defaultPaginationTablePage,
                pageSize: defaultPaginationTablePageSize,
            },
        }
    } else {
        const nextPage = Math.abs(newPage - Math.ceil(((teachersCount ?? 0) + (invitesCount ?? 0)) / newPageSize))
        newQueryParams = {
            invites: {
                page: defaultPaginationTablePage,
                pageSize: defaultPaginationTablePageSize,
            },
            teachers: {
                page: defaultPaginationTablePage,
                pageSize: defaultPaginationTablePageSize,
            },
            students: {
                page: nextPage,
                pageSize: newPageSize,
            },
        }
    }

    setQueryPaginationParams(newQueryParams)
    scrollToTop()
}
