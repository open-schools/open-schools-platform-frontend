import { FormInstance, message } from 'antd'
import { PleaseReloadPageMsg, SuccessInviteEmployeeMsg } from '@domains/user/components/auth/constants/message'
import { isPhoneValid, removeEmpty } from '@domains/common/utils/form'
import {
    EMPLOYEE_EMAIL,
    EMPLOYEE_NAME,
    EMPLOYEE_PHONE,
    EMPLOYEE_POSITION,
} from '../components/createEmployeeForm/constants'

export async function handleSubmitForm(organizationId: string, formComponent: FormInstance, mutation: any) {
    const isValid = isPhoneValid(formComponent, EMPLOYEE_PHONE)

    if (!isValid) return false

    let response = await mutation(
        removeEmpty({
            organization_id: organizationId,
            email: formComponent.getFieldValue(EMPLOYEE_EMAIL),
            phone: formComponent.getFieldValue(EMPLOYEE_PHONE),
            body: {
                name: formComponent.getFieldValue(EMPLOYEE_NAME),
                position: formComponent.getFieldValue(EMPLOYEE_POSITION),
            },
        }),
    )
    if ('data' in response) {
        message.success(SuccessInviteEmployeeMsg)
        return true
    } else {
        message.error(PleaseReloadPageMsg)
        return false
    }
}
