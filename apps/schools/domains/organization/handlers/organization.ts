import { FormInstance, message } from 'antd'
import { withLoadingMessage } from '@domains/common/utils/loading'
import { LoadingMsg } from '@domains/user/components/auth/constants/message'

export async function handleSubmitCreateOrganizationForm(formComponent: FormInstance, mutation: any) {
    let response = await withLoadingMessage(LoadingMsg, mutation, {
        name: formComponent.getFieldValue('name'),
        inn: formComponent.getFieldValue('inn'),
    })

    if ('data' in response) {
        message.success('Организация успешно создана')
        return response?.data.creator_employee?.organization?.id
    }
}
