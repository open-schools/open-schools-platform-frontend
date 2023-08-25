import { FormInstance, message } from 'antd'
import { SuccessInviteEmployeeMsg } from '@domains/user/components/auth/constants/message'
import {
    CIRCLES,
    PARENT_EMAIL,
    PARENT_PHONE,
    STUDENT_NAME,
    STUDENT_PHONE,
} from '@domains/student/components/createStudentForm/constants'
import { isPhoneValid, removeEmpty } from '@domains/common/utils/form'
import { withLoadingMessage } from '@domains/common/utils/loading'

export async function handleSubmitForm(form: FormInstance, mutation: any) {
    if (!isPhoneValid(form, PARENT_PHONE)) return false
    if (form.getFieldValue(STUDENT_PHONE) && !isPhoneValid(form, STUDENT_PHONE)) return false

    const isSuccess = await withLoadingMessage(
        'Выполняется запрос...',
        async () => {
            for (let circle_id of form.getFieldValue(CIRCLES)) {
                let response = await mutation(
                    removeEmpty({
                        email: form.getFieldValue(PARENT_EMAIL),
                        parent_phone: form.getFieldValue(PARENT_PHONE),
                        student_phone: form.getFieldValue(STUDENT_PHONE),
                        body: {
                            name: form.getFieldValue(STUDENT_NAME),
                        },
                        circle_id: circle_id,
                    }),
                )

                if (!('data' in response)) {
                    return false
                }
            }
            return true
        },
        [],
    )

    if (isSuccess) {
        message.success(SuccessInviteEmployeeMsg)
    }

    return isSuccess
}
