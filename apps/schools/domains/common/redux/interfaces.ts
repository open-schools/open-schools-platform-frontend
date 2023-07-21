export interface ReturnedData<T> {
    count: number,
    next: string,
    previous: string,
    results: T,
}

export interface Photo {
    id?: string,
    image?: string,
}
