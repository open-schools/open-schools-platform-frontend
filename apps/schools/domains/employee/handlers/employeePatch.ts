import { FormInstance, message } from 'antd'
import { LoadingRequestMsg, SuccessUpdateEmployeeMsg } from '@domains/user/components/auth/constants/message'
import { removeEmpty } from '@domains/common/utils/form'
import { withLoadingMessage } from '@domains/common/utils/loading'
import { EMPLOYEE_NAME, EMPLOYEE_POSITION } from '@domains/employee/components/changeEmployeeForm/constants'

export async function handleSubmitForm(employeeId: string, form: FormInstance, mutation: any) {
    const isSuccess = await withLoadingMessage(
        LoadingRequestMsg,
        async () => {
            let response = await mutation(
                removeEmpty({
                    employee_id: employeeId,
                    name: form.getFieldValue(EMPLOYEE_NAME),
                    position: form.getFieldValue(EMPLOYEE_POSITION),
                }),
            )
            return 'data' in response
        },
        [],
    )

    if (isSuccess) {
        message.success(SuccessUpdateEmployeeMsg)
    }

    return isSuccess
}
