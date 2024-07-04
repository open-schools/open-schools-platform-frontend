import { RowType } from '@domains/student/components/studentList/interfaces'

export const calculateResults = (
    paginationParams: { page: number; pageSize: number },
    invites: { count: number | undefined; results: any[] } | undefined,
    students: { count: number | undefined; results: any[] } | undefined,
): RowType[] => {
    if (paginationParams.page < Math.ceil((invites?.count ?? 0) / paginationParams.pageSize)) {
        return (invites?.results ?? []).map((x) => {
            return {
                id: x.body.id,
                student_name: x.body.name,
                student_phone: x.additional.phone,
                parent_phone: x.recipient.parent_phones.replaceAll(',', '\n'),
                circle_name: x.sender.name,
            } as RowType
        })
    } else if (paginationParams.page === Math.ceil((invites?.count ?? 0) / paginationParams.pageSize)) {
        return [...(invites?.results ?? []), ...(students?.results ?? [])]
            .slice(0, paginationParams.pageSize)
            .map((x) => {
                if ('body' in x) {
                    return {
                        id: x.body.id,
                        student_name: x.body.name,
                        student_phone: x.additional.phone,
                        parent_phone: x.recipient.parent_phones.replaceAll(',', '\n'),
                        circle_name: x.sender.name,
                    } as RowType
                } else {
                    return {
                        id: x.id,
                        student_name: x.name,
                        student_phone: x.student_profile.phone,
                        parent_phone: x.student_profile.parent_phones?.replaceAll(',', '\n'),
                        circle_name: x.circle.name,
                    } as RowType
                }
            })
    } else {
        const temp = paginationParams.pageSize - ((invites?.count ?? 0) % paginationParams.pageSize)
        const mapper = (x: any) =>
            ({
                id: x.id,
                student_name: x.name,
                student_phone: x.student_profile.phone,
                parent_phone: x.student_profile.parent_phones?.replaceAll(',', '\n'),
                circle_name: x.circle.name,
            }) as RowType

        return students?.results.length === 1
            ? [mapper(students?.results[0])]
            : (students?.results ?? []).slice(temp).map(mapper)
    }
}
