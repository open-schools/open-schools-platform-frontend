import { FormInstance, message } from 'antd'
import { PleaseReloadPageMsg, SuccessInviteEmployeeMsg } from '@domains/user/components/auth/constants/message'
import {
    CIRCLES,
    PARENT_EMAIL,
    PARENT_PHONE,
    STUDENT_NAME,
    STUDENT_PHONE,
} from '@domains/student/constants/forms/createStudentConstants'
import { isPhoneValid } from '@domains/common/utils/form'
import { withLoadingMessage } from '@domains/common/utils/loading'

export async function handleSubmitForm(form: FormInstance, mutation: any) {
    const isValid = isPhoneValid(form, PARENT_PHONE) & isPhoneValid(form, STUDENT_PHONE)

    if (!isValid) return false

    await withLoadingMessage(
        'Выполняется запрос...',
        async () => {
            for (let circle_id of form.getFieldValue(CIRCLES)) {
                let response = await mutation({
                    email: form.getFieldValue(PARENT_EMAIL),
                    parent_phone: form.getFieldValue(PARENT_PHONE),
                    student_phone: form.getFieldValue(STUDENT_PHONE),
                    body: {
                        name: form.getFieldValue(STUDENT_NAME),
                    },
                    circle_id: circle_id,
                })

                if (!('data' in response)) {
                    message.error(PleaseReloadPageMsg)
                    return false
                }
            }
        },
        [],
    )

    message.success(SuccessInviteEmployeeMsg)
    return true
}
