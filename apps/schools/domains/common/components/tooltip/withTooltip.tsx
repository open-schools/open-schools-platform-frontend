import styles from './styles/styles.module.scss'

import { Row, RowProps, Tooltip } from 'antd'
import { QuestionCircleFilled } from '@ant-design/icons'
import React from 'react'
import {
    DEFAULT_ICON_SIZE,
    DEFAULT_MARGIN,
    DEFAULT_OVERLAY_INNER_COLOR,
    DEFAULT_OVERLAY_INNER_STYLE,
    ICON_SIZES,
} from '@domains/common/components/tooltip/styles/styles'

interface WithTooltipProps extends RowProps {
    children: React.ReactNode
    tooltipText: string
    iconSize?: 'small' | 'medium' | 'large'
    margin?: string
    overlayInnerStyle?: {}
    overlayInnerColor?: string
}

export const WithTooltip: React.FC<WithTooltipProps> = (params) => {
    const {
        children,
        tooltipText,
        iconSize = DEFAULT_ICON_SIZE,
        margin = DEFAULT_MARGIN,
        overlayInnerStyle = DEFAULT_OVERLAY_INNER_STYLE,
        overlayInnerColor = DEFAULT_OVERLAY_INNER_COLOR,
        ...props
    } = params

    return (
        <Row className={styles.itemRow} {...props}>
            <div className={styles.fieldDiv}>{children}</div>
            <div className={styles.tooltipContainer}>
                <Tooltip
                    placement='right'
                    color={overlayInnerColor}
                    title={tooltipText}
                    style={{ height: 'auto' }}
                    overlayInnerStyle={overlayInnerStyle}
                >
                    <QuestionCircleFilled
                        style={{ top: `${margin}`, position: 'relative', fontSize: ICON_SIZES[iconSize] }}
                    />
                </Tooltip>
            </div>
        </Row>
    )
}
