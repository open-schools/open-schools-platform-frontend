import { GetFamily, GetOrganization } from '@domains/common/redux/serializers'
import { BasePaginationData, QueriesTypes } from '@domains/common/redux/interfaces'

export interface GetTicket {
    id?: string
    last_comment: GetTicketComment
    recipient: GetOrganization
    created_at: string
    unread_sender_comments_count?: string
    unread_recipient_comments_count?: string
    sender?: GetFamily
    status?: QueriesTypes
}

export interface GetTicketComment {
    id: string
    is_sender: boolean
    is_seen?: boolean
    value: string
    created_at?: string
    sender: GetTicketCommentSender
    is_internal_recipient?: boolean
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
    ticket_comment__id?: string
    ticket_comment__value?: string
    organization_id?: string
}

export interface GetTicketData extends BasePaginationData {
    organization_id?: string
    ticket_id?: string
}

export interface CreateCommentData {
    ticket_id?: string
    data: CreateTicketComment
}

export interface CreateTicketComment {
    value: string
    is_sender: boolean
    sender_id?: string
    sender_ct?: string
    is_internal_recipient?: boolean
}

export interface UpdateCommentData {
    is_seen: boolean
    ticket_comment_id: string
}
