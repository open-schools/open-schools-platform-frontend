import { message } from 'antd'
import {
    LoadingMsg,
    NeedConfirmComment,
    SuccessCreateCommentMsg,
} from '@domains/user/components/auth/constants/message'
import { withLoadingMessage } from '@domains/common/utils/loading'

export async function handleCreateComment(
    ticket_id: string,
    mutation: any,
    value: string,
    sender_id?: string,
    is_internal_recipient?: boolean,
) {
    if (value.length === 0) {
        message.error(NeedConfirmComment)
        return false
    }

    let response = await withLoadingMessage(LoadingMsg, mutation, {
        ticket_id: ticket_id,
        value: value,
        is_sender: false,
        sender_id: sender_id,
        sender_ct: 'employee',
        is_internal_recipient: is_internal_recipient,
    })

    if ('data' in response) {
        message.success(SuccessCreateCommentMsg)
        return true
    }
    return false
}
