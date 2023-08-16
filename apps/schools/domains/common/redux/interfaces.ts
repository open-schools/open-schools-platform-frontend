import { Rule } from 'rc-field-form/lib/interface'

export interface ReturnedData<T> {
    count: number
    next: string
    previous: string
    results: T
}

export interface BasePaginationData {
    page?: number
    page_size?: number
}

export type ValidatorsMap = {
    [key: string]: Rule[]
}

export type QueriesTypes = 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED'
