import React, { useCallback, useState } from 'react'
import styles from '@domains/user/components/auth/containers/styles/styles.module.scss'
import Image from 'next/image'
import arrowBottom from '@public/icons/arrowBottom.svg'
import arrowTop from '@public/icons/arrowTop.svg'
import { Button } from '@domains/common/components/button'
import { Typography } from 'antd'
import cookie from 'js-cookie'

const COOKIE_AGREEMENT_KEY = 'cookieAgreementAccepted'

export const Cookies = () => {
    const [isShown, setIsShown] = useState(false)
    const [cookiesNotAccepted, setCookiesNotAccepted] = useState(cookie.get(COOKIE_AGREEMENT_KEY) || false)

    const acceptCookieAgreement = useCallback(() => {
        cookie.set(COOKIE_AGREEMENT_KEY, 'true')
        setCookiesNotAccepted(true)
    }, [])

    if (cookiesNotAccepted) {
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
                        {isShown ? 'Подробнее' : 'Скрыть'}
                    </Typography.Text>
                    <div className={styles.arrowContainer}>
                        <Image src={isShown ? arrowBottom : arrowTop} alt={'Shown arrow'} />
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
