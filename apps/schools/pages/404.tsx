import React, { useEffect, useState } from 'react'
import EmptyLayout from '@domains/common/components/containers/ErrorLayout'

import Head from 'next/head'
import { SharedErrorPage } from '@domains/common/components/errors'
import router from 'next/router'
import ducks from '@public/image/404Ducks.svg'

export default function Custom404() {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        setWidth(window.screen.width * 0.6)
    }, [])


    return (
        <>
            <Head>
                <title>404: Не найдено</title>
            </Head>
            <SharedErrorPage
                titleText={'Страница не найдена'}
                descriptionText={'К сожалению, страница не нашлась. Вернитесь на главную и попробуйте еще раз'}
                buttonText={'Вернуться на главную'}
                image={ducks}
                imageWidth={width}
                handleRunTask={() => {
                    router.push('/')
                }}
            />
        </>
    )
}

Custom404.container = EmptyLayout
Custom404.isError = true
