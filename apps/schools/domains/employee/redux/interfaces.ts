import { Organization } from '../../organization/redux/entities'
import { EmployeeProfile } from '../../user/redux/entities'

export interface QueryEmployeeBody {
    name: string,
    position?: string,
}

export interface EmployeeProfileQuery {
    id?: string,
    sender: Organization,
    recipient: EmployeeProfile,
    status: 'ACCEPTED' | 'SENT' | 'IN_PROGRESS' | 'DECLINED' | 'CANCELED',
    body: QueryEmployeeBody,
    additional?: string,
}
