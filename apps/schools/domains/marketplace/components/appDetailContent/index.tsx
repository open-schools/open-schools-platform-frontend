import React from 'react'
import { Typography } from 'antd'
import { App } from '../../redux/interfaces'
import styles from '../appDetail/styles/styles.module.scss'

const { Title, Paragraph } = Typography

interface AppDetailContentProps {
    app: App
    onScreenshotClick: (screenshot: string) => void
}

export const AppDetailContent: React.FC<AppDetailContentProps> = ({ app, onScreenshotClick }) => {
    return (
        <div className={styles.mainContent}>
            <Title level={3} className={styles.sectionTitle}>
                Описание
            </Title>
            <Paragraph className={styles.description}>{app.description || 'Описание отсутствует'}</Paragraph>

            {app.screenshots && app.screenshots.length > 0 && (
                <>
                    <Title level={3} className={styles.sectionTitle} style={{ marginTop: 32 }}>
                        Скриншоты
                    </Title>
                    <div className={styles.screenshots}>
                        {app.screenshots.map((screenshot, index) => (
                            <img
                                key={index}
                                src={screenshot}
                                alt={`Скриншот ${index + 1}`}
                                className={styles.screenshot}
                                onClick={() => onScreenshotClick(screenshot)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

