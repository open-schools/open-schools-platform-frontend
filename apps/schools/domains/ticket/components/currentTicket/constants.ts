import {
    CLOSED_FILTER_COLOR,
    IN_PROGRESS_FILTER_COLOR,
    SENT_FILTER_COLOR,
} from '@domains/ticket/components/ticketList/styles/styles'
import { StatusesEnum } from '@domains/common/constants/Enums'

export const StatusDictionary: { [key: string]: { text: string; color: string } } = {
    [StatusesEnum.SENT]: { text: 'Новое', color: SENT_FILTER_COLOR },
    [StatusesEnum.IN_PROGRESS]: { text: 'Открыто', color: IN_PROGRESS_FILTER_COLOR },
    [StatusesEnum.CLOSED]: { text: 'Закрыто', color: CLOSED_FILTER_COLOR },
}

export const TransformStatus = (status: string) => {
    return StatusDictionary[status]?.text || status
}

export const Graph: { [key: string]: string[] } = {
    [StatusesEnum.SENT]: [StatusesEnum.SENT, StatusesEnum.IN_PROGRESS, StatusesEnum.CLOSED],
    [StatusesEnum.IN_PROGRESS]: [StatusesEnum.IN_PROGRESS, StatusesEnum.CLOSED],
    [StatusesEnum.CLOSED]: [StatusesEnum.CLOSED],
}
