import { StatusesEnum } from '@domains/common/constants/Enums'
import {
    ACCEPTED_FILTER_COLOR,
    CANCELED_FILTER_COLOR,
    DECLINED_FILTER_COLOR,
    IN_PROGRESS_FILTER_COLOR,
    SENT_FILTER_COLOR,
} from '@domains/query/components/queryList/styles/styles'
import type { LiteralUnion } from 'antd/lib/_util/type'
import type { PresetColorType, PresetStatusColorType } from 'antd/lib/_util/colors'

export const searchStudentsColumns = [
    'student__name',
    'additional__parent_phone',
    'additional__parent_name',
    'recipient__name',
]

interface TagType {
    text: string
    color: string
    antdColor: LiteralUnion<PresetColorType | PresetStatusColorType, string>
}

export const StatusDictionary: { [key: string]: TagType } = {
    [StatusesEnum.SENT]: { text: 'Отправлено', color: SENT_FILTER_COLOR, antdColor: 'gold' },
    [StatusesEnum.IN_PROGRESS]: { text: 'На рассмотрении', color: IN_PROGRESS_FILTER_COLOR, antdColor: 'blue' },
    [StatusesEnum.ACCEPTED]: { text: 'Принято', color: ACCEPTED_FILTER_COLOR, antdColor: 'green' },
    [StatusesEnum.CANCELED]: { text: 'Отменено', color: CANCELED_FILTER_COLOR, antdColor: 'volcano' },
    [StatusesEnum.DECLINED]: { text: 'Отклонено', color: DECLINED_FILTER_COLOR, antdColor: 'red' },
}
