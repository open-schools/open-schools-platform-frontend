import React from 'react'
import styles from './styles/styles.module.scss'
import Link from 'next/link'
import { Row } from 'antd'
import { CustomLogo } from '@domains/common/components/Logo'
import getConfig from 'next/config'

const {
    publicRuntimeConfig: {
        HelpRequisites: { support_email: SUPPORT_EMAIL, support_phone: SUPPORT_PHONE },
    },
} = getConfig()

export const EmptyLayout: React.FC<any> = (props) => {
    const { children } = props

    return (
        <div className={styles.container}>
            <Link className={styles.logoContainer} href={'/'}>
                <Row className={styles.rowWithGap}>
                    <CustomLogo minified={true} />
                    <div className={styles.logoText}>
                        Открытые
                        <br />
                        школы
                    </div>
                </Row>
            </Link>
            {children}
            <Row className={styles.emailContainer}>
                <a href={`mailto:${SUPPORT_EMAIL}`}>
                    <div className={styles.emailText}>{SUPPORT_EMAIL}</div>
                </a>
            </Row>
        </div>
    )
}

export default EmptyLayout
