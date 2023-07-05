import { Form, Input } from 'antd'
import React, { useState } from 'react'
import { useLoginMutation } from '../../redux/authenticationApi'
import { loginHandler } from '../../handlers/loginFormHandlers/handlers'
import { Button } from '../../../common/components'

export const LoginFrom = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const [login, { error, isLoading }] = useLoginMutation()

    return (
        <Form>
            <div style={{ marginLeft: '10px', marginTop: '100px' }}>Login</div>
            <Input style={{ margin: '10px' }} onChange={(value) => setPhone(value.target.value)} placeholder={'phone'}/>
            <Input style={{ margin: '10px' }} onChange={(value) => setPassword(value.target.value)} placeholder={'password'}/>
            <Button style={{ margin: '10px' }} onClick={() => loginHandler(phone, password, login)} />
        </Form>
    )
}