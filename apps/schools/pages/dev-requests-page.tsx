import React, { useState } from 'react'
import {
    useLogoutMutation,
    useUpdatePasswordMutation,
    useUpdateUserMutation,
} from '../domains/user/redux/authenticationApi'
import { message } from 'antd'
import { Button } from '../domains/common/components/button'
import { Input } from '../domains/common/components/input'

export async function logoutHandler (logout: any) {
    let response = await logout()
    if (!('error' in response)) {
        message.success('Вы вышли из аккаунта')
        console.log('logoutHandler' + response)
    } else {
        message.error('Error logoutHandler')
    }
}

export async function updateUserHandler (userName: string, updateUser: any) {
    let response = await updateUser({ name: userName })
    if (!('error' in response)) {
        message.success('Вы успешно сменили имя')
        console.log('updateUserHandler' + response)
    } else {
        message.error('Error updateUserHandler')
    }
}

export async function updatePasswordHandler (oldPassword: string, newPassword: string, updatePassword: any) {
    let response = await updatePassword({ old_password: oldPassword, new_password: newPassword })
    if (!('error' in response)) {
        message.success('Вы успешно сменили пароль')
        console.log('updatePasswordHandler' + response)
    } else {
        message.error('Error updatePasswordHandler')
    }
}

const DevRequestsPage = () => {
    const [logout] = useLogoutMutation()
    const [updateUser] = useUpdateUserMutation()
    const [userName, setUserName] = useState('')
    const [updatePassword] = useUpdatePasswordMutation()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')


    return (
        <>
            <div style={{ marginTop: '100px', marginBottom: '10px' }}>
                /user-management/auth/jwt/logout
            </div>
            <Button onClick={() => logoutHandler(logout)}>
                Logout
            </Button>

            <div style={{ marginTop: '100px', marginBottom: '10px' }}>
                /user-management/auth/me PATCH
            </div>
            <Input onChange={(event) => setUserName(event.target.value)}/>
            <Button onClick={() => updateUserHandler(userName, updateUser)}>
                Дмитрий Красноголовый
            </Button>

            <div style={{ marginTop: '100px', marginBottom: '10px' }}>
                /user-management/auth/me PATCH
            </div>
            <Input placeholder={'Старый пароль'} onChange={(event) => setOldPassword(event.target.value)}/>
            <Input placeholder={'Новый пароль'} onChange={(event) => setNewPassword(event.target.value)}/>
            <Button onClick={() => updatePasswordHandler(oldPassword, newPassword, updatePassword)}>
                Сменить пароль
            </Button>
        </>
    )
}

export default DevRequestsPage
