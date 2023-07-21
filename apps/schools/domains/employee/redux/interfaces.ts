import { Organization } from '../../organization/redux/interfaces'

export interface Employee {
    id?: string,
    name?: string,
    organization?: Organization,
    position?: string,
}
