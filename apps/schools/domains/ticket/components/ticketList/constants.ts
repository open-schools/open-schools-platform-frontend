import { QueryStatuses, TicketStatuses } from '@domains/common/constants/Enums'
import { CLOSED_FILTER_COLOR, OPENED_FILTER_COLOR, NEW_FILTER_COLOR } from './styles/styles'
import type { LiteralUnion } from 'antd/lib/_util/type'
import type { PresetColorType, PresetStatusColorType } from 'antd/lib/_util/colors'
import {
    ACCEPTED_FILTER_COLOR,
    CANCELED_FILTER_COLOR,
    DECLINED_FILTER_COLOR,
    IN_PROGRESS_FILTER_COLOR,
    SENT_FILTER_COLOR,
} from '@domains/query/components/queryList/styles/styles'

export const searchTicketsColumns = ['family__name']

interface TagType {
    text: string
    color: string
    antdColor: LiteralUnion<PresetColorType | PresetStatusColorType, string>
}

//
// export const StatusDictionary: { [key: string]: TagType } = {
//     [TicketStatuses.NEW]: { text: 'Отправлено', color: NEW_FILTER_COLOR, antdColor: 'red' },
//     [TicketStatuses.OPENED]: { text: 'На рассмотрении', color: OPENED_FILTER_COLOR, antdColor: 'blue' },
//     [TicketStatuses.CLOSED]: { text: 'Принято', color: CLOSED_FILTER_COLOR, antdColor: 'green' },
// }

export const StatusDictionary: { [key: string]: TagType } = {
    [QueryStatuses.SENT]: { text: 'Отправлено', color: SENT_FILTER_COLOR, antdColor: 'gold' },
    [QueryStatuses.IN_PROGRESS]: { text: 'На рассмотрении', color: IN_PROGRESS_FILTER_COLOR, antdColor: 'blue' },
    [QueryStatuses.ACCEPTED]: { text: 'Принято', color: ACCEPTED_FILTER_COLOR, antdColor: 'green' },
    [QueryStatuses.CANCELED]: { text: 'Отменено', color: CANCELED_FILTER_COLOR, antdColor: 'volcano' },
    [QueryStatuses.DECLINED]: { text: 'Отклонено', color: DECLINED_FILTER_COLOR, antdColor: 'red' },
}
