import { QueriesTypes } from '@domains/common/redux/interfaces'

export interface QueryStatusChanges {
    date: string
    user: GetShallowUserProfiles
    new_status?: QueriesTypes
    previous_status?: QueriesTypes
}

export interface GetShallowUserProfiles {
    id?: string
    name?: string
    parent_profile?: string
    employee_profile?: string
    student_profile?: string
    teacher_profile?: string
}
