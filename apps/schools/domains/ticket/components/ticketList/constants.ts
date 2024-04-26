import { StatusesEnum } from '@domains/common/constants/Enums'
import type { LiteralUnion } from 'antd/lib/_util/type'
import type { PresetColorType, PresetStatusColorType } from 'antd/lib/_util/colors'
import { CANCELED_FILTER_COLOR, IN_PROGRESS_FILTER_COLOR, SENT_FILTER_COLOR } from './styles/styles'

export const searchTicketsColumns = ['family__name', 'ticket_comment__value']

interface TagType {
    text: string
    color: string
    antdColor: LiteralUnion<PresetColorType | PresetStatusColorType, string>
}

export const StatusDictionary: { [key: string]: TagType } = {
    [StatusesEnum.SENT]: { text: 'Новое', color: SENT_FILTER_COLOR, antdColor: 'red' },
    [StatusesEnum.IN_PROGRESS]: { text: 'Открыто', color: IN_PROGRESS_FILTER_COLOR, antdColor: 'blue' },
    [StatusesEnum.CANCELED]: { text: 'Закрыто', color: CANCELED_FILTER_COLOR, antdColor: 'green' },
}
