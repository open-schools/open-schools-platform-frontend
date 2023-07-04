import { Form, Input } from 'antd'
import { Button } from '../../../common/components'
import React, { useState } from 'react'
import { useTokenMutation, useUsersMutation, useVerifyMutation } from '../../redux/RegistrationApi'

export const RegistrationForm = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [recaptcha, setRecaptcha] = useState('')

    // Here are examples of using multiple queries on the same page at once
    const [registration, { error: tokenError, isLoading: isTokenLoading }] = useTokenMutation()
    const [verifyCode, { error: verifyError, isLoading: isVerifyLoading }] = useVerifyMutation()
    const [userRegistration, { error: userRegistrationError, isLoading: isUserRegistrationLoading }] = useUsersMutation()

    async function tokenHandler () {
        let response = await registration({ phone: '+79041712388', recaptcha: recaptcha })
        if ('data' in response) {
            localStorage.setItem('token', response.data.token)
        } else {
            console.error('Error occurred:', response.error)
        }
    }

    async function otpHandler () {
        let token = localStorage.getItem('token')
        if (token) {
            await verifyCode({ otp: code, token: token })
        }
    }

    async function registrationHandler () {
        let token = localStorage.getItem('token')
        if (token) {
            await userRegistration({ token: token, name: phone, password: password })
        }
    }

    return (
        <Form>
            <div style={{ marginLeft: '10px', marginTop: '100px' }}>Reg</div>
            <Input style={{ margin: '10px' }} onChange={(value) => setPhone(value.target.value)} placeholder={'phone'}/>
            <Input style={{ margin: '10px' }} onChange={(value) => setRecaptcha(value.target.value)} placeholder={'capcha'}/>
            <Button style={{ margin: '10px' }} onClick={tokenHandler}/>
            <Input style={{ margin: '10px' }} onChange={(value) => setCode(value.target.value)} placeholder={'code'}/>
            <Button style={{ margin: '10px' }} onClick={otpHandler}/>
            <Input style={{ margin: '10px' }} onChange={(value) => setPassword(value.target.value)} placeholder={'password'}/>
            <Button style={{ margin: '10px' }} onClick={registrationHandler}/>
        </Form>
    )
}