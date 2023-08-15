import {FormInstance} from "antd/lib/form/hooks/useForm";
import {normalizePhone} from "@domains/common/utils/phone";
import {WrongPhoneFormatMsg} from "@domains/user/components/auth/constants/message";

export function isValidFormCheck(form: FormInstance, required_fields: string[]) {
    return Object.entries(form.getFieldsValue()).every(x => Array.isArray(x[1]) ? x[1].length !== 0 : x[1] || !required_fields.includes(x[0]));
}

export function isPhoneValid(form: FormInstance, field_name: string){
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