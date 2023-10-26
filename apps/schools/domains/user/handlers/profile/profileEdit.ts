import { FormInstance, message } from 'antd'
import { LoadingRequestMsg, SuccessUpdateUserProfileMsg } from '@domains/user/components/auth/constants/message'
import { removeEmpty } from '@domains/common/utils/form'
import { USER_NAME, USER_EMAIL } from '../../components/profile/profileEdit/constants'
import { withLoadingMessage } from '@domains/common/utils/loading'

export async function handleSubmitForm(employeeProfileId: string, formComponent: FormInstance, mutation: any) {
    const response = await withLoadingMessage(
        LoadingRequestMsg,
        mutation,
        removeEmpty(
            {
                employee_profile_id: employeeProfileId,
                name: formComponent.getFieldValue(USER_NAME),
                email: formComponent.getFieldValue(USER_EMAIL),
            },
            ['email'],
        ),
    )

    if ('data' in response) {
        message.success(SuccessUpdateUserProfileMsg)
        return true
    }

    return false
}
