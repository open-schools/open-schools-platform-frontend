import React from 'react'
import styles from './styles/styles.module.scss'
import { ErrorPageProps } from './interfaces'
import Image from 'next/image'
import { Typography } from 'antd'
import { Button } from '@domains/common/components/button'

export const SharedErrorPage: React.FC<ErrorPageProps> = ({
    titleText,
    descriptionText,
    buttonText,
    handleRunTask,
    image,
    imageWidth,
    imageAlt,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.duckContainer}>
                {image && <Image src={image} alt={imageAlt ?? ''} width={imageWidth} />}
                <div className={styles.textContainer}>
                    <Typography.Title className={styles.titleText} level={4}>
                        {titleText}
                    </Typography.Title>
                    <span className={styles.descriptionText}>{descriptionText}</span>
                    {buttonText && (
                        <Button className={styles.button} onClick={handleRunTask}>
                            {buttonText}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
