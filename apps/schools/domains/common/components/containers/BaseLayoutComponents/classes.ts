import { RuleItem, Rules } from '../../../access/rules'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'

export class MenuItemObj extends RuleItem {
    url: string
    name: string
    icon: AntdIconProps

    constructor(
        url: string,
        name: string,
        icon: AntdIconProps,
        disableRules: Rules[]
    ) {
        super(disableRules)
        this.url = url
        this.name = name
        this.icon = icon
    }
}