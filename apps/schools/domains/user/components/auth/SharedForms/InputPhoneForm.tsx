import { Col, Form, Row, Typography } from 'antd'
import { ResponsiveCol } from 'domains/user/components/auth/containers/ResponsiveCol'
import getConfig from 'next/config'
import Router, { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { isSafeUrl } from '../../../../common/utils/url.utils'
import { Input } from '../../../../common/components/Input'
import styles from '../styles/formStyles.module.scss'

import { Button } from '../../../../common/components'
import { normalizePhone } from '../../../../common/utils/phone'
import { IInputPhoneFormProps } from './interfaces'
import { FORM_ITEMS_GUTTER } from '../constants/styles'

export const InputPhoneForm: React.FC<IInputPhoneFormProps> = ({
    onFinish,
    nextUrl,
    title,
    buttonText,
    description,
    disclaimer,
}) => {
    // const {
    //     publicRuntimeConfig: { hasSbbolAuth },
    // } = getConfig()

    const [form] = Form.useForm()
    const router = useRouter()
    const {
        query: { next },
    } = router
    const redirectUrl =
        next && !Array.isArray(next) && isSafeUrl(next) ? next : '/'
    // const { refetch } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    // const [signinByPhoneAndPassword] = useMutation(SIGNIN_BY_PHONE_AND_PASSWORD_MUTATION)

    const startConfirmPhone = useCallback(async () => {
        let { phone: inputPhone } = form.getFieldsValue(['phone'])
        inputPhone = '+' + inputPhone
        console.log(inputPhone)
        const phone = normalizePhone(inputPhone)
        console.log(phone)
        if (!phone) {
            form.setFields([
                {
                    name: 'phone',
                    errors: ['Неверный формат телефона'],
                },
            ])
            return
        }

        // setPhone(phone)
        // const captcha = await handleReCaptchaVerify('start_confirm_phone')
        // const variables = { data: { ...registerExtraData, phone, captcha } }
        setIsLoading(true)

        // @ts-ignore TODO(Dimitreee): remove after runMutation typo
        // return runMutation({
        //     mutation: startPhoneVerify,
        //     variables,
        //     onError: (error) => {
        //         form.setFields([
        //             {
        //                 name: 'phone',
        //                 // NOTE(pahaz): `friendlyDescription` is the last GQLError.messageForUser!
        //                 errors: [(error.friendlyDescription) ? error.friendlyDescription : SMSTooManyRequestsErrorMsg],
        //             },
        //         ])
        //     },
        //     onCompleted: (data) => {
        //         const { data: { result: { token } } } = data
        //         setToken(token)
        //         Router.push(`/auth/register?token=${token}`)
        //         onFinish()
        //     },
        //     // Skip notification
        //     OnCompletedMsg: null,
        //     onFinally: () => {
        //         setIsLoading(false)
        //     },
        //     intl,
        //     form,
        //     ErrorToFormFieldMsgMapping,
        // })
        Router.push(`/auth/${nextUrl}?token=${37128937218937}`)
        onFinish()
    }, [form, /*handleReCaptchaVerify*/ /*setPhone*/ setIsLoading /*onFinish*/])

    const initialValues = { password: '', phone: '' }

    return (
        <Form
            form={form}
            name="signin"
            onFinish={startConfirmPhone}
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
                                        message: 'Необходимо заполнить',
                                    },
                                ]}
                                data-cy="register-phone-item"
                            >
                                <Input type={'inputPhone'} />
                            </Form.Item>
                        </Col>
                        {disclaimer && <Col span={24}>{disclaimer}</Col>}
                        <Col span={24}>
                            <Form.Item>
                                <Button
                                    key="submit"
                                    type="schoolDefault"
                                    htmlType="submit"
                                    loading={isLoading}
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
