export interface ReturnedData<T> {
    count: number,
    next: string,
    previous: string,
    results: T,
}
