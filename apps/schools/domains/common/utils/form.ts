import { FormInstance } from 'antd/lib/form/hooks/useForm'
import { normalizePhone } from '@domains/common/utils/phone'
import { WrongPhoneFormatMsg } from '@domains/user/components/auth/constants/message'

export function checkIfNotEmptyValue(x: any) {
    return Boolean(Array.isArray(x) ? x.length !== 0 : x)
}

export function isValidFormCheck(form: FormInstance, required_fields: string[], initial_values: any = {}) {
    if (Object.keys(initial_values).length === 0)
        return Object.entries(form.getFieldsValue()).every(
            (x) => checkIfNotEmptyValue(x[1]) || !required_fields.includes(x[0]),
        )

    return !Object.entries(form.getFieldsValue()).every((x) => x[1] === initial_values[x[0]])
}

export function isPhoneValid(form: FormInstance, field_name: string) {
    let inputPhone = form.getFieldsValue([field_name])[field_name]
    inputPhone = '+' + inputPhone
    const phone = normalizePhone(inputPhone)

    if (!phone) {
        form.setFields([
            {
                name: field_name,
                errors: [WrongPhoneFormatMsg],
            },
        ])
        return 0
    }
    return 1
}

export function removeEmpty(obj: any): any {
    return Object.fromEntries(
        Object.entries(obj)
            .filter(([_, v]) => v != null && v != '' && v != undefined)
            .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v]),
    )
}
