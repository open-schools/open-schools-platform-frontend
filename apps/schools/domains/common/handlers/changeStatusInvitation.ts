import { withLoadingMessage } from '@domains/common/utils/loading'
import { LoadingMsg } from '@domains/user/components/auth/constants/message'
import { message } from 'antd'
import { QueriesTypes } from '@domains/common/redux/interfaces'
import { StatusesEnum } from '@domains/common/constants/Enums'

export async function handleChangeStatusInvitation(mutation: any, id: string | undefined, status: QueriesTypes) {
    if (id === undefined) {
        message.error('Такой организации не существует')
        return
    }

    let response = await withLoadingMessage(LoadingMsg, mutation, {
        id: id,
        status: status,
    })

    if ('data' in response)
        status === StatusesEnum.ACCEPTED
            ? message.success(`Вы успешно приняли заявку`)
            : message.success(`Вы успешно отклонили заявку`)
}
