import { ReturnedData } from '@domains/common/redux/interfaces'

export function mapReturnedData<T>(x: ReturnedData<T[]> | undefined, delegate: (x: T) => any) {
    return x !== undefined
        ? ({
              count: x.count,
              next: x.next,
              previous: x.previous,
              results: x.results.map(delegate),
          } as ReturnedData<any>)
        : undefined
}
