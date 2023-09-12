import { QueryStatuses } from '@domains/common/constants/Enums'

export const searchStudentsColumns = [
    'student__name',
    'additional__parent_phone',
    'additional__parent_name',
    'recipient__name',
]

type TagColor = 'green' | 'blue' | 'yellow' | 'red' | 'pink'

interface TagType {
    text: string
    color: TagColor
}

export const StatusDictionary: { [key: string]: TagType } = {
    [QueryStatuses.SENT]: { text: 'Отправлено', color: 'yellow' },
    [QueryStatuses.IN_PROGRESS]: { text: 'На рассмотрении', color: 'blue' },
    [QueryStatuses.ACCEPTED]: { text: 'Принято', color: 'green' },
    [QueryStatuses.CANCELED]: { text: 'Отменено', color: 'pink' },
    [QueryStatuses.DECLINED]: { text: 'Отклонено', color: 'red' },
}
