import { RowType } from '@domains/student/components/studentList/interfaces'

export const calculateResults = (
    paginationParams: { page: number; pageSize: number },
    data: {
        [key: string]: { count: number | undefined; results: any[] } | undefined
    },
): RowType[] => {
    const dataArray = Object.values(data)
    const pageIndex = paginationParams.page - 1
    let offset = 0

    for (const item of dataArray) {
        const count = item?.count ?? 0
        const pageCount = Math.ceil(count / paginationParams.pageSize)
        if (pageIndex < offset + pageCount) {
            return item?.results ?? []
        }
        offset += pageCount
    }

    return []
}
