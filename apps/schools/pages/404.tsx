import React, { useEffect, useState } from 'react'
import EmptyLayout from '@domains/common/components/containers/ErrorLayout'

import Head from 'next/head'
import { SharedErrorPage } from '@domains/common/components/errors'
import router from 'next/router'
import ducks from '@public/image/404Ducks.svg'
import { AppRoutes, RoutePath } from '@domains/common/constants/routerEnums'

const imageWidthPercent = 0.6

export default function Custom404() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
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
                imageWidth={windowSize.width * imageWidthPercent}
                handleRunTask={() => {
                    router.push(RoutePath[AppRoutes.MAIN])
                }}
            />
        </>
    )
}

Custom404.container = EmptyLayout
Custom404.isError = true
