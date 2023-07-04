import React from 'react'
import { CirclesMain } from '../domains/circles/components/main/CirclesMain'
import { RegistrationForm } from '../domains/user/components/main/RegistrationForm'

const Home: React.FC = () => {
    return (
        <div>
            <CirclesMain/>
            <RegistrationForm/>
        </div>
    )
}

export default Home
