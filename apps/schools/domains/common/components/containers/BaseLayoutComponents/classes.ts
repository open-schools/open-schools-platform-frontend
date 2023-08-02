import { RuleItem, Rules } from '../../../access/rules'
import { ReactNode } from 'react'

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
