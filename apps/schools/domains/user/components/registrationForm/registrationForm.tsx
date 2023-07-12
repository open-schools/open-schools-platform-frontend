import { Form, Input } from 'antd'
import { Button } from '../../../common/components'
import React, { useState } from 'react'
import { useTokenMutation, useUsersMutation, useVerifyMutation } from '../../redux/usersApi'
import { otpHandler, registrationHandler, tokenHandler } from '../../handlers/registrationForm'

export const RegistrationForm = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [recaptcha, setRecaptcha] = useState('')

    const [registration, { error: tokenError, isLoading: isTokenLoading }] = useTokenMutation()
    const [verifyCode, { error: verifyError, isLoading: isVerifyLoading }] = useVerifyMutation()
    const [userRegistration, { error: userRegistrationError, isLoading: isUserRegistrationLoading }] = useUsersMutation()

    return (
        <Form>
            <div style={{ marginLeft: '10px', marginTop: '100px' }}>Reg</div>
            <Input style={{ margin: '10px' }} onChange={(value) => setPhone(value.target.value)} placeholder={'phone'}/>
            <Input style={{ margin: '10px' }} onChange={(value) => setRecaptcha(value.target.value)} placeholder={'capcha'}/>
            <Button style={{ margin: '10px' }} onClick={() => tokenHandler(phone, recaptcha, registration)} />
            <Input style={{ margin: '10px' }} onChange={(value) => setCode(value.target.value)} placeholder={'code'}/>
            <Button style={{ margin: '10px' }} onClick={() => otpHandler(code, verifyCode)} />
            <Input style={{ margin: '10px' }} onChange={(value) => setPassword(value.target.value)} placeholder={'password'} type={'password'}/>
            <Button style={{ margin: '10px' }} onClick={() => registrationHandler(phone, password, userRegistration)} />
        </Form>
    )
}
