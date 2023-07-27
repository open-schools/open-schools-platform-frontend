import { Col, Form, Row, Typography } from 'antd'
import { ResponsiveCol } from 'domains/user/components/auth/containers/ResponsiveCol'
import Router, { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Input } from '../../../../common/components/input'
import styles from '../styles/formStyles.module.scss'
import { Button } from '../../../../common/components/button'
import { loginHandler } from '../../../handlers/auth/signin'
import { useLoginMutation } from '../../../redux/authenticationApi'
import { useSignInFormValidators } from './hooks'

export const SignInForm = (): React.ReactElement => {
    const validators = useSignInFormValidators()
    
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const [login] = useLoginMutation()

    const [form] = Form.useForm()
    const router = useRouter()
    const {
        query: { next },
    } = router
    const [isLoading, setIsLoading] = useState(false)

    const initialValues = { password: '', phone: '' }

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
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="phone"
                                label={'Телефон'}
                                rules={validators.phone}
                                data-cy="signin-phone-item"
                            >
                                <Input
                                    onChange={(value: any) => setPhone(value.target.value)}
                                    customType={'inputPhone'}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="password"
                                label={'Пароль'}
                                rules={validators.password}
                                data-cy="signin-password-item"
                            >
                                <Input
                                    onChange={(value: any) => setPassword(value.target.value)}
                                    customType={'inputPassword'}
                                    type={'password'}
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
                                    onClick={() => loginHandler(phone, password, login, form)}
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
