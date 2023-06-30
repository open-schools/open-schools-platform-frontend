import { useState } from 'react'
import axios from 'axios'
export default function Analytics () {
    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    const authorization =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const api = axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${authorization}`,
        },
    })

    // interface IASYNCLOGIN {
    //     router: NextRouter,
    //     phone: string,
    //     password: string
    // }


    const login = ({ phone, password }: any) => {
        return async () => {
            api.post('/user-management/auth/jwt/login/', {
                phone: phone, password: password,
            }).then(response => {
                const { token } = response.data
                localStorage.setItem('token', token)
            })
        }
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
                onChange={e => setPhone(e.target.value)}
                value={phone}
                type="phone"
                placeholder='Телефон'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <button onClick={login({ phone, password })}>
                Логин
            </button>
            <button>
                Регистрация
            </button>
        </div>
    )
}