import {Col, Form, Row, RowProps, Typography} from 'antd'
import {ResponsiveCol} from 'domains/user/containers/ResponsiveCol';
import getConfig from 'next/config'
import Router, {useRouter} from 'next/router'
import React, {useCallback, useMemo, useState} from 'react'
import {isSafeUrl} from "../../../common/utils/url.utils";
import PhoneInput from "react-phone-input-2";
import {Input} from "../../../common/components/Input";


const ROW_STYLES: React.CSSProperties = {
    justifyContent: 'center',
}
const FORM_TYPOGRAPHY_STYLES: React.CSSProperties = {
    textAlign: 'center',
}
const FORM_PARAGRAPH_STYLES: React.CSSProperties = {
    margin: '24px 0 40px',
}
// const FORM_PHONE_STYLES: React.CSSProperties = { borderRadius: 8, borderColor: colors.inputBorderGrey }
const FORM_BUTTONS_GUTTER: RowProps['gutter'] = [0, 20]

export const SignInForm = (): React.ReactElement => {
    const LOGIN_PHONE_LABEL = <label style={{alignSelf: 'flex-end'}}>Телефон</label>
    const PASSWORD_LABEL = <label style={{alignSelf: 'flex-end'}}>Пароль</label>

    const {publicRuntimeConfig: {hasSbbolAuth}} = getConfig()

    const [form] = Form.useForm()
    const router = useRouter()
    const {query: {next}} = router
    const redirectUrl = (next && !Array.isArray(next) && isSafeUrl(next)) ? next : '/'
    // const { refetch } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    // const [signinByPhoneAndPassword] = useMutation(SIGNIN_BY_PHONE_AND_PASSWORD_MUTATION)

    // const onFormSubmit = useCallback((values) => {
    //     setIsLoading(true)
    //
    //     return runMutation({
    //         mutation: signinByPhoneAndPassword,
    //         variables: values,
    //         onCompleted: () => {
    //             refetch().then(() => {
    //                 return router.push(redirectUrl)
    //             })
    //         },
    //         // Skip notification
    //         OnCompletedMsg: null,
    //         onFinally: () => {
    //             setIsLoading(false)
    //         },
    //         intl,
    //         form,
    //         ErrorToFormFieldMsgMapping,
    //     }).catch(() => {
    //         setIsLoading(false)
    //     })
    // }, [intl, form])

    const initialValues = {password: '', phone: ''}

    return (
        // <Form
        //     form={form}
        //     name='signin'
        //     // onFinish={onFormSubmit}
        //     initialValues={initialValues}
        //     requiredMark={false}
        //     layout='vertical'
        // >
        //     <Row style={ROW_STYLES}>
        //         <ResponsiveCol span={24}>
        //             <Row>
        //                 <Col span={24}>
        //                     <Form.Item
        //                         name='phone'
        //                         label={LOGIN_PHONE_LABEL}
        //                         rules={[{ required: true, message: FieldIsRequiredMsg }]}
        //                         data-cy='signin-phone-item'
        //                     >
        //                         <PhoneInput
        //                             style={FORM_PHONE_STYLES}
        //                             placeholder={ExamplePhoneMsg}
        //                             tabIndex={1}
        //                             block
        //                         />
        //                     </Form.Item>
        //                 </Col>
        //                 <Col span={24}>
        //                     <Form.Item
        //                         name='password'
        //                         label={PASSWORD_LABEL}
        //                         rules={[{ required: true, message: FieldIsRequiredMsg }]}
        //                         data-cy='signin-password-item'
        //                     >
        //                         <Input.Password tabIndex={2}/>
        //                     </Form.Item>
        //                 </Col>
        //                 <Col span={24}>
        //                     <Typography.Paragraph type='secondary' style={FORM_PARAGRAPH_STYLES}>
        //                         <FormattedMessage
        //                             id='pages.auth.signin.ResetPasswordLink'
        //                             values={{
        //                                 link: (
        //                                     <Typography.Link
        //                                         style={{ color: colors.black }}
        //                                         onClick={() => Router.push('/auth/forgot')}>
        //                                         {ResetMsg}
        //                                     </Typography.Link>
        //                                 ),
        //                             }}
        //                         />
        //                     </Typography.Paragraph>
        //                 </Col>
        //             </Row>
        //             <Row gutter={FORM_BUTTONS_GUTTER}>
        //                 <Col span={24}>
        //                     <Form.Item>
        //                         <Button
        //                             key='submit'
        //                             type='sberDefaultGradient'
        //                             htmlType='submit'
        //                             loading={isLoading}
        //                             block
        //                             data-cy='signin-button'
        //                         >
        //                             {SignInMsg}
        //                         </Button>
        //                     </Form.Item>
        //                 </Col>
        //                 {(hasSbbolAuth) ?
        //                     <>
        //                         <Col span={24} style={FORM_TYPOGRAPHY_STYLES}>
        //                             <FormattedMessage id='Or'/>
        //                         </Col>
        //                         <Col span={24}>
        //                             <Form.Item>
        //                                 <LoginWithSBBOLButton block/>
        //                             </Form.Item>
        //                         </Col>
        //                     </>
        //                     : null
        //                 }
        //             </Row>
        //         </ResponsiveCol>
        //     </Row>
        // </Form>
        <Form
            form={form}
            name='signin'
            // onFinish={onFormSubmit}
            initialValues={initialValues}
            requiredMark={false}
            layout='vertical'
        >
            <Row style={ROW_STYLES}>
                <ResponsiveCol span={24}>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name='phone'
                                // label={LOGIN_PHONE_LABEL}
                                // rules={[{required: true, message: FieldIsRequiredMsg}]}
                                data-cy='signin-phone-item'
                            >
                                {/*<PhoneInput*/}
                                {/*    style={FORM_PHONE_STYLES}*/}
                                {/*    placeholder={ExamplePhoneMsg}*/}
                                {/*    tabIndex={1}*/}
                                {/*    block*/}
                                {/*/>*/}
                                <Input type={'inputPhone'} label={'Телефон'}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </ResponsiveCol>
            </Row>
        </Form>
    )
}
