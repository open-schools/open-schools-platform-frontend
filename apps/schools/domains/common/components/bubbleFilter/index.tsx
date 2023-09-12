import React from 'react'

import { Row, Typography } from 'antd'
import styles from './styles/styles.module.scss'
import { BubbleFilterProps } from '@domains/common/components/bubbleFilter/interface'
import { CloseOutlined } from '@ant-design/icons'

export const BubbleFilter: React.FC<BubbleFilterProps> = (params) => {
    const { text, items } = params

    const listItems = items.map((x) =>
        x.count && x.count > 0 ? (
            <Row
                className={x.isSelected ? styles.bubbleContainerSelected : styles.bubbleContainer}
                onClick={x.isSelected ? () => {} : x.onClick}
                style={{ backgroundColor: x.isSelected ? x.color : '' }}
                key={x.key}
            >
                {x.count && (
                    <div className={styles.circle} style={{ backgroundColor: x.isSelected ? '' : x.color }}>
                        {x.count}
                    </div>
                )}
                <div className={styles.bubbleText}>{x.text}</div>
                {x.isSelected && <CloseOutlined onClick={x.onExit} className={styles.closeIcon} />}
            </Row>
        ) : (
            <div key={x.key}></div>
        ),
    )

    return (
        <Row className={styles.container}>
            {text && <Typography.Text className={styles.text}>{text}</Typography.Text>}
            {listItems}
        </Row>
    )
}
