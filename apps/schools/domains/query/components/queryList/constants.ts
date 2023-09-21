import { QueryStatuses } from '@domains/common/constants/Enums'
import {
    ACCEPTED_FILTER_COLOR, CANCELED_FILTER_COLOR, DECLINED_FILTER_COLOR,
    IN_PROGRESS_FILTER_COLOR,
    SENT_FILTER_COLOR
} from "@domains/query/components/queryList/styles/styles";

export const searchStudentsColumns = [
    'student__name',
    'additional__parent_phone',
    'additional__parent_name',
    'recipient__name',
]

interface TagType {
    text: string
    color: string
}

export const StatusDictionary: { [key: string]: TagType } = {
    [QueryStatuses.SENT]: { text: 'Отправлено', color: SENT_FILTER_COLOR },
    [QueryStatuses.IN_PROGRESS]: { text: 'На рассмотрении', color: IN_PROGRESS_FILTER_COLOR },
    [QueryStatuses.ACCEPTED]: { text: 'Принято', color: ACCEPTED_FILTER_COLOR },
    [QueryStatuses.CANCELED]: { text: 'Отменено', color: CANCELED_FILTER_COLOR },
    [QueryStatuses.DECLINED]: { text: 'Отклонено', color: DECLINED_FILTER_COLOR },
}
