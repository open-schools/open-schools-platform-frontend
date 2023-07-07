import {Col, Form, Row, RowProps, Typography} from 'antd'
import React, {PropsWithChildren, useCallback, useState} from 'react'

import styles from "../styles/formStyles.module.scss";
import {ResponsiveCol} from "../../containers/ResponsiveCol";
import {Input} from "../../../../common/components/Input";
import {Button} from "../../../../common/components";


interface IResetFormProps {
    onFinish: (userId: string) => void
}

const BUTTON_FORM_GUTTER: RowProps['gutter'] = [0, 40]

const RequiredFlagWrapper: React.FC<PropsWithChildren<any>> = (props) => {
    return (
        <div className={styles.requiredField}>
            {props.children}
        </div>
    )
}

import { useResetFormValidators } from './hooks'

export const ResetForm: React.FC<IResetFormProps> = ({onFinish}) => {
    const validators = useResetFormValidators()

    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const {phone, token} = /*useContext(ResetContext)*/{phone: "+7999998899", token: "329180382190"}
    const {signInByPhone} = /*useContext(AuthLayoutContext)*/{
        signInByPhone: () => {
        }
    };

    const resetComplete = useCallback(async () => {
        // const resetExtraData = {
        //     dv: 1,
        //     sender: getClientSideSenderInfo(),
        // }
        // const {name, email: inputEmail, password} = form.getFieldsValue(['name', 'email', 'password'])
        //
        // const email = inputEmail ? inputEmail.toLowerCase().trim() : ''
        // const data = {name, email, password, ...resetExtraData, confirmPhoneActionToken: token}
        // setIsLoading(true)

        // return runMutation({
        //     mutation: resetMutation,
        //     variables: { data },
        //     onCompleted: ({ data }) => {
        //         signInByPhone(form.getFieldsValue(['phone', 'password']), () => {
        //             const userId = get(data, ['user', 'id'])
        //
        //             onFinish(userId)
        //         })
        //     },
        //     // Skip notification
        //     OnCompletedMsg: null,
        //     intl,
        //     form,
        // }).catch(() => {
        //     setIsLoading(false)
        // })
    }, [form, signInByPhone, token])

    const initialValues = {phone}

    return (
        <Form
            form={form}
            name='reset'
            onFinish={resetComplete}
            initialValues={initialValues}
            colon={false}
            requiredMark={true}
            layout='vertical'
            validateTrigger={['onBlur', 'onSubmit']}
        >
            <Row gutter={BUTTON_FORM_GUTTER} className={styles.rowStyles}>
                <ResponsiveCol span={24}>
                    <Row>
                        <Col span={24}>
                            <Typography.Title level={2}>Восстановление пароля</Typography.Title>
                        </Col>
                        <Col span={24}>
                            <RequiredFlagWrapper>
                                <Form.Item
                                    name='password'
                                    label={"Придумайте новый пароль"}
                                    rules={validators.password}
                                    data-cy='reset-password-item'
                                    validateFirst
                                >
                                    <Input type={"inputPassword"} placeholder={"Пароль"}/>
                                </Form.Item>
                            </RequiredFlagWrapper>
                        </Col>
                        <Col span={24}>
                            <RequiredFlagWrapper>
                                <Form.Item
                                    name='confirm'
                                    label={"Повторите пароль"}
                                    dependencies={['password']}
                                    rules={validators.confirm}
                                    data-cy='reset-confirmpassword-item'
                                    validateFirst
                                >
                                    <Input type={"inputPassword"} placeholder={"Пароль"}/>
                                </Form.Item>
                            </RequiredFlagWrapper>
                        </Col>
                    </Row>
                </ResponsiveCol>
                <ResponsiveCol span={24}>
                    <Form.Item>
                        <Button
                            key='submit'
                            type='schoolDefault'
                            htmlType='submit'
                            loading={isLoading}
                            block
                            data-cy='resetcomplete-button'
                        >
                            Сохранить и войти
                        </Button>
                    </Form.Item>
                </ResponsiveCol>
            </Row>
        </Form>
    )
}
