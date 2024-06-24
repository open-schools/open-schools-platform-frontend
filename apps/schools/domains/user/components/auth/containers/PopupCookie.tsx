import React, { useCallback, useEffect, useState } from 'react'
import styles from '@domains/user/components/auth/containers/styles/styles.module.scss'
import Image from 'next/image'
import arrowBottom from '@public/icons/arrowBottom.svg'
import arrowTop from '@public/icons/arrowTop.svg'
import { Button } from '@domains/common/components/button'
import { Typography } from 'antd'
import Cookie from 'universal-cookie'
import { COOKIE_AGREEMENT_KEY } from '@domains/user/components/auth/constants/variables'
import { oneYearExpiresDate } from '@domains/common/constants/Cookies'

export const PopupCookie = () => {
    const cookies = new Cookie()

    const [isShown, setIsShown] = useState(true)
    const [cookiesNotAccepted, setCookiesNotAccepted] = useState(true)

    const acceptCookieAgreement = useCallback(() => {
        cookies.set(COOKIE_AGREEMENT_KEY, 'true', { expires: oneYearExpiresDate })
        setCookiesNotAccepted(false)
        setIsShown(false)
    }, [])

    useEffect(() => {
        const cookieValue = cookies.get(COOKIE_AGREEMENT_KEY)
        if (cookieValue) {
            setCookiesNotAccepted(false)
            setIsShown(false)
        }
    }, [])

    if (!cookiesNotAccepted) {
        return null
    }

    return (
        <div>
            <div className={styles.containerCookie}>
                <Typography.Title level={5} className={styles.titleCookie}>
                    Мы используем файлы Cookie.
                </Typography.Title>
                <div className={styles.showBlockContainer} onClick={() => setIsShown((prevState) => !prevState)}>
                    <Typography.Text strong className={styles.showButton}>
                        {isShown ? 'Скрыть' : 'Подробнее'}
                    </Typography.Text>
                    <div className={styles.arrowContainer}>
                        <Image src={isShown ? arrowTop : arrowBottom} alt={'Shown arrow'} />
                    </div>
                </div>
                <div className={styles.containerText}>
                    {isShown && (
                        <Typography.Text strong className={styles.cookieText}>
                            Наш сайт использует файлы cookie, чтобы улучшить работу сайта, повысить его эффективность и
                            удобство. Продолжая использовать этот сайт, вы даете согласие на обработку файлов cookie.
                        </Typography.Text>
                    )}
                    <Button onClick={() => acceptCookieAgreement()} className={styles.successButton}>
                        Принимаю
                    </Button>
                </div>
            </div>
        </div>
    )
}
