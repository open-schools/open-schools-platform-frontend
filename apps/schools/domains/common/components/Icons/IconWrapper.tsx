import React from 'react'
import {
    LARGE_ICON_SIZE,
    MEDIUM_ICON_SIZE,
    SMALL_ICON_SIZE,
} from '../../constants/Icon'
import { IconSize, IconWrapperProps } from './interfaces'

const getIconSize = (size: IconSize) => {
    switch (size) {
        case 'auto':
            return '1em'
        case 'medium':
            return MEDIUM_ICON_SIZE
        case 'small':
            return SMALL_ICON_SIZE
        default:
            return LARGE_ICON_SIZE
    }
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
    icon,
    size = 'large',
    color = 'currentcolor',
    className,
    id,
    onClick,
}) => {
    const iconSize = getIconSize(size)

    return (
        <span
            role="img"
            color={color}
            aria-hidden={true}
            style={{
                display: 'inline-flex',
                fontSize: 'inherit',
                width: iconSize,
                height: iconSize,
            }}
            className={className}
            id={id}
            onClick={onClick}
        >
            {icon}
        </span>
    )
}
