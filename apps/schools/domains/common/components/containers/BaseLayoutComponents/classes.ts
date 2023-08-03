import { ReactNode } from 'react'
import { RuleItem, Rules } from '@domains/common/access/rules'

export class MenuItemObj extends RuleItem {
    url: string
    name: string
    icon: ReactNode

    constructor(url: string, name: string, icon: ReactNode, disableRules: Rules[]) {
        super(disableRules)
        this.url = url
        this.name = name
        this.icon = icon
    }
}
