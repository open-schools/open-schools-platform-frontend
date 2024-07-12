import { RowType } from '@domains/student/components/studentList/interfaces'

export const calculateResults = (
    paginationParams: { page: number; pageSize: number },
    invites: { count: number | undefined; results: any[] } | undefined,
    students: { count: number | undefined; results: any[] } | undefined,
): RowType[] => {
    if (paginationParams.page <= Math.ceil((invites?.count ?? 0) / paginationParams.pageSize)) {
        return invites?.results ?? []
    } else {
        return students?.results ?? []
    }
}
