import { Col, Form, Row, Typography } from 'antd'
import { ResponsiveCol } from 'domains/user/components/auth/containers/ResponsiveCol'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
// import { isSafeUrl } from '../../../../common/utils/url.utils'
import { Input } from '../../../../common/components/Input'
import styles from '../styles/formStyles.module.scss'

import { Button } from '../../../../common/components/Button'
import { normalizePhone } from '../../../../common/utils/phone'
import { IInputPhoneFormProps } from './interfaces'
import { FORM_ITEMS_GUTTER } from '../constants/styles'
import { FirebaseReCaptchaContext } from '../../../providers/firebaseReCaptchaProvider'
import { tokenHandler } from '../../../handlers/auth/register'
import { useTokenMutation } from '../../../redux/userApi'
import { NeedConfirmField } from '../constants/message'

export const InputPhoneForm: React.FC<IInputPhoneFormProps> = ({
    onFinish,
    nextUrl,
    title,
    buttonText,
    description,
    disclaimer,
}) => {
    const {
        setPhone,
        token,
    } = useContext(FirebaseReCaptchaContext)
    const [registration] = useTokenMutation()

    const [form] = Form.useForm()
    const router = useRouter()
    const {
        query: { next },
    } = router
    // const redirectUrl =
    //     next && !Array.isArray(next) && isSafeUrl(next) ? next : '/'

    useEffect(() => {
        if (token === '')
            return
        let { phone: inputPhone } = form.getFieldsValue(['phone'])
        inputPhone = '+' + inputPhone
        const phone = normalizePhone(inputPhone)
        if (!phone) {
            form.setFields([
                {
                    name: 'phone',
                    errors: ['Неверный формат телефона'],
                },
            ])
            return
        }
        tokenHandler(phone, token, nextUrl, registration, onFinish)
    }, [token])

    const initialValues = { phone: '' }

    return (
        <Form
            form={form}
            name="signin"
            initialValues={initialValues}
            requiredMark={false}
            layout="vertical"
        >
            <Row className={styles.rowStyles}>
                <ResponsiveCol span={24}>
                    <Row gutter={FORM_ITEMS_GUTTER}>
                        {title && (
                            <Col span={24}>
                                <Typography.Title level={2}>
                                    {title}
                                </Typography.Title>
                            </Col>
                        )}
                        {description && (
                            <Col span={24} className={styles.textCenter}>
                                {description}
                            </Col>
                        )}
                        <Col span={24}>
                            <Form.Item
                                name="phone"
                                label={'Телефон'}
                                rules={[
                                    {
                                        required: true,
                                        message: NeedConfirmField,
                                    },
                                ]}
                                data-cy="register-phone-item"
                            >
                                <Input
                                    onChange={(value) => setPhone(value.target.value)}
                                    customType={'inputPhone'} />
                            </Form.Item>
                        </Col>
                        {disclaimer && <Col span={24}>{disclaimer}</Col>}
                        <Col span={24}>
                            <Form.Item>
                                <Button
                                    id="recaptcha-container"
                                    key="submit"
                                    type="schoolDefault"
                                    htmlType="submit"
                                    block
                                    data-cy="signin-button"
                                >
                                    {buttonText}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </ResponsiveCol>
            </Row>
        </Form>
    )
}
