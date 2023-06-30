import { commonApi } from '../index'

export interface ReturnedData<T> {
    count: number,
    next: string,
    previous: string,
    results: T,
}

export interface Circle {
    id: string,
    name: string,
    organization: CircleOrganization,
    address: string,
    capacity: number,
    description: string,
    latitude: string,
    longitude: string,
}

export interface CircleOrganization {
    id: string,
    name: string,
}

interface AllCirclesParams {
    id?: string,
    organization?: string,
    capacity?: number,
    description?: string,
    ids?: string,
    address?: string,
    'organization_name'?: string,
    'user_location'?: string,
    name?: string,
    page?: string,
    'page_size'?: string,
    radius?: number,
    'student_profile'?: string,
}

const circlesServiceApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchAllCircles: build.query<ReturnedData<Circle[]>, AllCirclesParams>({
            query: (params) => ({
                url: '/organization-management/circles',
                method: 'GET',
                params: params,
            }),
        }),
    }),
})

export const { useFetchAllCirclesQuery } = circlesServiceApi
