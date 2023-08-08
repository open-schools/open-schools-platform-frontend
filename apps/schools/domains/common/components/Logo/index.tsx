import Image from 'next/image'
import React from 'react'
import styles from './styles/styles.module.scss'
import logo from '@public/icons/logo.svg'
import { LogoProps } from './interfaces'

export const CustomLogo: React.FC<LogoProps> = (props) => {
    const { onClick, minified, width } = props

    if (minified) {
        return (
            <div onClick={onClick}>
                <Image src={logo} alt={'Логотип'} width={width ?? 50}></Image>
            </div>
        )
    }

    return (
        <div onClick={onClick} className={styles.logoText}>
            Открытые школы
        </div>
    )
}
