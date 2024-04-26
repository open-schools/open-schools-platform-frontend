import { GetFamily, GetOrganization } from '@domains/common/redux/serializers'
import { BasePaginationData, QueriesTypes } from '@domains/common/redux/interfaces'

export interface GetTicket {
    id?: string
    last_comment: GetTicketComment
    recipient: GetOrganization
    created_at?: string
    unread_sender_comments_count?: string
    unread_recipient_comments_count?: string
    sender?: GetFamily
    status?: QueriesTypes
}

export interface GetTicketComment {
    id?: string
    is_sender: boolean
    is_seen?: boolean
    value: string
    created_at?: string
    sender: GetTicketCommentSender
}

export interface GetTicketCommentSender {
    id: string
    name: string
}

export interface GetTicketsData extends BasePaginationData {
    id?: string
    created_at?: string
    recipient_id?: string
    recipient_ct?: string
    status?: string
    or_search?: string
    family__id?: string
    family__name?: string
    family__parent_phone?: string
    organization_id?: string
}
