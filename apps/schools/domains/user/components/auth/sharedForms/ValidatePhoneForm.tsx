import { Col, Form, Row, Space, Typography as DefaultTypography } from 'antd'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import styles from '../styles/formStyles.module.scss'
import { formatPhone } from '../../../../common/utils/helpers'
import { ResponsiveCol } from '../containers/ResponsiveCol'
import { Input } from '../../../../common/components/input'
import { CountDownTimer } from '../../../../common/components/countDownTimer'
import { FirebaseReCaptchaContext } from '../../../providers/firebaseReCaptchaProvider'
import { IValidatePhoneFormProps } from './interfaces'
import {
    BUTTON_FORM_GUTTER_40,
    FORM_ITEMS_GUTTER,
    SMS_CODE_CLEAR_REGEX,
    SMS_INPUT_STYLE,
} from '../constants/styles'
import { otpHandler, resendOtpHandler } from '../../../handlers/auth/register'
import { useResendMutation, useVerifyMutation } from '../../../redux/userApi'
import { SMS_CODE_LENGTH } from '../constants/numbers'
import { CodeMustContainCaetrainLength, NeedConfirmField } from '../constants/message'
import { Button } from '../../../../common/components/button'
import { initializeApp } from '@firebase/app'
import { getAuth, RecaptchaVerifier } from '@firebase/auth'

export const ValidatePhoneForm: React.FC<IValidatePhoneFormProps> = ({
    onFinish,
    onReset,
    title,
}) => {
    const [form] = Form.useForm()
    const {
        phone,
        setToken,
    } = useContext(FirebaseReCaptchaContext)
    const [verifyCode] = useVerifyMutation()
    const [resend] = useResendMutation()
    const [showPhone, setShowPhone] = useState(phone)
    const [smsCode, setSmsCode] = useState('')
    const [isPhoneVisible, setIsPhoneVisible] = useState(false)
    const [phoneValidateError, setPhoneValidateError] = useState(null)
    const PhoneToggleLabel = isPhoneVisible ? 'Показать' : 'Скрыть'

    const SMS_VALIDATOR = useCallback(
        () => ({
            validator () {
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
            { required: true, message: NeedConfirmField },
            { len: SMS_CODE_LENGTH, message: CodeMustContainCaetrainLength },
            SMS_VALIDATOR,
        ],
        ['Необходимо заполнить', SMS_VALIDATOR]
    )

    const confirmPhone = useCallback(async (smsCode: string) => {
        otpHandler(smsCode, verifyCode, onFinish)
    }, [form])

    const smsValidator = useCallback(async () => {
        setPhoneValidateError(null)
        let smsCode = (form.getFieldValue('smsCode') || '').toString()
        smsCode = smsCode.replace(SMS_CODE_CLEAR_REGEX, '')
        form.setFieldsValue({ smsCode })
        if (smsCode.length !== SMS_CODE_LENGTH) {
            return
        }
        try {
            await confirmPhone(smsCode)
        } catch (error) {
            console.error(error)
        }
    }, [confirmPhone])

    useEffect(() => {
        const app = initializeApp({
            apiKey: process.env.NEXT_PUBLIC_apiKey,
            authDomain: process.env.NEXT_PUBLIC_authDomain,
            projectId: process.env.NEXT_PUBLIC_projectId,
            storageBucket: process.env.NEXT_PUBLIC_storageBucket,
            messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
            appId: process.env.NEXT_PUBLIC_appId,
            measurementId: process.env.NEXT_PUBLIC_measurementId,
        })

        const auth = getAuth(app)
        const recaptchaVerifierInstance = new RecaptchaVerifier(
            'recaptcha-container',
            {
                size: 'invisible',
                'callback': (token: string) => {
                    setToken(token)
                    resendOtpHandler(token, resend, onReset)
                },
            },
            auth
        )
        recaptchaVerifierInstance.render()
    }, [])

    useEffect(() => {
        const formattedPhone = formatPhone(phone)
        const phoneVisible = isPhoneVisible
            ? formattedPhone
            : `${formattedPhone.substring(0, 9)}***${formattedPhone.substring(
                12
            )}`
        setShowPhone(phoneVisible)
    }, [isPhoneVisible, phone, setShowPhone])

    const initialValues = { smsCode: smsCode }

    return (
        <Form
            form={form}
            name="register-verify-code"
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
                                onClick={onReset}
                            >
                                Изменить номер
                            </DefaultTypography.Link>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="smsCode"
                                data-cy="register-smscode-item"
                                rules={SMS_CODE_VALIDATOR_RULES}
                            >
                                <Input
                                    placeholder=""
                                    inputMode="numeric"
                                    customType={'inputCenter'}
                                    label={'Код из СМС'}
                                    pattern="[0-9]*"
                                    value={smsCode}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        if (value.length <= 6) {
                                            setSmsCode(value)
                                            smsValidator()
                                        }
                                    }}
                                    style={SMS_INPUT_STYLE}
                                    maxLength={SMS_CODE_LENGTH}
                                />
                            </Form.Item>
                        </Col>
                        <ResponsiveCol span={24}>
                            <CountDownTimer
                                action={async () => {}}
                                id="RESEND_SMS"
                                timeout={60}
                                autostart={true}
                            >
                                {({ countdown, runAction }) => {
                                    const isCountDownActive = countdown > 0
                                    return <div>
                                        <Space direction="horizontal" size={8} style={{ display: (isCountDownActive ? 'unset' : 'none') }}>
                                            <DefaultTypography.Link
                                                disabled={true}
                                            >
                                                Код действителен
                                            </DefaultTypography.Link>
                                            <DefaultTypography.Text type="secondary">
                                                {`${new Date(countdown * 1000)
                                                    .toISOString()
                                                    .substr(14, 5)}`}
                                            </DefaultTypography.Text>
                                        </Space>
                                        <Button
                                            style={{ display: (isCountDownActive ? 'none' : 'unset') }}
                                            type='schoolResend'
                                            id="recaptcha-container"
                                            onClick={runAction}
                                        >
                                            Отправить СМС-код ещё раз
                                        </Button>
                                    </div>
                                }}
                            </CountDownTimer>
                        </ResponsiveCol>
                    </Row>
                </ResponsiveCol>
            </Row>
        </Form>
    )
}
