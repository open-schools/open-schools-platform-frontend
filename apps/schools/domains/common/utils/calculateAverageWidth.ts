export function calculateAverageWidth(columns: string[]) {
    return `${(100 / columns.length).toFixed(2)}%`
}
