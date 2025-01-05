import { FormInstance, message } from 'antd'
import { LoadingRequestMsg, SuccessUpdateTeacherMsg } from '@domains/user/components/auth/constants/message'
import { removeEmpty } from '@domains/common/utils/form'
import { withLoadingMessage } from '@domains/common/utils/loading'
import { TEACHER_NAME, TEACHER_POSITION } from '@domains/teacher/components/changeTeacherForm/constants'

export async function handleSubmitForm(teacherId: string, form: FormInstance, mutation: any) {
    const isSuccess = await withLoadingMessage(
        LoadingRequestMsg,
        async () => {
            let response = await mutation(
                removeEmpty({
                    teacher_id: teacherId,
                    name: form.getFieldValue(TEACHER_NAME),
                    position: form.getFieldValue(TEACHER_POSITION),
                }),
            )
            return 'data' in response
        },
        [],
    )

    if (isSuccess) {
        message.success(SuccessUpdateTeacherMsg)
    }

    return isSuccess
}
