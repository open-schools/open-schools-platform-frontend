import React from 'react'
import styles from './styles/styles.module.scss'
import classNames from 'classnames'
import { EmptyWrapperProps } from './interfaces'
import Image from 'next/image'
import duckEmptyPage from '@public/image/duckEmptyPage.svg'
import { Typography } from 'antd'
import { Button } from '@domains/common/components/button'

const EmptyWrapper: React.FC<EmptyWrapperProps> = ({
    isLoading,
    data,
    searchTrigger,
    pageTitle,
    titleText,
    descriptionText,
    buttonText,
    handleRunTask,
    className,
    children,
}) => {
    if (!searchTrigger && !isLoading && (!data || data.count === 0)) {
        return (
            <div className={classNames(styles.container, className)}>
                <Typography.Title level={1}>{pageTitle}</Typography.Title>
                <div className={styles.duckContainer}>
                    <Image src={duckEmptyPage} alt={'Duck with a magnifying glass'} />
                    <div className={styles.textContainer}>
                        <Typography.Title className={styles.titleText} level={4}>
                            {titleText}
                        </Typography.Title>
                        <span className={styles.descriptionText}>{descriptionText}</span>
                        <Button className={styles.button} onClick={handleRunTask}>
                            {buttonText}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return <div className={styles.container}>{children}</div>
}

export default EmptyWrapper
