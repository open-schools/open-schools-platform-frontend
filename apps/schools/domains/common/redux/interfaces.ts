export interface ReturnedData<T> {
    count: number,
    next: string,
    previous: string,
    results: T,
}

export interface GetPhoto {
    id?: string,
    image?: string,
}
