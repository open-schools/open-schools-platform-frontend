import { Col, Form, Row, Space, Typography as DefaultTypography } from 'antd'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import styles from '../styles/formStyles.module.scss'
import { formatPhone } from '../../../../common/utils/helpers'
import { ResponsiveCol } from '../containers/ResponsiveCol'
import { Input } from '../../../../common/components/Input'
import { CountDownTimer } from '../../../../common/components/CountDownTimer'
import { FirebaseReCaptchaContext } from '../../../providers/firebaseReCaptchaProvider'
import { IValidatePhoneFormProps } from './interfaces'
import {
    BUTTON_FORM_GUTTER_40,
    FORM_ITEMS_GUTTER,
    SMS_CODE_CLEAR_REGEX,
    SMS_INPUT_STYLE,
} from '../constants/styles'

export const ValidatePhoneForm: React.FC<IValidatePhoneFormProps> = ({
    onFinish,
    onReset,
    title,
}) => {
    const [form] = Form.useForm()
    const {
        token,
        phone,
    } = useContext(FirebaseReCaptchaContext)
    const [showPhone, setShowPhone] = useState(phone)
    const [isPhoneVisible, setIsPhoneVisible] = useState(false)
    const [phoneValidateError, setPhoneValidateError] = useState(null)
    // const [resendSmsMutation] = useMutation(RESEND_CONFIRM_PHONE_SMS_MUTATION)
    // const [completeConfirmPhoneMutation] = useMutation(COMPLETE_CONFIRM_PHONE_MUTATION)
    const PhoneToggleLabel = isPhoneVisible ? 'Показать' : 'Скрыть'

    const SMS_VALIDATOR = useCallback(
        () => ({
            validator() {
                if (!phoneValidateError) {
                    return Promise.resolve()
                }
                return Promise.reject(phoneValidateError)
            },
        }),
        [phoneValidateError]
    )

    const SMS_CODE_VALIDATOR_RULES = useMemo(
        () => [
            { required: true, message: 'Необходимо заполнить' },
            SMS_VALIDATOR,
        ],
        ['Необходимо заполнить', SMS_VALIDATOR]
    )

    const resendSms = useCallback(async () => {
    //     const sender = getClientSideSenderInfo()
    //     const captcha = await handleReCaptchaVerify('resend_sms')
    //     const variables = {data: {token, sender, captcha, dv: 1}}
    //     return runMutation({
    //         mutation: resendSmsMutation,
    //         variables,
    //         intl,
    //         form,
    //         ErrorToFormFieldMsgMapping,
    //     }).catch(error => {
    //         console.error(error)
    //     })
    }, [form/*, handleReCaptchaVerify*/])

    const confirmPhone = useCallback(async () => {
        // const sender = getClientSideSenderInfo()
        // const smsCode = Number(form.getFieldValue('smsCode'))
        // if (isNaN(smsCode)) {
        //     throw new Error(SMSBadFormat)
        // }
        // const captcha = await handleReCaptchaVerify('complete_verify_phone')
        // const variables = {data: {token, smsCode, captcha, dv: 1, sender}}
        // return runMutation({
        //     mutation: completeConfirmPhoneMutation,
        //     variables,
        //     intl,
        //     form,
        //     // Skip notification
        //     OnCompletedMsg: null,
        //     ErrorToFormFieldMsgMapping,
        // })
    }, [form])

    const handleVerifyCode = useCallback(async () => {
        setPhoneValidateError(null)
        let smsCode = (form.getFieldValue('smsCode') || '').toString()
        smsCode = smsCode.replace(SMS_CODE_CLEAR_REGEX, '')
        form.setFieldsValue({ smsCode })
        if (smsCode.length < /*SMS_CODE_LENGTH*/ 4) {
            return
        }
        // if (smsCode.length > SMS_CODE_LENGTH) {
        //     return setPhoneValidateError(SMSCodeMismatchError)
        // }
        try {
            await confirmPhone()
            onFinish()
        } catch (error) {
            console.error(error)
        }
    }, [confirmPhone])

    useEffect(() => {
        const formattedPhone = formatPhone(phone)
        const phoneVisible = isPhoneVisible
            ? formattedPhone
            : `${formattedPhone.substring(0, 9)}***${formattedPhone.substring(
                  12
              )}`
        setShowPhone(phoneVisible)
    }, [isPhoneVisible, phone, setShowPhone])

    const initialValues = { smsCode: '' }

    return (
        <Form
            form={form}
            name="register-verify-code"
            // onFinish={startConfirmPhone}
            initialValues={initialValues}
            colon={false}
            labelAlign="left"
            requiredMark={false}
            layout="vertical"
        >
            <Row gutter={BUTTON_FORM_GUTTER_40} className={styles.rowStyles}>
                <ResponsiveCol span={24} className={styles.textCenter}>
                    <Row gutter={FORM_ITEMS_GUTTER}>
                        <Col span={24}>
                            <DefaultTypography.Title level={2}>
                                {title}
                            </DefaultTypography.Title>
                        </Col>
                        <Col span={24}>
                            Отправили SMS-код на номер
                            <span style={{ whiteSpace: 'nowrap' }}>
                                {`${formatPhone(showPhone)} `}
                                <DefaultTypography.Link
                                    underline
                                    style={{ color: 'black' }}
                                    onClick={() =>
                                        setIsPhoneVisible(!isPhoneVisible)
                                    }
                                >
                                    ({PhoneToggleLabel})
                                </DefaultTypography.Link>
                            </span>
                        </Col>
                        <Col span={24}>
                            <DefaultTypography.Link
                                underline
                                style={
                                    {
                                        /* color: colors.textSecondary*/
                                    }
                                }
                                onClick={onReset}
                            >
                                Изменить номер
                            </DefaultTypography.Link>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                // style={{ display: "flex", justifyContent: "center", textAlign: "center"}}
                                name="smsCode"
                                // label={"Код из СМС"}
                                data-cy="register-smscode-item"
                                rules={SMS_CODE_VALIDATOR_RULES}
                            >
                                <Input
                                    placeholder=""
                                    inputMode="numeric"
                                    type={'inputCenter'}
                                    label={'Код из СМС'}
                                    pattern="[0-9]*"
                                    onChange={handleVerifyCode}
                                    style={SMS_INPUT_STYLE}
                                />
                            </Form.Item>
                        </Col>
                        <ResponsiveCol span={24}>
                            <CountDownTimer
                                action={resendSms}
                                id="RESEND_SMS"
                                timeout={60}
                                autostart={true}
                            >
                                {({ countdown, runAction }) => {
                                    const isCountDownActive = countdown > 0
                                    return isCountDownActive ? (
                                        <Space direction="horizontal" size={8}>
                                            <DefaultTypography.Link
                                                disabled={true}
                                                // style={{ color: colors.textSecondary }}
                                            >
                                                Код действителен
                                            </DefaultTypography.Link>
                                            <DefaultTypography.Text type="secondary">
                                                {`${new Date(countdown * 1000)
                                                    .toISOString()
                                                    .substr(14, 5)}`}
                                            </DefaultTypography.Text>
                                        </Space>
                                    ) : (
                                        <DefaultTypography.Link
                                            underline
                                            // style={{ color: colors.textSecondary }}
                                            onClick={runAction}
                                        >
                                            Отправить СМС-код ещё раз
                                        </DefaultTypography.Link>
                                    )
                                }}
                            </CountDownTimer>
                        </ResponsiveCol>
                    </Row>
                </ResponsiveCol>
            </Row>
        </Form>
    )
}
