import { Row } from 'antd'
import React from 'react'
import styles from './styles/styles.module.scss'
import Link from 'next/link'

import { AuthBackground } from '../authBackground'
import getConfig from 'next/config'
import { CustomLogo } from '@domains/common/components/Logo'
import { PopupCookie } from '@domains/user/components/auth/containers/PopupCookie'

export interface IAuthLayoutProps {
    headerAction: React.ReactElement
    children: JSX.Element
}

const {
    publicRuntimeConfig: {
        HelpRequisites: { support_email: SUPPORT_EMAIL, support_phone: SUPPORT_PHONE },
    },
} = getConfig()

const AuthLayout: React.FC<IAuthLayoutProps> = (props) => {
    const { children, ...otherProps } = props
    return (
        <div className={styles.container}>
            <AuthBackground />
            <Link className={styles.logoContainer} href={''}>
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
            <PopupCookie />
        </div>
    )
}

export default AuthLayout
