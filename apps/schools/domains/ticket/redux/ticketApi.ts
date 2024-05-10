import { commonApi } from '@store/commonApi'
import { ReturnedData } from '@domains/common/redux/interfaces'
import { CreateCommentData, GetTicketComment, UpdateCommentData } from '@domains/ticket/redux/serializers'

const ticketApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        SeenTicketComment: build.mutation<{ query: GetTicketComment }, UpdateCommentData>({
            query: (data) => ({
                url: `/ticket-management/ticket/ticket-comment/${data.ticket_comment_id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => ['Ticket'],
        }),
        CreateComment: build.mutation<{ ticket_comment: GetTicketComment }, CreateCommentData>({
            query: (data) => ({
                url: `/ticket-management/ticket/${data.ticket_id}/comment`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => ['Ticket', 'TicketComments'],
        }),
        GetTicketComments: build.query<ReturnedData<GetTicketComment[]>, { ticket_id: string }>({
            query: (params) => ({
                url: `/ticket-management/ticket/${params.ticket_id}/comments`,
                method: 'GET',
                params: params,
            }),
            providesTags: ['TicketComments'],
        }),
    }),
})

export const { useCreateCommentMutation, useSeenTicketCommentMutation, useGetTicketCommentsQuery } = ticketApi
