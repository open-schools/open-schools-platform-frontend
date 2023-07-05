import React from 'react'

import { Anchor } from '../domains/common/components/Anchor'
import { Input } from '../domains/common/components/Input'
import { Link } from '../domains/common/components/Link'
import { Button } from '../domains/common/components'
import { CustomImage } from '../domains/common/components/Image'
import { SignInForm } from '../domains/user/components/auth/SignInForm';
import {Col, Row} from "antd";

const Home: React.FC = () => {
    return (
        <div>
            {/*<CustomImage src={'/image/authImage.svg'} type={'fullScreen'} preview={false}/>*/}
            <Row justify='center'>
                {/*<Anchor />*/}
                {/*<Input type={'inputPhone'} label={'Телефон'}/>*/}
                {/*<Input type={'inputPassword'} placeholder={'Пароль'} label={'Пароль'}/>*/}
                {/*<Link text={'Забыли пароль? Сбросить'}/>*/}
                {/*<Button text={'Войти'}/>*/}
                <Col>
                    <SignInForm/>
                </Col>
            </Row>
        </div>
    )
}

Home.container = AuthLayout
export default Home
