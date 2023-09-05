import { FormInstance, message } from 'antd'
import { SuccessCreateCircleMsg } from '@domains/user/components/auth/constants/message'
import { removeEmpty } from '@domains/common/utils/form'
import { CIRCLE_NAME, CIRCLE_ADDRESS, ADDRESS_ROOM } from '../components/createCircleForm/constants'
import { withLoadingMessage } from '@domains/common/utils/loading'
import { ADDRESS_SEPARATOR } from '@domains/common/utils/geo'

export async function handleSubmitForm(organizationId: string, formComponent: FormInstance, mutation: any) {
    console.log(formComponent.getFieldValue(CIRCLE_ADDRESS))

    const response = await withLoadingMessage(
        'Выполняется запрос...',
        mutation,
        removeEmpty({
            organization: organizationId,
            name: formComponent.getFieldValue(CIRCLE_NAME),
            address: `${formComponent.getFieldValue(CIRCLE_ADDRESS)}${ADDRESS_SEPARATOR}${formComponent.getFieldValue(
                ADDRESS_ROOM,
            )}`,
        }),
    )

    if ('data' in response) {
        message.success(SuccessCreateCircleMsg)
        return true
    }

    return false
}
