import React from 'react'
import { CirclesMain } from '../domains/circles/components/main/CirclesMain'
import { RegistrationForm } from '../domains/user/components/registrationForm/registrationForm'
import { LoginFrom } from '../domains/user/components/loginForm/loginFrom'

const Home: React.FC = () => {
    return (
        <div>
            <CirclesMain/>
            <RegistrationForm/>
            <LoginFrom/>
        </div>
    )
}

export default Home
