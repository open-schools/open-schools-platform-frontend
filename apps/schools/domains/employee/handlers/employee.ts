import { FormInstance, message } from 'antd'
import {
    PleaseReloadPageMsg,
    SuccessInviteEmployeeMsg,
} from '../../user/components/auth/constants/message'

export async function handleSubmitForm(
    organizationId: string,
    formComponent: FormInstance,
    mutation: any
) {
    let response = await mutation({
        organization_id: organizationId,
        email: formComponent.getFieldValue('email'),
        phone: formComponent.getFieldValue('phone'),
        body: {
            name: formComponent.getFieldValue('name'),
            position: formComponent.getFieldValue('position'),
        },
    })
    if ('data' in response) {
        message.success(SuccessInviteEmployeeMsg)
    } else {
        message.error(PleaseReloadPageMsg)
    }
}
