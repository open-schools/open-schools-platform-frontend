import { GetOrganizationSender } from '../../organization/redux/interfaces'

export interface GetEmployee {
    id?: string
    name?: string
    organization?: GetOrganizationSender
    position?: string
}
