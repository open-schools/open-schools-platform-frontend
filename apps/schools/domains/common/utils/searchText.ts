export function getSearchText (text: string) {
  return text.split(':')[0]
}

export function createSearchTextForRequest (text: string, searchColumns: string[]) {
  return `${text}:[${searchColumns.map((e: string) => e)}]`
}
