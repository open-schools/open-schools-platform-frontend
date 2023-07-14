import { Row } from 'antd'
import React from 'react'
import styles from './styles/styles.module.scss'
import Link from 'next/link'
import logo from '@public/icons/logo.svg'
import Image from 'next/image'

export interface IAuthLayoutProps {
    headerAction: React.ReactElement,
    children: JSX.Element,
}

const AuthLayout: React.FC<IAuthLayoutProps> = (props) => {
    const { children, ...otherProps } = props

    return (
        <div
            className={styles.container}
            style={{ backgroundImage: 'url(/image/authImage.svg)' }}
        >
            {/*# TODO: add env for link there */}
            <Link className={styles.logoContainer} href={'https://openschools.education'}>
                <Row className={styles.rowWithGap}>
                    <Image src={logo} alt={'Логотип'} width={50}></Image>
                    <div className={styles.logoText}>
                        Открытые<br/>
                        школы
                    </div>
                </Row>
            </Link>
            {children}
            {/*# TODO: add env for email there */}
            <Link className={styles.emailContainer} href={'mailto:inbox@openschools.education'}>
                <div className={styles.emailText}>
                    inbox@openschools.education
                </div>
            </Link>
        </div>
    )
}

export default AuthLayout
