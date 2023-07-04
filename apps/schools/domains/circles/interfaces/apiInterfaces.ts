interface ReturnedData<T> {
    count: number,
    next: string,
    previous: string,
    results: T,
}

interface Circle {
    id: string,
    name: string,
    organization: CircleOrganization,
    address: string,
    capacity: number,
    description: string,
    latitude: string,
    longitude: string,
}

interface CircleOrganization {
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

export type { AllCirclesParams, CircleOrganization, Circle, ReturnedData }