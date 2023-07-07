import {Col, Form, Row, RowProps} from 'antd'
import React, {PropsWithChildren, useCallback, useState} from 'react'

import styles from "../styles/formStyles.module.scss";
import {ResponsiveCol} from "../../containers/ResponsiveCol";
import {Input} from "../../../../common/components/Input";
import {Button} from "../../../../common/components";


interface IRegisterFormProps {
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

import { useRegisterFormValidators } from './hooks'

export const RegisterForm: React.FC<IRegisterFormProps> = ({onFinish}) => {
    const validators = useRegisterFormValidators()

    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const {phone, token} = /*useContext(RegisterContext)*/{phone: "+7999998899", token: "329180382190"}
    const {signInByPhone} = /*useContext(AuthLayoutContext)*/{
        signInByPhone: () => {
        }
    };

    const registerComplete = useCallback(async () => {
        // const registerExtraData = {
        //     dv: 1,
        //     sender: getClientSideSenderInfo(),
        // }
        // const {name, email: inputEmail, password} = form.getFieldsValue(['name', 'email', 'password'])
        //
        // const email = inputEmail ? inputEmail.toLowerCase().trim() : ''
        // const data = {name, email, password, ...registerExtraData, confirmPhoneActionToken: token}
        // setIsLoading(true)

        // return runMutation({
        //     mutation: registerMutation,
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
            name='register'
            onFinish={registerComplete}
            initialValues={initialValues}
            colon={false}
            requiredMark={true}
            layout='vertical'
            validateTrigger={['onBlur', 'onSubmit']}
        >
            <Row gutter={BUTTON_FORM_GUTTER} className={styles.rowStyles}>
                <ResponsiveCol span={24}>
                    <Row>
                        {/*<Col span={24}>*/}
                        {/*    <DefaultTypography.Title level={2}>Регистрация</DefaultTypography.Title>*/}
                        {/*</Col>*/}
                        <Col span={24}>
                            <RequiredFlagWrapper>
                                <Form.Item
                                    name='phone'
                                    label={"Телефон"}
                                    rules={validators.phone}
                                    validateFirst
                                >
                                    <Input type={'inputPhone'} disabled={true}/>
                                </Form.Item>
                            </RequiredFlagWrapper>
                        </Col>
                        <Col span={24}>
                            <RequiredFlagWrapper>
                                <Form.Item
                                    name='name'
                                    label={"ФИО"}
                                    rules={validators.name}
                                    data-cy='register-name-item'
                                    validateFirst
                                >
                                    <RequiredFlagWrapper><Input placeholder={"Иванов Сергей Владимирович"}/></RequiredFlagWrapper>
                                </Form.Item>
                            </RequiredFlagWrapper>
                        </Col>
                        <Col span={24}>
                            <RequiredFlagWrapper>
                                <Form.Item
                                    name='email'
                                    label={"Эл. почта"}
                                    rules={validators.email}
                                    data-cy='register-email-item'
                                    validateFirst
                                >
                                    <Input autoComplete='chrome-off' placeholder={"email@example.com"}/>
                                </Form.Item>
                            </RequiredFlagWrapper>
                        </Col>
                        <Col span={24}>
                            <RequiredFlagWrapper>
                                <Form.Item
                                    name='password'
                                    label={"Придумайте пароль"}
                                    rules={validators.password}
                                    data-cy='register-password-item'
                                    validateFirst
                                >
                                    <Input type={"inputPassword"} autoComplete='new-password'/>
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
                                    data-cy='register-confirmpassword-item'
                                    validateFirst
                                >
                                    <Input type={"inputPassword"}/>
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
                            data-cy='registercomplete-button'
                        >
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </ResponsiveCol>
            </Row>
        </Form>
    )
}
