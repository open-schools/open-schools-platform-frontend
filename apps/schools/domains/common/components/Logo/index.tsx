/** @jsx jsx */

import { jsx } from '@emotion/react'
import { Image } from 'antd'
import React from 'react'
import styles from './styles/styles.module.scss'
import logo from '@public/icons/logo.svg'

interface ILogoProps {
    onClick?: (e: React.SyntheticEvent) => void
    minified?: boolean
}

export const Logo: React.FC<ILogoProps> = (props) => {
    const {
        onClick,
        minified,
    } = props

    if (minified) {
        return (
            <div className={styles.logoWrapper} onClick={onClick}>
                <svg width='30' height='32' viewBox='0 0 30 32' fill='none' xmlns='http://www.w3.org/2000/svg' href={logo}/>
            </div>
        )
    }

    return (
        <div className={styles.logoWrapper} onClick={onClick}>
            <Image preview={false} src={logo}/>
        </div>
    )
}
