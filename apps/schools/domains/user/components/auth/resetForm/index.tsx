import { Col, Form, Row } from 'antd'
import React, { PropsWithChildren, useCallback, useState } from 'react'

import styles from '../styles/formStyles.module.scss'
import { ResponsiveCol } from '../containers/ResponsiveCol'
import { Input } from '../../../../common/components/input'
import { Button } from '../../../../common/components/button'
import { useResetFormValidators } from './hooks'
import { IResetFormProps } from './interfaces'
import { BUTTON_FORM_GUTTER_20 } from '../constants/styles'
import { resetHandler } from '../../../handlers/auth/forgot'
import { useResetPasswordMutation } from '../../../redux/userApi'

const RequiredFlagWrapper: React.FC<PropsWithChildren<any>> = (props) => {
    return <div className={styles.requiredField}>{props.children}</div>
}

export const ResetForm: React.FC<IResetFormProps> = ({ onFinish, onError }) => {
    const validators = useResetFormValidators()

    const [form] = Form.useForm()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [reset] = useResetPasswordMutation()
    const { signInByPhone } = /*useContext(AuthLayoutContext)*/ {
        signInByPhone: () => {},
    }

    const resetComplete = useCallback(async () => {
        const { password } = form.getFieldsValue(['password'])
        resetHandler(password, reset, onFinish, onError)
    }, [form, signInByPhone])

    return (
        <Form
            form={form}
            name="reset"
            onFinish={resetComplete}
            colon={false}
            requiredMark={true}
            layout="vertical"
            validateTrigger={['onBlur', 'onSubmit']}
        >
            <Row gutter={BUTTON_FORM_GUTTER_20} className={styles.rowStyles}>
                <ResponsiveCol span={24}>
                    <Row>
                        <Col span={24}>
                            <RequiredFlagWrapper>
                                <Form.Item
                                    name="password"
                                    label={'Придумайте новый пароль'}
                                    rules={validators.password}
                                    data-cy="reset-password-item"
                                    validateFirst
                                >
                                    <Input
                                        customType={'inputPassword'}
                                        type={'password'}
                                        placeholder={'Пароль'}
                                    />
                                </Form.Item>
                            </RequiredFlagWrapper>
                        </Col>
                        <Col span={24}>
                            <RequiredFlagWrapper>
                                <Form.Item
                                    name="confirm"
                                    label={'Повторите пароль'}
                                    dependencies={['password']}
                                    rules={validators.confirm}
                                    data-cy="reset-confirmpassword-item"
                                    validateFirst
                                >
                                    <Input
                                        customType={'inputPassword'}
                                        value={confirmPassword}
                                        type={'password'}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        placeholder={'Пароль'}
                                    />
                                </Form.Item>
                            </RequiredFlagWrapper>
                        </Col>
                    </Row>
                </ResponsiveCol>
                <ResponsiveCol span={24}>
                    <Form.Item>
                        <Button
                            key="submit"
                            type="schoolDefault"
                            htmlType="submit"
                            loading={isLoading}
                            block
                            data-cy="resetcomplete-button"
                        >
                            Сохранить и войти
                        </Button>
                    </Form.Item>
                </ResponsiveCol>
            </Row>
        </Form>
    )
}
