import ErrorPage from 'next/error'
import React from 'react'
import AuthLayout from "../domains/user/components/auth/containers/AuthLayout";

export default function Custom500() {
    return (
        <div>
            <ErrorPage statusCode={500}/>
        </div>
    )
}


Custom500.container = AuthLayout
Custom500.isError = true