import { Organization } from '../../organization/redux/entities'

export interface Employee {
    id?: string,
    name?: string,
    organization?: Organization,
    position?: string
}
