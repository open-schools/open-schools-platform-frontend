import { ReturnedData } from '@domains/common/redux/interfaces'

export function mapReturnedData<T>(response: ReturnedData<T[]> | undefined, delegate: (x: T) => any) {
    return response !== undefined
        ? ({
              count: response.count,
              next: response.next,
              previous: response.previous,
              results: response.results.map(delegate),
          } as ReturnedData<any>)
        : undefined
}
