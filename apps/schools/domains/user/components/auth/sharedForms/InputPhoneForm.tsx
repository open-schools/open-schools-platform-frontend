import { Col, Form, Row, Typography } from 'antd'
import { ResponsiveCol } from 'domains/user/components/auth/containers/ResponsiveCol'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Input } from '../../../../common/components/input'
import styles from '../styles/formStyles.module.scss'

import { Button } from '../../../../common/components/button'
import { IInputPhoneFormProps } from './interfaces'
import { FORM_ITEMS_GUTTER } from '../constants/styles'
import { FirebaseReCaptchaContext } from '../../../providers/firebaseReCaptchaProvider'
import { tokenHandler } from '../../../handlers/auth/register'
import { useTokenMutation } from '../../../redux/userApi'
import { initializeApp } from '@firebase/app'
import { getAuth, RecaptchaVerifier } from '@firebase/auth'
import { useInputPhoneFormValidators } from './hooks'

export const InputPhoneForm: React.FC<IInputPhoneFormProps> = ({
    nextUrl,
    title,
    buttonText,
    description,
    disclaimer,
    onFinish,
}) => {
    const validators = useInputPhoneFormValidators()

    const { setPhone, token, setToken } = useContext(FirebaseReCaptchaContext)
    const [registration] = useTokenMutation()
    const [form] = Form.useForm()
    const router = useRouter()
    const {
        query: { next },
    } = router

    const initialValues = { phone: '' }

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
                callback: (token: string) => {
                    setToken(token)
                    tokenHandler(token, form, nextUrl, registration, onFinish)
                },
            },
            auth
        )
        recaptchaVerifierInstance.render()
    }, [])

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
                                rules={validators.phone}
                                data-cy="register-phone-item"
                            >
                                <Input
                                    onChange={(value) =>
                                        setPhone(value.target.value)
                                    }
                                    customType={'inputPhone'}
                                />
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
                                    onClick={() =>
                                        tokenHandler(
                                            token,
                                            form,
                                            nextUrl,
                                            registration,
                                            onFinish
                                        )
                                    }
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
