import React, { useEffect, useRef } from 'react'
import { Button, Typography } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import { App } from '../../redux/interfaces'
import { useGenerateAuthCodeMutation } from '../../redux/marketplaceApi'
import styles from './styles/styles.module.scss'

const { Title } = Typography

interface AppIframeProps {
    app: App
}

export const AppIframe: React.FC<AppIframeProps> = ({ app }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [generateAuthCode] = useGenerateAuthCodeMutation()

    const entry = app.app_url || app.latest_published_release?.manifest?.entry || app.latest_release?.manifest?.entry

    useEffect(() => {
        const handleMessage = async (event: MessageEvent) => {
            // Check if message is related to auth flow
            if (event.data?.type === 'GET_AUTH_CODE') {
                    const { code_challenge, code_challenge_method } = event.data

                    try {
                        const response = await generateAuthCode({
                            client_id: app.client_id,
                            code_challenge,
                            code_challenge_method: code_challenge_method || 'S256',
                        }).unwrap()

                        iframeRef.current?.contentWindow?.postMessage(
                            {
                                type: 'AUTH_CODE',
                                code: response.code,
                            },
                            '*'
                        )
                    } catch (error) {
                        console.error('Failed to generate auth code:', error)
                        iframeRef.current?.contentWindow?.postMessage(
                            {
                                type: 'AUTH_CODE_ERROR',
                                error: 'Failed to generate code',
                            },
                            '*'
                        )
                    }
            }
        }

        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [app.client_id, generateAuthCode])

    if (!entry) return null

    return (
        <div className={styles.iframeContainer}>
            <div className={styles.iframeHeader}>
                <Title level={5} className={styles.iframeTitle}>
                    {app.name}
                </Title>
                <Button
                    type="text"
                    icon={<ExportOutlined />}
                    onClick={() => window.open(entry, '_blank')}
                    title="Открыть в новой вкладке"
                />
            </div>
            <iframe
                ref={iframeRef}
                src={entry}
                className={styles.iframe}
                allow="camera; microphone; geolocation; fullscreen"
            />
        </div>
    )
}
