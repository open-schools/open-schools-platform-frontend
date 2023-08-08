// Menu items disable rules

export type Rules = 'isOrganizationSelected'
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

export const isOrganizationSelected = 'isOrganizationSelected'
