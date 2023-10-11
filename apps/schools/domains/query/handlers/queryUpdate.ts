import { withLoadingMessage } from '@domains/common/utils/loading'
import { LoadingMsg } from '@domains/user/components/auth/constants/message'
import { message } from 'antd'

export async function handleQueryStatusChange(mutation: any, id: string, status: string) {
    let response = await withLoadingMessage(LoadingMsg, mutation, {
        id: id,
        status: status,
    })

    if ('data' in response) message.success(`Вы успешно сменили статус`)
}
