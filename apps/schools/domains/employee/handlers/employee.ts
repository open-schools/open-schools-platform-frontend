import { FormInstance, message } from 'antd'
import {
    PleaseReloadPageMsg,
    SuccessInviteEmployeeMsg,
    WrongPhoneFormatMsg,
} from '@domains/user/components/auth/constants/message'
import { normalizePhone } from '@domains/common/utils/phone'

export async function handleSubmitForm(organizationId: string, formComponent: FormInstance, mutation: any) {
    let { phone: inputPhone } = formComponent.getFieldsValue(['phone'])
    inputPhone = '+' + inputPhone
    const phone = normalizePhone(inputPhone)

    if (!phone) {
        formComponent.setFields([
            {
                name: 'phone',
                errors: [WrongPhoneFormatMsg],
            },
        ])
        return
    }

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
