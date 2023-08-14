// Menu items disable rules

export const isOrganizationSelected = 'isOrganizationSelected'
export const permanentDisabled = 'permanentDisabled'

export type Rules = 'isOrganizationSelected' | 'permanentDisabled'

export type RulesDictionary = Record<Rules, boolean>

export class RuleItem {
    disableRules: Rules[]

    constructor(disableRules: Rules[]) {
        this.disableRules = disableRules
    }

    isDisabled(conditions: RulesDictionary): boolean {
        return !this.disableRules.every((i) => conditions[i])
    }
}
