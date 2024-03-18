import { FormInstance, message } from 'antd'
import { LoadingRequestMsg, SuccessUpdateStudentMsg } from '@domains/user/components/auth/constants/message'
import { removeEmpty } from '@domains/common/utils/form'
import { withLoadingMessage } from '@domains/common/utils/loading'
import { STUDENT_NAME } from '@domains/student/components/changeStudentForm/constants'

export async function handleSubmitForm(studentId: string, form: FormInstance, mutation: any) {
    const isSuccess = await withLoadingMessage(
        LoadingRequestMsg,
        async () => {
            let response = await mutation(
                removeEmpty({
                    student_id: studentId,
                    name: form.getFieldValue(STUDENT_NAME),
                }),
            )
            return 'data' in response
        },
        [],
    )

    if (isSuccess) {
        message.success(SuccessUpdateStudentMsg)
    }

    return isSuccess
}
