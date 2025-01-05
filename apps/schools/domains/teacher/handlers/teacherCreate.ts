import { FormInstance, message } from 'antd'
import { PleaseReloadPageMsg, SuccessInviteTeacherMsg } from '@domains/user/components/auth/constants/message'
import { isPhoneValid, removeEmpty } from '@domains/common/utils/form'
import {
    TEACHER_EMAIL,
    TEACHER_NAME,
    TEACHER_PHONE,
    TEACHER_POSITION,
} from '../components/createTeacherForm/constants'

export async function handleSubmitForm(organizationId: string, formComponent: FormInstance, mutation: any) {
    const isValid = isPhoneValid(formComponent, TEACHER_PHONE)

    if (!isValid) return false

    let response = await mutation(
        removeEmpty({
            organization_id: organizationId,
            email: formComponent.getFieldValue(TEACHER_EMAIL),
            phone: formComponent.getFieldValue(TEACHER_PHONE),
            body: {
                name: formComponent.getFieldValue(TEACHER_NAME),
                position: formComponent.getFieldValue(TEACHER_POSITION),
            },
        }),
    )
    if ('data' in response) {
        message.success(SuccessInviteTeacherMsg)
        return true
    } else {
        message.error(PleaseReloadPageMsg)
        return false
    }
}
