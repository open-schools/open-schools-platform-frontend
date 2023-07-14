import { Col, Form, Row, Typography } from 'antd'
import { ResponsiveCol } from 'domains/user/components/auth/containers/ResponsiveCol'
import Router, { useRouter } from 'next/router'
import React, { useState } from 'react'
// import { isSafeUrl } from '../../../../common/utils/url.utils'
import { Input } from '../../../../common/components/Input'
import styles from '../styles/formStyles.module.scss'
import { Button } from '../../../../common/components/Button'
import { loginHandler } from '../../../handlers/auth/signin'
import { useLoginMutation } from '../../../redux/authenticationApi'
import { NeedConfirmField } from '../constants/message'

export const SignInForm = (): React.ReactElement => {
    // const {
    //     publicRuntimeConfig: { hasSbbolAuth },
    // } = getConfig()

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const [login] = useLoginMutation()

    const [form] = Form.useForm()
    const router = useRouter()
    const {
        query: { next },
    } = router
    // const redirectUrl =
    //     next && !Array.isArray(next) && isSafeUrl(next) ? next : '/'
    // const { refetch } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    // const [signinByPhoneAndPassword] = useMutation(SIGNIN_BY_PHONE_AND_PASSWORD_MUTATION)

    // const ErrorToFormFieldMsgMapping = useMemo(() => {
    //     return {
    //         [WRONG_PHONE_ERROR]: {
    //             name: 'signinError',
    //             errors: [PasswordOrPhoneMismatch],
    //         },
    //         [WRONG_PASSWORD_ERROR]: {
    //             name: 'signinError',
    //             errors: [PasswordOrPhoneMismatch],
    //         },
    //     }
    // }, [intl])

    // const onFormSubmit = useCallback((values) => {
    //     setIsLoading(true)
    //
    //     return runMutation({
    //
    //     }).catch(() => {
    //         setIsLoading(false)
    //     })
    // }, [form])

    const initialValues = { password: '', phone: '' }

    return (
        <Form
            form={form}
            name="signin"
            // onFinish={onFormSubmit}
            initialValues={initialValues}
            requiredMark={false}
            layout="vertical"
        >
            <Row className={styles.rowStyles}>
                <ResponsiveCol span={24}>
                    <Row>
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
                                data-cy="signin-phone-item"
                            >
                                <Input
                                    onChange={(value: any) => setPhone(value.target.value)}
                                    type={'inputPhone'}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="password"
                                label={'Пароль'}
                                rules={[
                                    {
                                        required: true,
                                        message: NeedConfirmField,
                                    },
                                ]}
                                data-cy="signin-password-item"
                            >
                                <Input
                                    onChange={(value: any) => setPassword(value.target.value)}
                                    type={'inputPassword'}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                Забыли пароль?&nbsp;
                                <Typography.Link
                                    onClick={() => Router.push('/auth/forgot')}
                                >
                                    {'Сбросить'}
                                </Typography.Link>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button
                                    key="submit"
                                    type="schoolDefault"
                                    htmlType="submit"
                                    loading={isLoading}
                                    block
                                    data-cy="signin-button"
                                    onClick={() => loginHandler(phone, password, login)}
                                >
                                    Войти
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </ResponsiveCol>
            </Row>
        </Form>
    )
}
