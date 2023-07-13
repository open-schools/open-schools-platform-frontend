import React from 'react'
import styles from './styles/styles.module.scss'

export interface IAuthLayoutProps {
    headerAction: React.ReactElement,
    children: JSX.Element,
}

const AuthLayout: React.FC<IAuthLayoutProps> = (props) => {
    const { children, ...otherProps } = props

    return (
        <div
            className={styles.container}
        >
            {children}
        </div>
    )
}

export default AuthLayout
