import React from 'react'

import { Anchor } from '../domains/common/components/Anchor'
import { Input } from '../domains/common/components/Input'
import { Link } from '../domains/common/components/Link'
import { Button } from '../domains/common/components'
import { Images } from '../domains/common/components/Image'

const Home: React.FC = () => {
    return (
        <div>
            <Anchor />
            <Input type={'inputPhone'} label={'Телефон'}/>
            <Input type={'inputPassword'} placeholder={'Пароль'} label={'Пароль'}/>
            <Link text={'Забыли пароль? Сбросить'}/>
            <Button text={'Войти'}/>
            <Images width={529} height={900}/>
        </div>
    )
}

export default Home
