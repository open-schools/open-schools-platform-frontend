import ErrorPage from 'next/error'
import React from 'react'
import AuthLayout from "../domains/user/components/auth/containers/AuthLayout";

export default function Custom404() {
    return (
        <div>
            <ErrorPage statusCode={404}/>
        </div>
    )
}


Custom404.container = AuthLayout
Custom404.isError = true