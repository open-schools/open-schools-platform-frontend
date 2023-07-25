import { Row } from 'antd'
import React from 'react'
import styles from './styles/styles.module.scss'
import Link from 'next/link'

import { AuthBackground } from '../authBackground'
import getConfig from 'next/config'
import {Logo} from "../../../../common/components/Logo";

export interface IAuthLayoutProps {
    headerAction: React.ReactElement,
    children: JSX.Element,
}

const {
    publicRuntimeConfig: {
        HelpRequisites: {
            support_email: SUPPORT_EMAIL,
            support_phone: SUPPORT_PHONE,
        },
    },
} = getConfig()

const AuthLayout: React.FC<IAuthLayoutProps> = (props) => {
    const { children, ...otherProps } = props
    return (
        <div
            className={styles.container}
        >
            <AuthBackground/>
            <Link className={styles.logoContainer} href={''}>
                <Row className={styles.rowWithGap}>
                    <Logo/>
                    <div className={styles.logoText}>
                        Открытые<br/>
                        школы
                    </div>
                </Row>
            </Link>
            {children}
            <Link className={styles.emailContainer} href={`mailto:${SUPPORT_EMAIL}`}>
                <div className={styles.emailText}>
                    {SUPPORT_EMAIL}
                </div>
            </Link>
        </div>
    )
}

export default AuthLayout
