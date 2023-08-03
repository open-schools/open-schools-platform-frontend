import React from 'react'
import styles from './styles/styles.module.scss'

export const EmptyLayout: React.FC<any> = (props) => {
    const { children } = props

    return (
        <div className={styles.container} {...props}>
            {children}
        </div>
    )
}

export default EmptyLayout
