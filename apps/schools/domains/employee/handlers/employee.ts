import { FormInstance, message } from 'antd'
import {
    PleaseReloadPageMsg,
    SuccessInviteEmployeeMsg,
} from '@domains/user/components/auth/constants/message'
import {isPhoneValid} from "@domains/common/utils/form";

export async function handleSubmitForm(organizationId: string, formComponent: FormInstance, mutation: any) {
    const isValid = isPhoneValid(formComponent, "phone")

    if (!isValid)
        return false

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
        return true
    } else {
        message.error(PleaseReloadPageMsg)
        return false;
    }
}
