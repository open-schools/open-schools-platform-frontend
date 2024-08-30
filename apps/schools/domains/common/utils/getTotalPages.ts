export const getTotalPages = (counts: { [key: string]: { count: number | undefined } }, pageSize: number) => {
    return Object.keys(counts).reduce((total, key) => {
        return total + Math.ceil((counts[key].count ?? 0) / pageSize) * pageSize
    }, 0)
}
