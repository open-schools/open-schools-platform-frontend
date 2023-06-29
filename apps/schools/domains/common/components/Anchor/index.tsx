import { Anchor as DefaultAnchor } from 'antd'
import React from 'react'

interface CustomAnchorProps {
    type?: 'anchorDefault',
    onClick?: () => void,
    text?: string,
}

const anchorItems = () => {
    return (
        <div>
            <a>Регистрация</a>
            <a>Вход</a>
        </div>
    )
}

export const Anchor: React.FC<CustomAnchorProps> = (props) => {
    const { type = 'anchorDefault', onClick } = props

    return (
        <DefaultAnchor prefixCls="horizontal"  children={[anchorItems(), anchorItems()]} onClick={onClick} data-testid="anchor" />
    )
}

