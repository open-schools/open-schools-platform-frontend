import { ADDRESS_SEPARATOR } from '@domains/student/components/studentList/constants'

export function getVarsForAddressColumn(text: string) {
    return text.split(ADDRESS_SEPARATOR)
}
