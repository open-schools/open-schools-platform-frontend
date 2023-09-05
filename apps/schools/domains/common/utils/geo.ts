export const ADDRESS_SEPARATOR = '&;'

export function getVarsForAddressColumn(text: string) {
    return text.split(ADDRESS_SEPARATOR)
}
