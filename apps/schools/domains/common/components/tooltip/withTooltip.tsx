import styles from './styles/styles.module.scss'

import { Row, Tooltip } from 'antd'
import { QuestionCircleFilled } from '@ant-design/icons'
import React from 'react'
import {
    DEFAULT_ICON_SIZE,
    DEFAULT_MARGIN,
    DEFAULT_OVERLAY_INNER_COLOR,
    DEFAULT_OVERLAY_INNER_STYLE,
    ICON_SIZES,
} from '@domains/common/components/tooltip/styles/styles'

interface WithTooltipProps {
    children: React.ReactNode
    tooltipText: string
    iconSize?: 'small' | 'medium' | 'large'
    margin?: number
    overlayInnerStyle?: {}
    overlayInnerColor?: string
}

export const WithTooltip: React.FC<WithTooltipProps> = (props) => {
    const {
        children,
        tooltipText,
        iconSize = DEFAULT_ICON_SIZE,
        margin = DEFAULT_MARGIN,
        overlayInnerStyle = DEFAULT_OVERLAY_INNER_STYLE,
        overlayInnerColor = DEFAULT_OVERLAY_INNER_COLOR,
    } = props

    return (
        <Row className={styles.itemRow}>
            <div className={styles.fieldDiv}>{children}</div>
            <Tooltip
                placement='right'
                color={overlayInnerColor}
                title={tooltipText}
                overlayClassName={styles.tooltip}
                overlayInnerStyle={overlayInnerStyle}
            >
                <div className={styles.icon}>
                    <QuestionCircleFilled style={{ fontSize: ICON_SIZES[iconSize], marginTop: `${margin}px` }} />
                </div>
            </Tooltip>
        </Row>
    )
}
