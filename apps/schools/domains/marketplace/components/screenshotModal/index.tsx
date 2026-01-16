import React from 'react'
import { Modal, Image } from 'antd'

interface ScreenshotModalProps {
    screenshot: string | null
    onClose: () => void
}

export const ScreenshotModal: React.FC<ScreenshotModalProps> = ({ screenshot, onClose }) => {
    return (
        <Modal open={!!screenshot} footer={null} onCancel={onClose} width='90%' style={{ top: 20 }}>
            {screenshot && <Image src={screenshot} alt='Скриншот' style={{ width: '100%' }} />}
        </Modal>
    )
}

